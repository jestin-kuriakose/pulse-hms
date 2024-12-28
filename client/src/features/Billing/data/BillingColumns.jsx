import { Visibility } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const getBillingColumns = () => [
  {
    field: "name",
    headerName: "Name",
    width: 60,
    flex: 1,
    renderCell: (params) => {
      return `${params?.row?.patient?.firstName} ${params?.row?.patient?.lastName}`;
    },
  },
  { field: "total", headerName: "Total", width: 100 },
  {
    field: "payments",
    headerName: "Payments",
    width: 100,
    renderCell: (params) => {
      return `${params?.row?.payments?.reduce(
        (sum, payment) => sum + payment?.amount,
        0
      )}`;
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return `${dayjs(params?.row?.created_at).format("YYYY-MM-DD")}`;
    },
  },
  {
    field: "doctor",
    headerName: "Doctor",
    width: 120,
    flex: 1,
    renderCell: (params) => {
      return `Dr. ${params?.row?.doctor?.user?.firstName} ${params?.row?.doctor?.user?.lastName}`;
    },
  },
  {
    field: "medications",
    headerName: "Medications",
    width: 100,
    renderCell: (params) => {
      return `${params?.row?.patientMedications?.length}`;
    },
  },
  {
    field: "treatments",
    headerName: "Treatments",
    width: 100,
    renderCell: (params) => {
      return `${params?.row?.patientTreatments?.length}`;
    },
  },
  {
    field: "packages",
    headerName: "Packages",
    width: 100,
    renderCell: (params) => {
      return `${params?.row?.patientPackages?.length}`;
    },
  },
  {
    field: "status",
    headerName: "Payment Status",
    width: 120,
    flex: 1,
    renderCell: (params) => (
      <button
        className={`w-full ${
          params.row.status === "Pending" ? "bg-orange-300" : "bg-green-400"
        }`}
      >
        {params.row.status}
      </button>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry",
    width: 100,
    renderCell: (params) => <ActionMenu params={params} />,
  },
];

const ActionMenu = ({params}) => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full text-pry hover:text-sec-50 transition duration-300"
      onClick={() => navigate(`/billing/${params.row.id}`)}
    >
      <Visibility />
    </button>
  );
};

export default getBillingColumns