import React from 'react';
import CustomModal from '../../../../components/ui/Modal/CustomModal';
import { CircularProgress } from '@mui/material';

const DeleteAppointmentModal = ({
  showDeleteAppointmentModal,
  handleCloseDeleteAppointmentModal,
  handleDeleteAppointment,
  status,
}) => {
  return (
    <CustomModal
      isOpen={showDeleteAppointmentModal}
      onRequestClose={handleCloseDeleteAppointmentModal}
      contentLabel="Delete Appointment"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Appointment</h2>
      <p className="mb-4">Are you sure you want to delete this appointment?</p>
      <div className="flex justify-end">
        <button
          onClick={handleCloseDeleteAppointmentModal}
          className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteAppointment}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? <CircularProgress size={24} /> : 'Delete'}
        </button>
      </div>
    </CustomModal>
  );
};

export default DeleteAppointmentModal;
