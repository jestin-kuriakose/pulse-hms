import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;