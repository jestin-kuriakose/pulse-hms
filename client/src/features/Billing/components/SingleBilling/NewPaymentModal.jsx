import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBillPayment, fetchSingleBilling, updateBillingStatus } from "../../billingSlice";

const NewPaymentModal = ({
  openPaymentModal,
  setOpenPaymentModal,
  remainingBalance,
  billingId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const addPaymentMutation = useMutation({
    mutationFn: addBillPayment,
    onSuccess: (data) => {
      reset();
      setOpenPaymentModal(false);
      dispatch(updateBillingStatus(billingId));
      dispatch(fetchSingleBilling(billingId));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    addPaymentMutation.mutate(data);
  };

  return (
    <Dialog open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
      <DialogTitle>Add New Payment</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 py-4"
        >
          <FormControl fullWidth>
            <InputLabel shrink>Select Payment Method</InputLabel>
            <Select
              label="Select Payment method"
              {...register("paymentType", { required: true })}
            >
              <MenuItem value="CASH">Cash</MenuItem>
              <MenuItem value="CARD">Debit/Credit</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="accent-pry"
              id="full-payment"
              checked
            />
            <label className="font-main text-pry" htmlFor="full-payment">
              Full Payment
            </label>
          </div>
          <TextField
            required
            id="outlined-required"
            label="Amount"
            defaultValue={remainingBalance}
            {...register("amount", { required: true })}
          />

          <DialogActions>
            <Button
              onClick={() => setOpenPaymentModal(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPaymentModal;
