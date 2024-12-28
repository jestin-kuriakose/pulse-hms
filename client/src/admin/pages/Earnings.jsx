import { DeleteForever, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const Earnings = () => {
  const rows = [
    {
      id: 1,
      date: "24th July, 2024",

      type: "Earning",

      amount: "15,000",
    },
  ];
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 60,
      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      flex: 1,
    },

    {
      field: "type",
      headerName: "Type",
      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      width: 120,
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      width: 120,
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "font-main font-medium bg-[#F9F9FC]  text-pry ",

      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex items-center justify-center  gap-4'>
            <button className='w-full  text-pry hover:text-sec-50 transition duration-300 '>
              <Visibility />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='bg-white w-full mt-2 px-2 lg:px-12 h-auto py-6 flex flex-col gap-2 drop-shadow-sm'>
      <button className='bg-pry text-white h-12 hover:bg-sec-50 transition duration-300  font-main rounded-lg w-3/6 lg:w-1/4  '>
        Add new Earning/Expense
      </button>
      <div className='flex justify-between'>
        <h6 className='font-main mt-4 text-pry text-lg font-semibold'>
          Finances
        </h6>
        <select className=' w-40 bg-pry  py-3 px-4 focus:outline-none rounded font-main text-white'>
          <option> Earnings</option>
          <option> Expense</option>
        </select>
      </div>
      <div style={{ width: "100%" }} className='h-auto'>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            border: 0,
            backgroundColor: "#ffffff",
            fontFamily: "Sora",
            fontSize: "14px",
          }}
        />
      </div>
    </div>
  );
};

export default Earnings;