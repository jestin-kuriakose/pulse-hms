import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, SelectInput, TextArea, TextInput } from "../../../../components/ui";
import CustomModal from "../../../../components/ui/Modal/CustomModal";
import { useSelector } from "react-redux";

const EditPackageModal = ({ isOpen, onClose, onEdit, packageItem }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: packageItem?.code || "",
      name: packageItem?.name || "",
      description: packageItem?.description || "",
      cost: packageItem?.cost || "",
      price: packageItem?.price || "",
      duration: packageItem?.duration || "",
      categoryId: packageItem?.categoryId || "",
    },
  });

  const { status } = useSelector((state) => state.packages);
  const { categoryList } = useSelector((state) => state.categories);

  useEffect(() => {
    if (packageItem) {
      setValue("code", packageItem.code);
      setValue("name", packageItem.name);
      setValue("description", packageItem.description);
      setValue("cost", packageItem.cost);
      setValue("price", packageItem.price);
      setValue("duration", packageItem.duration);
      setValue("categoryId", packageItem.categoryId);
    }
  }, [packageItem, setValue]);

  const onSubmit = (data) => {
    onEdit(data);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Package"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Package</h2>
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
          label="Duration (Sessions)"
          name="duration"
          type="number"
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

export default EditPackageModal;
