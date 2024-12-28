import React from "react";
import Modal from "react-modal";

const CustomModal = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-9xl",
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={`
        bg-white dark:bg-gray-800 
        p-8 rounded-lg shadow-lg 
        ${sizeClasses[size] || sizeClasses.md} 
        mx-auto mt-20 max-h-[90vh] overflow-y-auto 
        text-gray-900 dark:text-gray-100
      `}
      overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-start"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
