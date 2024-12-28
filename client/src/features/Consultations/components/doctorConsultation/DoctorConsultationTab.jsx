import face from "/images/face.jpg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TreatmentForm from "./TreatmentForm";
import MedicineForm from "./MedicineForm";
// import { fetchAllMedicines } from "../../../../../redux_slices/medicineSlice";
// import { fetchAllTreatments } from "../../../../../redux_slices/treatmentSlice";
// import { fetchAllPackages } from "../../../../../redux_slices/packageSlice";
import PackageForm from "./PackageForm";
import ImageMarker from "./ImageMarker";
import {
  Button,
  SectionHeader,
  Accordion,
  MainHeading,
  TextInput,
} from "../../../../components/ui";
import PreviousNotesContainer from "../common/PreviousNotesContainer";
import {
  addPatientAssessmentNote,
  updatePatientAssessment,
} from "../../consultationSlice";

const DoctorConsultationTab = () => {
  const dispatch = useDispatch();

  const { currentConsultation, status } = useSelector(
    (state) => state.consultations
  );

  const [notes, setNotes] = useState(
    currentConsultation?.patientAssessment?.notes || []
  );
  const [newNote, setNewNote] = useState({});
  const { medicineList } = useSelector((state) => state.medicines);
  const { treatmentList } = useSelector((state) => state.treatments);
  const { packageList } = useSelector((state) => state.packages);

  const [treatments, setTreatments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [packages, setPackages] = useState([]);

  const faceImageRef = useRef();
  const faceImage2Ref = useRef();
  const bodyImageRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   dispatch(fetchAllMedicines());
  //   dispatch(fetchAllTreatments());
  //   dispatch(fetchAllPackages());
  // }, [dispatch]);

  useEffect(() => {
    if (currentConsultation?.patientAssessment) {
      const patientAssessment = currentConsultation.patientAssessment;
      Object.entries(patientAssessment).forEach(([key, value]) => {
        if (value !== null) {
          console.log(key, value);
          setValue(key, value);
        }
      });

      setNotes(currentConsultation?.patientAssessment?.notes || []);

      setMedicines(currentConsultation?.patientAssessment?.patientMedications);
      setTreatments(currentConsultation?.patientAssessment?.patientTreatments);
      setPackages(currentConsultation?.patientAssessment?.patientPackages);
    }
  }, [currentConsultation, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to formData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    // formData.append("treatments", JSON.stringify(treatments));
    // formData.append("medicines", JSON.stringify(medicines));
    // formData.append("packages", JSON.stringify(packages));

    const safeGetImageData = (ref) => {
      try {
        return ref.current.getImageData();
      } catch (error) {
        console.warn("Failed to get image data:", error);
        return null;
      }
    };

    // Function to handle image data
    const handleImageData = (ref, filename) => {
      if (ref.current.isModified()) {
        const imageData = safeGetImageData(ref);
        console.log(imageData);
        if (imageData) {
          formData.append("images", dataURLtoFile(imageData, filename));
          ref.current.resetModifiedState();
        }
      }
    };

    // Handle each image
    handleImageData(faceImageRef, "face.png");

    // Dispatch action to add patient consultation
    try {
      await dispatch(
        updatePatientAssessment({
          id: currentConsultation?.patientAssessment?.id,
          consultId: currentConsultation?.id,
          formData,
        })
      ).unwrap();
      setTreatments([]);
      setMedicines([]);
    } catch (error) {
      console.error("Failed to submit consultation:", error);
    }
    reset();
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleNoteSubmit = async (noteType) => {
    const data = {
      patientAssessmentId: Number(currentConsultation.patientAssessment.id),
      note: newNote[noteType],
      noteType: noteType,
    };
    dispatch(addPatientAssessmentNote(data)).unwrap();
    setNewNote((prev) => ({ ...prev, [noteType]: "" }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow">
      <div className="flex justify-between my-6">
        <MainHeading title={"Consultation Summary"} />

        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={status === "loading"}
        >
          Save Consultation
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <Accordion title="COMPLAINTS">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("complaints");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="complaints"
                    value={newNote["complaints"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        complaints: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter note for complaints"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter((nt) => nt?.noteType === "complaints")}
                  />
                )}
              </div>
            </div>
          </Accordion>

          <Accordion title="LASER/Q SWITCH NOTES">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("laser_q_note");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="laser_q_note"
                    value={newNote["laser_q_note"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        laser_q_note: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter note for LASER / Q SWITCH NOTES"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter(
                      (nt) => nt?.noteType === "laser_q_note"
                    )}
                  />
                )}
              </div>
            </div>
          </Accordion>

          <Accordion title="FACIAL/DERMAPEN/PRP">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("facial_dermapen_prp");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="facial_dermapen_prp"
                    value={newNote["facial_dermapen_prp"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        facial_dermapen_prp: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter note for FACIAL / DERMAPEN / PRP"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter(
                      (nt) => nt?.noteType === "facial_dermapen_prp"
                    )}
                  />
                )}
              </div>
            </div>
          </Accordion>

          <Accordion title="SLIMMING NOTES">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("slimming_note");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="slimming_note"
                    value={newNote["slimming_note"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        slimming_note: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter note for Slimming"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter(
                      (nt) => nt?.noteType === "slimming_note"
                    )}
                  />
                )}
              </div>
            </div>
          </Accordion>
        </div>

        <SectionHeader title={"Body Image"} />
        <ImageMarker
          ref={faceImageRef}
          imageUrl={
            currentConsultation?.patientAssessment &&
            currentConsultation?.patientAssessment?.images &&
            currentConsultation?.patientAssessment?.images[0]
              ? `https://mpdgeyjwuinfznymilgd.supabase.co/storage/v1/object/sinta-bucket/${currentConsultation?.patientAssessment?.images[0]}`
              : face
          }
        />

        <SectionHeader title={"Package"} />
        <PackageForm
          packages={packages}
          setPackages={setPackages}
        />

        <SectionHeader title={"Treatment"} />
        <TreatmentForm
          treatments={treatments}
          setTreatments={setTreatments}
        />

        <SectionHeader title={"Medication"} />
        <MedicineForm
          medicines={medicines}
          setMedicines={setMedicines}
          patientAssessmentId={currentConsultation?.patientAssessment?.id}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 items-start">
          <Accordion title="Recommendations" isOpenByDefault={true}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("recommendations");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="recommendations"
                    value={newNote["recommendations"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        recommendations: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter Recommendations"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter(
                      (nt) => nt?.noteType === "recommendations"
                    )}
                  />
                )}
              </div>
            </div>
          </Accordion>
          <Accordion title="Instructions to Patient" isOpenByDefault={true}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit("instructions");
                  }}
                  className="flex w-full"
                >
                  <TextInput
                    label="Notes"
                    name="instructions"
                    value={newNote["instructions"]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder="Enter Instructions to Patient"
                  />
                  <Button type="submit" variant="small">
                    Save
                  </Button>
                </form>
                {status === "note-loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <PreviousNotesContainer
                    notes={notes?.filter(
                      (nt) => nt?.noteType === "instructions"
                    )}
                  />
                )}
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultationTab;
