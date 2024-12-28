import { Button } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";

const DeletePackageModal = ({ isOpen, onClose, onDelete, packageId }) => {
  const handleDelete = () => {
    onDelete(packageId);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Package"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Package</h2>
      <p className="mb-4">Are you sure you want to delete this package?</p>
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

export default DeletePackageModal;
