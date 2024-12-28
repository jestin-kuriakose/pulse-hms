import { useSelector } from "react-redux";

const InfoSection = ({ title, data }) => (
  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {data.map(({ label, value }) => (
      <p key={label}>
        <strong>{label}:</strong> {value}
      </p>
    ))}
  </div>
);

const PatientOverview = () => {
  const { currentPatient, status } = useSelector((state) => state.patients);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (!currentPatient) {
    return (
      <div className="flex justify-center items-center h-full">
        Patient not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <InfoSection
          title="Personal Information"
          data={[
            { label: "MR Number", value: currentPatient.mrNumber },
            { label: "Email", value: currentPatient.email },
            {
              label: "Phone",
              value: `${currentPatient.countryCode} ${currentPatient.phoneNumber}`,
            },
            { label: "Date of Birth", value: currentPatient.dob },
            { label: "Gender", value: currentPatient.gender },
            { label: "Nationality", value: currentPatient.nationality },
            {
              label: "Marital Status",
              value: currentPatient.maritalStatus || "N/A",
            },
          ]}
        />
        <InfoSection
          title="Additional Information"
          data={[
            { label: "Emirate", value: currentPatient.emirate },
            { label: "Country", value: currentPatient.country },
            { label: "Visa Type", value: currentPatient.visaType || "N/A" },
            { label: "National ID", value: currentPatient.nationalID || "N/A" },
            { label: "Other ID", value: currentPatient.otherID || "N/A" },
            { label: "Source", value: currentPatient.source },
          ]}
        />
        <InfoSection
          title="Emergency Contact"
          data={[
            {
              label: "Name",
              value: currentPatient.emergencyContactName || "N/A",
            },
            {
              label: "Relationship",
              value: currentPatient.emergencyContactRelationship || "N/A",
            },
            {
              label: "Number",
              value: currentPatient.emergencyContactNumber || "N/A",
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Medical Information</h2>
        <p>
          <strong>Allergies:</strong> {currentPatient.allergies || "None"}
        </p>
      </div>
    </div>
  );
};

export default PatientOverview;
