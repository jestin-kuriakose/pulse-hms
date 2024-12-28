import { Visibility } from "@mui/icons-material";

const getConsultationColumns = (navigate) => [
  {
    field: "id",
    headerName: "ID",
    width: 60,
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
    flex: 1,
  },
  {
    field: "patientName",
    headerName: "Patient Name",
    width: 60,
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params.row.patient?.firstName} ${params.row.patient?.lastName}`;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 60,
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params.row.patient?.email}`;
    },
  },

  {
    field: "phoneNumber",
    headerName: "Mobile No.",
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return `${params.row.patient?.phoneNumber}`;
    },
  },

  {
    field: "doctor",
    headerName: "Doctor",
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return `Dr. ${params.row.doctor?.user?.firstName} ${params.row.doctor?.user?.lastName}`;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",

    flex: 1,
    renderCell: (params) => {
      return (
        <button
          className={`w-full ${
            params.row.status === "doctor-seen"
              ? "bg-green-400"
              : params.row.status === "nurse-seen"
              ? "bg-blue-300"
              : "bg-orange-300"
          }`}
        >
          {params.row.status}
        </button>
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    headerClassName: "font-main font-medium bg-[#F9F9FC]  text-pry ",

    width: 100,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center  gap-4">
          <button
            className="w-full text-pry dark:text-white hover:text-sec-50 transition duration-300 "
            onClick={() => navigate(`/consultations/${params.row.id}`)}
          >
            <Visibility />
          </button>
        </div>
      );
    },
  },
];

export default getConsultationColumns;
