import { useSelector } from "react-redux";
import { Button, Table } from "../../../components/ui";
import StartAppointmentModal from "./StartAppointmentModal";
import { useState } from "react";
import StartConsultationModal from "./StartConsultationModal";
import getPatientLookupColumns from "../data/PatientLookupColumns";
import { useNavigate } from "react-router-dom";
import { Start } from "@mui/icons-material";
import StartBillingModal from "./StartBillingModal";

const PatientLookupTable = ({setOpenPatientLookupModal}) => {
  const { patientList, status } = useSelector((state) => state.patients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openConsultationModal, setOpenConsultationModal] = useState(false);
  const [openBillingModal, setOpenBillingModal] = useState(false);

  const navigate = useNavigate();

  const handleNavigateMedicalRecords = (id) => {
    navigate(`/medical-records/${id}`);
    setOpenPatientLookupModal(false);
  };

  const handleShowStartAppointmentModal = (data) => {
    setSelectedPatient(data);
    setOpenAppointmentModal(true);
  };

  const handleShowStartConsultationModal = (data) => {
    setSelectedPatient(data);
    setOpenConsultationModal(true);
  };

  const handleShowStartBillingModal = (data) => {
    setSelectedPatient(data);
    setOpenBillingModal(true);
  };

  const columns = getPatientLookupColumns(
    handleNavigateMedicalRecords,
    handleShowStartAppointmentModal,
    handleShowStartConsultationModal,
    handleShowStartBillingModal
  );

  return (
    <>
      <div className="h-auto">
        <Table
          rows={patientList}
          columns={columns}
          isLoading={status === "loading"}
        />
      </div>
      <StartAppointmentModal
        open={openAppointmentModal}
        setOpen={setOpenAppointmentModal}
        selectedPatient={selectedPatient}
      />
      <StartConsultationModal
        open={openConsultationModal}
        setOpen={setOpenConsultationModal}
        selectedPatient={selectedPatient}
      />
      <StartBillingModal
        open={openBillingModal}
        setOpen={setOpenBillingModal}
        selectedPatient={selectedPatient}
      />
    </>
  );
};

export default PatientLookupTable;
