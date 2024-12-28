import { Button } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";

const DeleteMedicineModal = ({ isOpen, onClose, onDelete, medicineId }) => {
  const handleDelete = () => {
    onDelete(medicineId);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Medicine"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Medicine</h2>
      <p className="mb-4">Are you sure you want to delete this medicine?</p>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeleteMedicineModal;
