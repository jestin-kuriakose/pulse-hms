import { DeleteForever, Visibility, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getAppointmentColumns = (handleEditClick, handleShowDeleteAppointmentModal) => [
  {
    field: "name",
    headerName: "Patient Name",
    width: 60,
    flex: 1,

    renderCell: (params) => {
      return (
        <div className="flex  ">
          <div className="flex ">
            <p>{params.row.firstName + " " + params.row.lastName}</p>
            {params.row.patientId === 0 && (
              <span class="inline-flex items-center rounded-md bg-yellow-50 px-1 py-0 text-xs font-normal text-yellow-800 ring-1 ring-inset ring-yellow-600/20 ml-2">
                New
              </span>
            )}
          </div>
        </div>
      );
    },
  },

  {
    field: "mobile",
    headerName: "Phone Number",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex  ">
          <div className="flex ">
            <p>{params.row.phoneNumber}</p>
          </div>
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return `${dayjs(params?.row?.date).format("YYYY-MM-DD")}`;
    },
  },
  { field: "startTime", headerName: "Time", width: 120, flex: 1 },
  {
    field: "notes",
    headerName: "Notes",
    width: 120,
    flex: 1,
  },
  {
    field: "doctor",
    headerName: "Doctor",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex  ">
          <div className="flex ">
            <p>
              {"Dr. " +
                params.row.doctor?.user?.firstName +
                " " +
                params.row.doctor?.user?.lastName}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      return <ActionMenu params={params} handleEditClick={handleEditClick} handleShowDeleteAppointmentModal={handleShowDeleteAppointmentModal} />;
    },
  },
];

const ActionMenu = ({ params, handleEditClick, handleShowDeleteAppointmentModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegisterPatient = () => {
    navigate("/registration", { 
      state: { 
        appointmentId: params.row.id,
        firstName: params.row.firstName,
        lastName: params.row.lastName,
        email: params.row.email,
        countryCode: params.row.countryCode,
        phoneNumber: params.row.phoneNumber
      } 
    });
    handleClose();
  };

  const handleStartConsultation = () => {
    // Implement start consultation logic here
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleEditClick(params.row.id); handleClose(); }}>View Appointment</MenuItem>
        <MenuItem onClick={() => { handleShowDeleteAppointmentModal(params.row.id); handleClose(); }}>Delete Appointment</MenuItem>
        {params.row.patientId === 0 ? (
          <MenuItem onClick={handleRegisterPatient}>Register Patient</MenuItem>
        ) : (
          <MenuItem onClick={handleStartConsultation}>Start Consultation</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default getAppointmentColumns;
