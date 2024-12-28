import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchSingleBilling, updateBillingStatus, updateBillPayment } from "../../billingSlice";

const EditPaymentModal = ({
  openEditPaymentModal,
  setOpenEditPaymentModal,
  selectedPayment,
  billingId
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const updatePaymentMutation = useMutation({
    mutationFn: updateBillPayment,
    onSuccess: (data) => {
      reset();
      setOpenEditPaymentModal(false);
      dispatch(updateBillingStatus(billingId));
      dispatch(fetchSingleBilling(billingId));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (selectedPayment) {
      console.log(selectedPayment);
      setValue("amount", selectedPayment?.amount);
      setValue("paymentType", selectedPayment?.paymentType);
    }
  }, [selectedPayment]);

  const onEditPaymentSubmit = (data) => {
    updatePaymentMutation.mutate(data);
  };

  return (
    <Dialog
      open={openEditPaymentModal}
      onClose={() => setOpenEditPaymentModal(false)}
    >
      <DialogTitle>Edit Payment</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onEditPaymentSubmit)}
          className="flex flex-col gap-8 py-4"
        >
          <select
            {...register("paymentType", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
          </select>

          <TextField
            required
            id="outlined-required"
            label="Amount"
            {...register("amount", { required: true })}
          />

          <DialogActions>
            <Button
              onClick={() => setOpenEditPaymentModal(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={updatePaymentMutation.isPending}>
              {updatePaymentMutation.isPending ? <CircularProgress/> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentModal;
