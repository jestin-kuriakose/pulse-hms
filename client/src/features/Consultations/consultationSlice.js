import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as consultationApi from "./services/consultationApi";

// Async Thunks
export const fetchConsultations = createAsyncThunk(
  "consultations/fetchConsultations",
  async ({ search, dateRange }, { rejectWithValue }) => {
    console.log(search);
    console.log(dateRange);
    try {
      return await consultationApi.fetchConsultations({ search, dateRange });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchConsultationById = createAsyncThunk(
  "consultations/fetchConsultationById",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.getSingleConsultation(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get all consultations of a patient
export const fetchPatientConsultations = createAsyncThunk(
  "consultations/fetchPatientConsultations",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.getPatientConsultationsApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const newConsultation = createAsyncThunk(
  "consultations/createNewConsultation",
  async (data, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewConsultation(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePatientTriage = createAsyncThunk(
  "triage/updatePatientTriage",
  async ({ triageId, consultId, triageData }, { rejectWithValue }) => {
    try {
      return await consultationApi.updatePatientTriageById(
        triageId,
        consultId,
        triageData
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePatientAssessment = createAsyncThunk(
  "consultation/updatePatientAssessment",
  async ({ id, consultId, formData }, { rejectWithValue }) => {
    try {
      return await consultationApi.updateExistingPatientAssessment(
        id,
        consultId,
        formData
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPatientTriageNote = createAsyncThunk(
  "triage/addPatientTriageNote",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientTriageNote(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPatientAssessmentNote = createAsyncThunk(
  "triage/addPatientAssessmentNote",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientAssessmentNote(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New Patient Medication
export const newPatientMedication = createAsyncThunk(
  "consultation/newPatientMedication",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientMedicationApi(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit Patient Medication
export const updatePatientMedication = createAsyncThunk(
  "consultation/updatePatientMedication",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await consultationApi.updateExistingPatientMedicationApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Patient Medication
export const deletePatientMedication = createAsyncThunk(
  "consultation/deletePatientMedication",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.deletePatientMedicationApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Patient Treatment
export const newPatientTreatment = createAsyncThunk(
  "consultation/newPatientTreatment",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientTreatmentApi(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit Patient Treatment
export const updatePatientTreatment = createAsyncThunk(
  "consultation/updatePatientTreatment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await consultationApi.updateExistingPatientTreatmentApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Patient Treatment
export const deletePatientTreatment = createAsyncThunk(
  "consultation/deletePatientTreatment",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.deletePatientTreatmentApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Patient Package
export const newPatientPackage = createAsyncThunk(
  "consultation/newPatientPackage",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientPackageApi(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit Patient Package
export const updatePatientPackage = createAsyncThunk(
  "consultation/updatePatientPackage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await consultationApi.updateExistingPatientPackageApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Patient Package
export const deletePatientPackage = createAsyncThunk(
  "consultation/deletePatientPackage",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.deletePatientPackageApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Patient Item
export const newPatientItem = createAsyncThunk(
  "consultation/newPatientItem",
  async (body, { rejectWithValue }) => {
    try {
      return await consultationApi.createNewPatientItemApi(body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit Patient Item
export const updatePatientItem = createAsyncThunk(
  "consultation/updatePatientItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await consultationApi.updateExistingPatientItemApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Patient Item
export const deletePatientItem = createAsyncThunk(
  "consultation/deletePatientItem",
  async (id, { rejectWithValue }) => {
    try {
      return await consultationApi.deletePatientItemApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const consultationsSlice = createSlice({
  name: "consultations",
  initialState: {
    consultationList: [],
    currentConsultation: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentConsultation: (state, action) => {
      state.currentConsultation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchConsultations
      .addCase(fetchConsultations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConsultations.fulfilled, (state, action) => {
        state.consultationList = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchConsultations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to fetch consultations.");
      })
      // fetchConsultationById
      .addCase(fetchConsultationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConsultationById.fulfilled, (state, action) => {
        state.currentConsultation = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchConsultationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to fetch consultation information.");
      })

      // fetchPatientConsultations
      .addCase(fetchPatientConsultations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientConsultations.fulfilled, (state, action) => {
        state.consultationList = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPatientConsultations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to fetch consultations.");
      })

      // newConsultation
      .addCase(newConsultation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newConsultation.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("A new consultation created.");
      })
      .addCase(newConsultation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to create new consultation.");
      })

      // updatePatientTriage
      .addCase(updatePatientTriage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatientTriage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientTriage = action.payload;
        toast.success("The triage has been updated successfully");
      })
      .addCase(updatePatientTriage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the triage");
      })

      // updatePatientAssessment
      .addCase(updatePatientAssessment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatientAssessment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientAssessment =
          action.payload.consultation;
        toast.success("The consultation has been updated successfully");
      })
      .addCase(updatePatientAssessment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the consultation");
      })

      // addPatientTriageNote
      .addCase(addPatientTriageNote.pending, (state) => {
        state.status = "note-loading";
      })
      .addCase(addPatientTriageNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientTriage.notes.push(action.payload);
        toast.success("The note has been added successfully");
      })
      .addCase(addPatientTriageNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the note");
      })

      // addPatientAssessmentNote
      .addCase(addPatientAssessmentNote.pending, (state) => {
        state.status = "note-loading";
      })
      .addCase(addPatientAssessmentNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientAssessment.notes.push(action.payload);
        toast.success("The note has been added successfully");
      })
      .addCase(addPatientAssessmentNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the note");
      })

      // newPatientMedication
      .addCase(newPatientMedication.pending, (state) => {
        state.status = "loading-medication";
      })
      .addCase(newPatientMedication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientAssessment.patientMedications.push(
          action.payload
        );
        toast.success("The medication has been added successfully");
      })
      .addCase(newPatientMedication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the medication");
      })

      // updatePatientMedication
      .addCase(updatePatientMedication.pending, (state) => {
        state.status = "loading-medication";
      })
      .addCase(updatePatientMedication.fulfilled, (state, action) => {
        state.status = "succeeded";
        const foundMedicationIndex =
          state.currentConsultation.patientAssessment.patientMedications.findIndex(
            (medication) => medication.id === action.payload.id
          );
        state.currentConsultation.patientAssessment.patientMedications[
          foundMedicationIndex
        ] = action.payload;
        toast.success("The medication has been updated successfully");
      })
      .addCase(updatePatientMedication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the medication");
      })

      // deletePatientMedication
      .addCase(deletePatientMedication.pending, (state) => {
        state.status = "loading-medication";
      })
      .addCase(deletePatientMedication.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filteredMedications =
          state.currentConsultation.patientAssessment.patientMedications.filter(
            (medication) => medication.id !== action.payload.id
          );
        state.currentConsultation.patientAssessment.patientMedications =
          filteredMedications;
        toast.success("The medication has been deleted successfully");
      })
      .addCase(deletePatientMedication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to delete the medication");
      })

      // create patient package
      .addCase(newPatientPackage.pending, (state) => {
        state.status = "loading-package";
      })
      .addCase(newPatientPackage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientPackages.push(action.payload);
        toast.success("The package has been added successfully");
      })
      .addCase(newPatientPackage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the package");
      })

      // update patient package
      .addCase(updatePatientPackage.pending, (state) => {
        state.status = "loading-package";
      })
      .addCase(updatePatientPackage.fulfilled, (state, action) => {
        state.status = "succeeded";
        const foundPackageIndex =
          state.currentConsultation.patientPackages.findIndex(
            (pack) => pack.id === action.payload.id
          );
        state.currentConsultation.patientPackages[foundPackageIndex] =
          action.payload;
        toast.success("The package has been updated successfully");
      })
      .addCase(updatePatientPackage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the package");
      })

      // delete patient package
      .addCase(deletePatientPackage.pending, (state) => {
        state.status = "loading-package";
      })
      .addCase(deletePatientPackage.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filteredPackage =
          state.currentConsultation.patientAssessment.patientPackages.filter(
            (pack) => pack.id !== action.payload.id
          );
        state.currentConsultation.patientAssessment.patientPackages =
          filteredPackage;
        toast.success("The package has been deleted successfully");
      })
      .addCase(deletePatientPackage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to delete the package");
      })

      // create patient treatment
      .addCase(newPatientTreatment.pending, (state) => {
        state.status = "loading-treatment";
      })
      .addCase(newPatientTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientAssessment.patientTreatments.push(
          action.payload
        );
        toast.success("The treatment has been added successfully");
      })
      .addCase(newPatientTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the treatment");
      })

      // update patient treatment
      .addCase(updatePatientTreatment.pending, (state) => {
        state.status = "loading-treatment";
      })
      .addCase(updatePatientTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const foundTreatmentIndex =
          state.currentConsultation.patientAssessment.patientTreatments.findIndex(
            (treat) => treat.id === action.payload.id
          );
        state.currentConsultation.patientAssessment.patientTreatments[
          foundTreatmentIndex
        ] = action.payload;
        toast.success("The treatment has been updated successfully");
      })
      .addCase(updatePatientTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the treatment");
      })

      // delete patient treatment
      .addCase(deletePatientTreatment.pending, (state) => {
        state.status = "loading-treatment";
      })
      .addCase(deletePatientTreatment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filteredTreatment =
          state.currentConsultation.patientAssessment.patientTreatments.filter(
            (treat) => treat.id !== action.payload.id
          );
        state.currentConsultation.patientAssessment.patientTreatments =
          filteredTreatment;
        toast.success("The treatment has been deleted successfully");
      })
      .addCase(deletePatientTreatment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to delete the treatment");
      })

      // create patient item
      .addCase(newPatientItem.pending, (state) => {
        state.status = "loading-item";
      })
      .addCase(newPatientItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConsultation.patientAssessment.patientItems.push(
          action.payload
        );
        toast.success("The item has been added successfully");
      })
      .addCase(newPatientItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to add the item");
      })

      // update patient item
      .addCase(updatePatientItem.pending, (state) => {
        state.status = "loading-item";
      })
      .addCase(updatePatientItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const foundItemIndex =
          state.currentConsultation.patientAssessment.patientItems.findIndex(
            (treat) => treat.id === action.payload.id
          );
        state.currentConsultation.patientAssessment.patientItems[
          foundItemIndex
        ] = action.payload;
        toast.success("The item has been updated successfully");
      })
      .addCase(updatePatientItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to update the item");
      })

      // delete patient item
      .addCase(deletePatientItem.pending, (state) => {
        state.status = "loading-item";
      })
      .addCase(deletePatientItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const filteredItem =
          state.currentConsultation.patientAssessment.patientItems.filter(
            (treat) => treat.id !== action.payload.id
          );
        state.currentConsultation.patientAssessment.patientItems = filteredItem;
        toast.success("The item has been deleted successfully");
      })
      .addCase(deletePatientItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to delete the item");
      });
  },
});

export const { setCurrentConsultation } = consultationsSlice.actions;

export default consultationsSlice.reducer;
