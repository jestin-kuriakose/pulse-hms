import { useForm } from "react-hook-form";
import { Button, TextArea, TextInput, SelectInput } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import { useSelector } from "react-redux";

const AddMedicineModal = ({ isOpen, onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { status } = useSelector((state) => state.medicines);
  const { categoryList } = useSelector((state) => state.categories);
  const { supplierList } = useSelector((state) => state.suppliers);
console.log(categoryList)
  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Medicine"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Code"
          name="code"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Name"
          name="name"
          register={register}
          errors={errors}
          required
        />
        <TextArea
          label="Description"
          name="description"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Cost"
          name="cost"
          type="number"
          step="0.01"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          step="0.01"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Quantity"
          name="quantity"
          type="number"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Reorder Point"
          name="reorderPoint"
          type="number"
          register={register}
          errors={errors}
          required
        />
        <TextInput
          label="Unit"
          name="unit"
          register={register}
          errors={errors}
          required
        />
        <SelectInput
          label="Category"
          name="categoryId"
          control={control}
          options={categoryList.map(cat => ({ value: cat.id, label: cat.name }))}
          errors={errors}
          required
        />
        <SelectInput
          label="Supplier"
          name="supplierId"
          control={control}
          options={supplierList.map(sup => ({ value: sup.id, label: sup.name }))}
          errors={errors}
          required
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={status === "loading"}>
            Add Medicine
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddMedicineModal;
