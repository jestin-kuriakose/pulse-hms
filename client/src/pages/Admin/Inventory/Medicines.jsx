import React, { useEffect, useState } from "react";
import { MainHeading, Table,Button, LoadingScreen } from "../../../components/ui";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddMedicineModal from "../../../features/Inventory/components/medicines/AddMedicineModal";
import EditMedicineModal from "../../../features/Inventory/components/medicines/EditMedicineModal";
import DeleteMedicineModal from "../../../features/Inventory/components/medicines/DeleteMedicineModal";
import {
  addNewMedicine,
  deleteMedicine,
  fetchMedicines,
  updateMedicine,
} from "../../../features/Inventory/slice/medicineSlice";
import { useDispatch, useSelector } from "react-redux";
import MedicineListFilter from "../../../features/Inventory/components/medicines/MedicineListFilter";
import { fetchCategories } from "../../../features/Inventory/slice/categorySlice";
import { fetchSuppliers } from "../../../features/Inventory/slice/supplierSlice";

const Medicines = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { medicineList, status } = useSelector((state) => state.medicines);
  const { categoryList, status: categoryStatus } = useSelector((state) => state.categories);
  const { supplierList, status: supplierStatus } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchMedicines(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSuppliers())
  }, [dispatch]);

  const handleEditClick = (medicine) => {
    setCurrentMedicine(medicine);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentMedicine({ id });
    setOpenDeleteModal(true);
  };

  const handleAddMedicine = (newMedicine) => {
    console.log(newMedicine)
    const medicine = {
      ...newMedicine,
      cost: parseFloat(newMedicine.cost),
      price: parseFloat(newMedicine.price),
      quantity: parseInt(newMedicine.quantity),
      reorderPoint: parseInt(newMedicine.reorderPoint),
      categoryId: parseInt(newMedicine.categoryId),
      supplierId: parseInt(newMedicine.supplierId),
    };
    dispatch(addNewMedicine(medicine));
    setOpenAddModal(false);
  };

  const handleEditMedicine = (updatedMedicine) => {
    console.log(updatedMedicine)
    const medicine = {
      ...updatedMedicine,
      cost: parseFloat(updatedMedicine.cost),
      price: parseFloat(updatedMedicine.price),
      quantity: parseInt(updatedMedicine.quantity),
      reorderPoint: parseInt(updatedMedicine.reorderPoint),
      categoryId: parseInt(updatedMedicine.categoryId),
      supplierId: parseInt(updatedMedicine.supplierId),
    };
    dispatch(updateMedicine({ id: currentMedicine.id, data: medicine }));
    setOpenEditModal(false);
  };

  const handleDeleteMedicine = (id) => {
    dispatch(deleteMedicine(id));
    setOpenDeleteModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "cost", headerName: "Cost ($)", width: 100 },
    { field: "price", headerName: "Price ($)", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "reorderPoint", headerName: "Reorder Point", width: 120 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "category.name", headerName: "Category", width: 150, renderCell: (params) => params.row.category.name },
    { field: "supplier.name", headerName: "Supplier", width: 150, renderCell: (params) => params.row.supplier.name },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <div className="flex space-x-1">
          <Button
            onClick={() => handleEditClick(params.row)}
            variant="icon"
            className="hover:bg-blue-200 rounded-full"
          >
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </Button>
          <Button
            onClick={() => handleDeleteClick(params.row.id)}
            variant="icon"
            className="hover:bg-red-200 rounded-full"
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      ),
      width: 200,
    },
  ];

  if (status === "loading" || categoryStatus === "loading" || supplierStatus === "loading") {
    return <LoadingScreen message="Fetching Medicines.."/>;
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col items-start md:items-center md:justify-between">
        <MainHeading title="Medicines Inventory" />
        <div className="flex items-center space-x-4">
          <MedicineListFilter
            onChange={(filters) => {
              setSearch(filters?.search);
            }}
          />
          <Button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      <div className="h-full">
        <Table
          rows={medicineList}
          columns={columns}
          isLoading={status === "loading"}
        />
      </div>

      <AddMedicineModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddMedicine}
      />

      <EditMedicineModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEdit={handleEditMedicine}
        medicine={currentMedicine}
      />

      <DeleteMedicineModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteMedicine}
        medicineId={currentMedicine?.id}
      />
    </div>
  );
};

export default Medicines;
