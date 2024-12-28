import React, { useEffect, useState } from "react";
import { MainHeading, Table, Button, LoadingScreen } from "../../../components/ui";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddTreatmentModal from "../../../features/Inventory/components/treatments/AddTreatmentModal";
import EditTreatmentModal from "../../../features/Inventory/components/treatments/EditTreatmentModal";
import DeleteTreatmentModal from "../../../features/Inventory/components/treatments/DeleteTreatmentModal";
import {
  addNewTreatment,
  deleteTreatment,
  fetchTreatments,
  updateTreatment,
} from "../../../features/Inventory/slice/treatmentSlice";
import { useDispatch, useSelector } from "react-redux";
import TreatmentListFilter from "../../../features/Inventory/components/treatments/TreatmentListFilter";

const Treatments = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { treatmentList, status } = useSelector((state) => state.treatments);
  const { categoryList, status: categoryStatus } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchTreatments(search));
  }, [dispatch, search]);

  const handleEditClick = (treatment) => {
    setCurrentTreatment(treatment);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteTreatment(id));
    setOpenDeleteModal(true);
  };

  const handleAddTreatment = (newTreatment) => {
    const treatment = {
      ...newTreatment,
      cost: parseFloat(newTreatment.cost),
      price: parseFloat(newTreatment.price),
      categoryId: parseInt(newTreatment.categoryId),
    };
    dispatch(addNewTreatment(treatment));
    setOpenAddModal(false);
  };

  const handleEditTreatment = (updatedTreatment) => {
    const treatment = {
      ...updatedTreatment,
      cost: parseFloat(updatedTreatment.cost),
      price: parseFloat(updatedTreatment.price),
      categoryId: parseInt(updatedTreatment.categoryId),
    };
    dispatch(updateTreatment({ id: currentTreatment.id, data: treatment }));
    setOpenEditModal(false);
  };

  const handleDeleteTreatment = (id) => {
    setOpenDeleteModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "cost", headerName: "Cost ($)", width: 100 },
    { field: "price", headerName: "Price ($)", width: 100 },
    {
      field: "category.name",
      headerName: "Category",
      width: 150,
      renderCell: (params) => params?.row?.category?.name,
    },
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
            <PencilIcon className="h-5 w-5 text-blue-500 " />
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

  if (status === "loading" || categoryStatus === "loading") {
    return <LoadingScreen message="Fetching Treatments.."/>;
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col items-start md:items-center md:justify-between">
        <MainHeading title="Treatments Inventory" />
        <div className="flex items-center space-x-4">
          <TreatmentListFilter
            onChange={(filters) => {
              setSearch(filters?.search);
            }}
          />
          <Button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Treatment
          </Button>
        </div>
      </div>

      <div className="h-full">
        <Table
          rows={treatmentList}
          columns={columns}
          isLoading={status === "loading"}
        />
      </div>

      <AddTreatmentModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddTreatment}
      />

      <EditTreatmentModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEdit={handleEditTreatment}
        treatment={currentTreatment}
      />

      <DeleteTreatmentModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteTreatment}
        treatmentId={currentTreatment?.id}
      />
    </div>
  );
};

export default Treatments;
