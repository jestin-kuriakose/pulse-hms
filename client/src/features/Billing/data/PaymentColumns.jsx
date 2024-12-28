import { DeleteForever, EditNote } from "@mui/icons-material";
import dayjs from "dayjs";

export const getPaymentColumns = ({ handleEdit, handleDelete }) => [
  {
    field: "updatedAt",
    headerName: "Date",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
    renderCell: (params) => {
      return dayjs(params?.row?.updatedAt).format("llll");
    },
  },
  {
    field: "paymentType",
    headerName: "Payment Type",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",

    width: 100,
    renderCell: (params) => {
      return (
        <ActionMenu
          params={params}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    },
  },
];

const ActionMenu = ({ params, handleEdit, handleDelete }) => {
  return (
    <div className="flex items-center justify-center py-2  gap-4">
      <button
        className="w-full  text-blue-500 hover:text-red-600 transition duration-300 "
        onClick={() => handleEdit(params.row)}
      >
        <EditNote />
      </button>
      <button
        className="w-full  text-red-500 hover:text-red-600 transition duration-300 "
        onClick={() => handleDelete(params.row)}
      >
        <DeleteForever />
      </button>
    </div>
  );
};
