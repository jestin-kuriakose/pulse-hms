import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteBillPayment,
  fetchSingleBilling,
  updateBillingStatus,
} from "../../billingSlice";

const DeletePaymentModal = ({
  openDeletePaymentModal,
  setOpenDeletePaymentModal,
  selectedPayment,
  billingId,
}) => {
  const dispatch = useDispatch();

  const deletePaymentMutation = useMutation({
    mutationFn: deleteBillPayment,
    onSuccess: (data) => {
      setOpenDeletePaymentModal(false);
      dispatch(updateBillingStatus(billingId));
      dispatch(fetchSingleBilling(billingId));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog
      open={openDeletePaymentModal}
      onClose={() => setOpenDeletePaymentModal(false)}
    >
      <DialogTitle>Delete Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this payment ?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setOpenDeletePaymentModal(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={deletePaymentMutation?.isPending}
            onClick={() => deletePaymentMutation.mutate()}
          >
            {deletePaymentMutation?.isPending ? <CircularProgress /> : "Delete"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePaymentModal;
