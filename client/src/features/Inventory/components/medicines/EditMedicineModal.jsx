import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import { Button, TextArea, TextInput, SelectInput } from "../../../../components/ui";

const EditMedicineModal = ({ isOpen, onClose, onEdit, medicine }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: medicine?.code || "",
      name: medicine?.name || "",
      description: medicine?.description || "",
      cost: medicine?.cost || "",
      price: medicine?.price || "",
      quantity: medicine?.quantity || "",
      reorderPoint: medicine?.reorderPoint || "",
      unit: medicine?.unit || "",
      categoryId: medicine?.categoryId || "",
      supplierId: medicine?.supplierId || "",
    },
  });

  const { status } = useSelector((state) => state.medicines);
  const { categories } = useSelector((state) => state.categories);
  const { suppliers } = useSelector((state) => state.suppliers);

  useEffect(() => {
    if (medicine) {
      Object.keys(medicine).forEach((key) => {
        setValue(key, medicine[key]);
      });
    }
  }, [medicine, setValue]);

  const onSubmit = (data) => {
    onEdit(data);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Medicine"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Medicine</h2>
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
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <SelectInput
              label="Category"
              options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
              {...field}
              errors={errors}
            />
          )}
        />
        <Controller
          name="supplierId"
          control={control}
          rules={{ required: "Supplier is required" }}
          render={({ field }) => (
            <SelectInput
              label="Supplier"
              options={suppliers.map(sup => ({ value: sup.id, label: sup.name }))}
              {...field}
              errors={errors}
            />
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={status === "loading"}>
            Save Changes
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default EditMedicineModal;
