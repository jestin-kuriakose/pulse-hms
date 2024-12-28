import React, { useEffect, useState } from "react";
import { MainHeading, Table, Button, LoadingScreen } from "../../../components/ui";
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddPackageModal from "../../../features/Inventory/components/packages/AddPackageModal";
import EditPackageModal from "../../../features/Inventory/components/packages/EditPackageModal";
import DeletePackageModal from "../../../features/Inventory/components/packages/DeletePackageModal";
import {
  addNewPackage,
  deletePackage,
  fetchPackages,
  updatePackage,
} from "../../../features/Inventory/slice/packageSlice";
import { fetchCategories } from "../../../features/Inventory/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import PackageListFilter from "../../../features/Inventory/components/packages/PackageListFilter";

const Packages = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { packageList, status } = useSelector((state) => state.packages);
  const { categoryList, status: categoryStatus } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchPackages(search));
    dispatch(fetchCategories());
  }, [dispatch, search]);

  const handleEditClick = (packageItem) => {
    setCurrentPackage(packageItem);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deletePackage(id));
    setOpenDeleteModal(true);
  };

  const handleAddPackage = (newPackage) => {
    const packageItem = {
      ...newPackage,
      cost: parseFloat(newPackage.cost),
      price: parseFloat(newPackage.price),
      categoryId: parseInt(newPackage.categoryId),
    };
    dispatch(addNewPackage(packageItem));
    setOpenAddModal(false);
  };

  const handleEditPackage = (updatedPackage) => {
    const packageItem = {
      ...updatedPackage,
      cost: parseFloat(updatedPackage.cost),
      price: parseFloat(updatedPackage.price),
      categoryId: parseInt(updatedPackage.categoryId),
    };
    dispatch(updatePackage({ id: currentPackage.id, data: packageItem }));
    setOpenEditModal(false);
  };

  const handleDeletePackage = (id) => {
    setOpenDeleteModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "cost", headerName: "Cost ($)", width: 100 },
    { field: "price", headerName: "Price ($)", width: 100 },
    { field: "duration", headerName: "Duration", width: 150 },
    {
      field: "category.name",
      headerName: "Category",
      width: 150,
      renderCell: (params) => params.row.category.name,
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
    return <LoadingScreen message="Fetching Packages.."/>;
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col items-start md:items-center md:justify-between">
        <MainHeading title="Packages Inventory" />
        <div className="flex items-center space-x-4">
          <PackageListFilter
            onChange={(filters) => {
              setSearch(filters?.search);
            }}
          />
          <Button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Package
          </Button>
        </div>
      </div>

      <div className="h-full">
        <Table
          rows={packageList}
          columns={columns}
          isLoading={status === "loading"}
        />
      </div>

      <AddPackageModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddPackage}
      />

      <EditPackageModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEdit={handleEditPackage}
        packageItem={currentPackage}
      />

      <DeletePackageModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeletePackage}
        packageId={currentPackage?.id}
      />
    </div>
  );
};

export default Packages;
