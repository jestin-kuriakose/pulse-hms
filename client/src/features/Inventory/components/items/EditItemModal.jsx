import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextArea, TextInput, SelectInput } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import { useSelector } from "react-redux";

const EditItemModal = ({ isOpen, onClose, onEdit, item }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: item?.code || "",
      name: item?.name || "",
      description: item?.description || "",
      cost: item?.cost || "",
      price: item?.price || "",
      quantity: item?.quantity || "",
      reorderPoint: item?.reorderPoint || "",
      unit: item?.unit || "",
      categoryId: item?.categoryId || "",
      supplierId: item?.supplierId || "",
    },
  });

  const { status } = useSelector((state) => state.items);
  const { categoryList } = useSelector((state) => state.categories);
  const { supplierList } = useSelector((state) => state.suppliers);

  useEffect(() => {
    if (item) {
      Object.keys(item).forEach((key) => {
        setValue(key, item[key]);
      });
    }
  }, [item, setValue]);

  const onSubmit = (data) => {
    onEdit(data);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Item"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
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
          rules={{ required: "Category is required" }}
          options={categoryList?.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          errors={errors}
        />
        <SelectInput
          label="Supplier"
          name="supplierId"
          control={control}
          rules={{ required: "Supplier is required" }}
          options={supplierList?.map((sup) => ({ value: sup.id, label: sup.name }))}
          errors={errors}
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

export default EditItemModal;
