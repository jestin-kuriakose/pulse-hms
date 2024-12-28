import { DeleteForever, Visibility, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../../utils/age";

const getPatientLookupColumns = (
  handleNavigateMedicalRecords,
  handleShowStartAppointmentModal,
  handleShowStartConsultationModal,
  handleShowStartBillingModal
) => [
  {
    field: "mrNumber",
    headerName: "MR Number",
    width: 120,
  },
  {
    field: "name",
    headerName: "Patient Name",
    width: 200,

    renderCell: (params) => {
      return `${params.row.firstName + " " + params.row.lastName}`;
    },
  },
  {
    field: "age",
    headerName: "Age",
    width: 150,
    renderCell: (params) => {
      return `${calculateAge(params?.row?.dob)}Y`;
    },
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 250,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return (
        <ActionMenu
          params={params}
          handleNavigateMedicalRecords={handleNavigateMedicalRecords}
          handleShowStartAppointmentModal={handleShowStartAppointmentModal}
          handleShowStartConsultationModal={handleShowStartConsultationModal}
          handleShowStartBillingModal={handleShowStartBillingModal}
        />
      );
    },
  },
];

const ActionMenu = ({
  params,
  handleNavigateMedicalRecords,
  handleShowStartAppointmentModal,
  handleShowStartConsultationModal,
  handleShowStartBillingModal
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleNavigateMedicalRecords(params.row.id);
            handleClose();
          }}
        >
          View Records
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log(params.row);
            handleShowStartAppointmentModal(params.row);
            handleClose();
          }}
        >
          Start Appointment
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleShowStartConsultationModal(params.row);
            handleClose();
          }}
        >
          Start Consultation
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleShowStartBillingModal(params.row);
            handleClose();
          }}
        >
          Start Billing
        </MenuItem>
      </Menu>
    </div>
  );
};

export default getPatientLookupColumns;
