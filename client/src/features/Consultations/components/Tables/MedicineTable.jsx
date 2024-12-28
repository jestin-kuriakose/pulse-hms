import { useCallback, useState } from "react";
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
import { Table } from "../../../../components/ui";
import { useDispatch } from "react-redux";
import {
  deletePatientMedication,
  updatePatientMedication,
} from "../../consultationSlice";

function MedicineTable({ medicineList, medicines, setMedicines, isLoading }) {
  const [rowModesModel, setRowModesModel] = useState({});

  const dispatch = useDispatch();

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const handleRowEditStop = (params, event) => {
    console.log(params);
    console.log(event);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    if (!id) return;
    dispatch(deletePatientMedication(id));
  };
  console.log(medicines);
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = medicines.find((row) => row.id === id);
    if (editedRow.isNew) {
      setMedicines(medicines.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log(newRow);
    const updatedRow = { ...newRow, isNew: false };
    dispatch(
      updatePatientMedication({
        id: newRow.id,
        data: {
          medicineId: newRow.medicine.id,
          quantity: newRow.quantity,
          notes: newRow.notes,
          patientAssessmentId: newRow.patientAssessmentId,
        },
      })
    );
    return updatedRow;
  };
  console.log(medicines);
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
        return `${params.row.medicine?.name} - ${params.row.medicine?.description}`;
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
      headerName: "Patient Notes",
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
    <div style={{ height: 400, width: "100%" }}>
      <Table
        rows={medicines}
        columns={columns}
        isLoading={isLoading}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowSpacing={getRowSpacing}
      />
    </div>
  );
}

export default MedicineTable;
