import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import React from "react";
import { deletePatientPackage } from "../../../../utils/apiCalls";

function PackageTable({ packageList, packages, setPackages }) {
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handlePackageDelete = async (id) => {
    if(!id) return
    await deletePatientPackage(id);
  };

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  console.log(packages);
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const filteredPackages = packages.filter((row) => row.id !== id)
    setPackages(filteredPackages);

    const foundPackage = packages?.find((pack) => pack?.id === id);
    if (!foundPackage?.newEntry) {
        handlePackageDelete(id)
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = packages.find((row) => row.id === id);
    if (editedRow.isNew) {
      setPackages(packages.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setPackages(
      packages.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "name",
      type: "number",
      minWidth: 280,
      flex: 2,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return `${params.row.package?.name} - ${params.row.package?.description}`;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 120,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      type: "text",
      minWidth: 180,
      flex: 2,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        // height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={packages}
        columns={columns}
        editMode="row"
        getRowHeight={() => "auto"}
        rowModesModel={rowModesModel}
        getRowSpacing={getRowSpacing}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        //   toolbar: { medicines, setMedicines, setRowModesModel },
        // }}
      />
    </Box>
  );
}

export default PackageTable;
