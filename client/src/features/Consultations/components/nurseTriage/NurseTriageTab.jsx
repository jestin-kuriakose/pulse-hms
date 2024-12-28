import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  Accordion,
  MainHeading,
  SectionHeader,
  TextInput,
  Button,
  RadioGroup,
} from "../../../../components/ui";
import PreviousNotesContainer from "../common/PreviousNotesContainer";
import PainAssessment from "./PainAssessment";
import {
  addPatientTriageNote,
  updatePatientTriage,
} from "../../consultationSlice";
import { problems } from "../../data/problems";
import { medicalHistoryTypes } from "../../data/medicalHistory";
import { vitalsTypes } from "../../data/vitals";

const NurseTriageTab = () => {
  const dispatch = useDispatch();

  const { currentConsultation, status } = useSelector(
    (state) => state.consultations
  );

  const [currentPatientTriage, setCurrentPatientTriage] = useState(
    currentConsultation.patientTriage
  );
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({});

  useEffect(() => {
    if (currentConsultation?.patientTriage) {
      const triage = currentConsultation.patientTriage;

      setCurrentPatientTriage(currentConsultation.patientTriage);
      setSelectedProblems(triage.problems.map((prob) => prob.problem.name));
      setSelectedAllergies(triage.allergies.map((algy) => algy.allergy.name));
      setNotes(triage.notes);
    }
  }, [currentConsultation]);

  const handleTriageSave = () => {
    const triageId = currentConsultation?.patientTriage?.id;
    const consultId = currentConsultation?.id;
    const triageData = currentPatientTriage;
    dispatch(
      updatePatientTriage({
        triageId,
        consultId,
        triageData: {
          ...triageData,
          allergies: selectedAllergies,
          problems: selectedProblems,
        },
      })
    );
  };

  const handleProblemSelect = (problemName) => {
    setSelectedProblems((prevSelected) => {
      const updatedProblems = prevSelected.includes(problemName)
        ? prevSelected.filter((name) => name !== problemName)
        : [...prevSelected, problemName];

      return updatedProblems;
    });
  };

  const handleNoteSubmit = async (noteType) => {
    const data = {
      patientTriageId: Number(currentConsultation.patientTriage.id),
      note: newNote[noteType],
      noteType: noteType,
    };
    dispatch(addPatientTriageNote(data)).unwrap();
    setNewNote((prev) => ({ ...prev, [noteType]: "" }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow">
      <div className="flex justify-between mb-5">
        <MainHeading title="Triage/Nurse Assessment" />
        <Button onClick={handleTriageSave} isLoading={status === "loading"}>
          Save
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div>
              <SectionHeader title="Patient Priority" />
              <RadioGroup
                name="priority"
                options={[
                  { value: "Not Urgent", label: "Not Urgent" },
                  { value: "Urgent", label: "Urgent" },
                  { value: "Emergency", label: "Emergency" },
                ]}
                value={currentPatientTriage.priority}
                onChange={(value) =>
                  setCurrentPatientTriage((prev) => ({
                    ...prev,
                    priority: value.target.value,
                  }))
                }
              />
            </div>
            <div className="mt-5">
              {/* <SectionHeader title="Pain Assessment" /> */}
              <PainAssessment
                onPainLevelSelect={(level) =>
                  setCurrentPatientTriage((prev) => ({
                    ...prev,
                    painScale: level,
                  }))
                }
                selectedLevel={currentPatientTriage.painScale}
              />
            </div>
          </div>

          <div>
            <SectionHeader title="Vitals" />
            <div className="grid grid-cols-2 gap-4">
              {vitalsTypes.map((vital, index) => (
                <TextInput
                  key={index}
                  label={vital?.label}
                  name={vital?.name}
                  value={currentPatientTriage[vital?.name]}
                  onChange={(e) =>
                    setCurrentPatientTriage((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <Accordion title="Medical History">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {medicalHistoryTypes.map((historyType, index) => (
              <div key={index}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNoteSubmit(historyType?.name);
                  }}
                  className="flex"
                >
                  <TextInput
                    label={historyType?.label}
                    name={historyType?.name}
                    value={newNote[historyType?.name]}
                    onChange={(e) =>
                      setNewNote((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    size="medium"
                    placeholder={"Enter " + historyType?.label + " here"}
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
                      (nt) => nt?.noteType === historyType?.name
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Nurse Assessment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNoteSubmit("nurseAssessment");
                }}
                className="flex"
              >
                <TextInput
                  label="Nurse Assessment"
                  name="nurseAssessment"
                  value={newNote["nurseAssessment"]}
                  onChange={(e) =>
                    setNewNote((prev) => ({
                      ...prev,
                      nurseAssessment: e.target.value,
                    }))
                  }
                  size="medium"
                  placeholder="Enter Nurse Assessment here"
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
                    (nt) => nt?.noteType === "nurseAssessment"
                  )}
                />
              )}
            </div>
          </div>
        </Accordion>

        <Accordion title="Problems">
          <div className="flex flex-wrap gap-2">
            {problems.map((problem) => (
              <Button
                key={problem.id}
                onClick={() => handleProblemSelect(problem.name)}
                variant={
                  selectedProblems.includes(problem.name)
                    ? "primary"
                    : "outline"
                }
                type="button"
              >
                {problem.name}
              </Button>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default NurseTriageTab;
