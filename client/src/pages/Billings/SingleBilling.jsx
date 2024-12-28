import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleBilling,
  addBillPayment,
} from "../../features/Billing/billingSlice";
import CustomModal from "../../components/ui/Modal/CustomModal";
import { Button, TextInput, SelectInput, LoadingScreen } from "../../components/ui";
import { useForm, Controller } from "react-hook-form";
import { generateInvoice } from "../../features/Billing/services/billingApi";
import { useMutation } from "@tanstack/react-query";

const SingleBilling = () => {
  const dispatch = useDispatch();
  const { currentBilling: billingData, status: billStatus } = useSelector(
    (state) => state.billing
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleBilling(id));
  }, [dispatch]);

  const {
    id,
    patient,
    doctor,
    total,
    tax,
    discount,
    previousBalance,
    paymentMade,
    subtotal,
    status,
    createdAt,
    patientMedications,
    patientTreatments,
    patientPackages,
    payments,
  } = billingData;

  const balanceAmount =
    total - (payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0);

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: { paymentType: "", amount: 0, isFullPayment: true },
  });

  const isFullPayment = watch("isFullPayment");

  const { mutate: generatePdfInvoice, isPending: isGeneratingInvoice } =
    useMutation({
      mutationKey: ["createInvoice"],
      mutationFn: generateInvoice,
      onSuccess: async (data) => {
        const pdfUrl = URL.createObjectURL(data?.data);
        window.open(pdfUrl, "_blank");
      },
    });

  useEffect(() => {
    if (isFullPayment) {
      setValue("amount", balanceAmount);
    }
  }, [isFullPayment, balanceAmount, setValue]);

  const onSubmitPayment = (data) => {
    dispatch(addBillPayment({ billingId: id, ...data }));
    setIsPaymentModalOpen(false);
  };

  const handlePrintInvoice = () => {
    generatePdfInvoice(id);
  };

  if (billStatus === "loading") return <LoadingScreen message="Fetching Patient Bill.."/>
  if (isGeneratingInvoice) return <LoadingScreen message="Generating Invoice.."/>

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Invoice #{id}
        </h1>
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
          <Button onClick={handlePrintInvoice}>Print Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Patient Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Name:{" "}
            {`${patient.firstName} ${patient.middleName} ${patient.lastName}`}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            MR Number: {patient.mrNumber}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Email: {patient.email}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Phone: {`${patient.countryCode} ${patient.phoneNumber}`}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Billing Details
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Date: {dayjs(createdAt).format("MMMM D, YYYY")}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Status: {status}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Doctor: Dr. {`${doctor.firstName} ${doctor.lastName}`}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Items
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Item
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Quantity
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Price
              </th>
              <th className="p-2 border border-gray-300 dark:border-gray-600">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {patientMedications.map((med) => (
              <tr
                key={med.id}
                className="border-b border-gray-300 dark:border-gray-600"
              >
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {med.medicine.name}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  {med.quantity}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  ${med.medicine.price.toFixed(2)}
                </td>
                <td className="p-2 border border-gray-300 dark:border-gray-600">
                  ${(med.quantity * med.medicine.price).toFixed(2)}
                </td>
              </tr>
            ))}
            {/* Add similar sections for treatments and packages if needed */}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-1/2">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Subtotal:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Tax:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Discount:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Previous Balance:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              ${previousBalance.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span className="text-gray-800 dark:text-white">Total:</span>
            <span className="text-gray-800 dark:text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-700 dark:text-gray-300">
              Balance Due:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              ${balanceAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Payments
        </h2>
        {payments && payments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 border border-gray-300 dark:border-gray-600">
                  Date
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">
                  Type
                </th>
                <th className="p-2 border border-gray-300 dark:border-gray-600">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-600"
                >
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    {dayjs(payment.date).format("MMMM D, YYYY")}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    {payment.paymentType}
                  </td>
                  <td className="p-2 border border-gray-300 dark:border-gray-600">
                    ${payment?.amount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No payments recorded yet.
          </p>
        )}
      </div>

      <Button onClick={() => setIsPaymentModalOpen(true)} className="mt-4">
        Add Payment
      </Button>

      <CustomModal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        contentLabel="Add Payment"
      >
        <h2 className="text-2xl font-bold mb-4">Add Payment</h2>
        <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
          <SelectInput
            label="Payment Type"
            name="paymentType"
            control={control}
            options={[
              { value: "cash", label: "Cash" },
              { value: "card", label: "Card" },
              { value: "bank_transfer", label: "Bank Transfer" },
            ]}
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isFullPayment"
              {...register("isFullPayment")}
              className="mr-2"
            />
            <label htmlFor="isFullPayment">Full Payment</label>
          </div>
          <TextInput
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            register={register}
            required
            disabled={isFullPayment}
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Payment</Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default SingleBilling;
