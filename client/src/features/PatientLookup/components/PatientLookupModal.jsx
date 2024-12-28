import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, MainHeading } from "../../../components/ui";
import CustomModal from "../../../components/ui/Modal/CustomModal";
import { fetchPatients } from "../../MedicalRecords/patientsSlice";
import PatientLookupTable from "./PatientLookupTable";
import PatientListFilter from "./PatientListFilter";

const PatientLookupModal = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPatients(search));
  }, [search]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Patient lookup</Button>

      <CustomModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="New Appointment"
        size="2xl"
      >
        <MainHeading title={"Patient Lookup"} />
        <PatientListFilter
          onChange={(filters) => {
            setSearch(filters?.search);
          }}
        />
        <PatientLookupTable setOpenPatientLookupModal={setOpen} />
      </CustomModal>
    </>
  );
};

export default PatientLookupModal;
