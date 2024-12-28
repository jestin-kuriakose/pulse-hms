import React, { useEffect, useState } from "react";
import { LoadingScreen, MainHeading, Table } from "../../../components/ui";
import { Button } from "../../../components/ui";
import { PlusCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import AddItemModal from "../../../features/Inventory/components/items/AddItemModal";
import EditItemModal from "../../../features/Inventory/components/items/EditItemModal";
import DeleteItemModal from "../../../features/Inventory/components/items/DeleteItemModal";
import { addNewItem, deleteItem, fetchItems, updateItem } from "../../../features/Inventory/slice/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemListFilter from "../../../features/Inventory/components/items/ItemListFilter";
import { fetchCategories } from "../../../features/Inventory/slice/categorySlice";
import { fetchSuppliers } from "../../../features/Inventory/slice/supplierSlice";
import { render } from "react-dom";

const Items = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { itemList, status } = useSelector((state) => state.items);
  const { categoryList, status: categoryStatus } = useSelector((state) => state.categories);
  const { supplierList, status: supplierStatus } = useSelector((state) => state.suppliers);

  useEffect(() => {
    dispatch(fetchItems(search));
    dispatch(fetchCategories())
    dispatch(fetchSuppliers())
  }, [dispatch, search]);

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentItem({ id });
    setOpenDeleteModal(true);
  };

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      cost: parseFloat(newItem.cost),
      price: parseFloat(newItem.price),
      quantity: parseInt(newItem.quantity),
      reorderPoint: parseInt(newItem.reorderPoint),
      categoryId: parseInt(newItem.categoryId),
      supplierId: parseInt(newItem.supplierId),
    };
    dispatch(addNewItem(item));
    setOpenAddModal(false);
  };

  const handleEditItem = (updatedItem) => {
    const item = {
      ...updatedItem,
      cost: parseFloat(updatedItem.cost),
      price: parseFloat(updatedItem.price),
      quantity: parseInt(updatedItem.quantity),
      reorderPoint: parseInt(updatedItem.reorderPoint),
      categoryId: parseInt(updatedItem.categoryId),
      supplierId: parseInt(updatedItem.supplierId),
    };
    dispatch(updateItem({ id: currentItem.id, data: item }));
    setOpenEditModal(false);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
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
    { field: "category.name", headerName: "Category", width: 150, renderCell: (params) => params?.row?.category?.name },
    { field: "supplier.name", headerName: "Supplier", width: 150, renderCell: (params) => params?.row?.supplier?.name },
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

  if(categoryStatus === "loading" || supplierStatus === "loading") {
    return <LoadingScreen message="Fetching Items.."/>;
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col items-start md:items-center md:justify-between">
        <MainHeading title="Items Inventory" />
        <div className="flex items-center space-x-4">
          <ItemListFilter
            onChange={(filters) => {
              setSearch(filters?.search);
            }}
          />
          <Button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="h-full">
        <Table
          rows={itemList}
          columns={columns}
          isLoading={status === "loading"}
        />
      </div>

      <AddItemModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddItem}
      />

      <EditItemModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onEdit={handleEditItem}
        item={currentItem}
      />

      <DeleteItemModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={handleDeleteItem}
        itemId={currentItem?.id}
      />
    </div>
  );
};

export default Items;
