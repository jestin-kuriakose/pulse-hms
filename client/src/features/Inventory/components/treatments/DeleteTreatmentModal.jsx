import { Button } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";

const DeleteTreatmentModal = ({ isOpen, onClose, onDelete, treatmentId }) => {
  const handleDelete = () => {
    onDelete(treatmentId);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Treatment"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Treatment</h2>
      <p className="mb-4">Are you sure you want to delete this treatment?</p>
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

export default DeleteTreatmentModal;
