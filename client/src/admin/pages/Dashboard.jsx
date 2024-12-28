import { ToastContainer, toast } from "react-toastify";
import doctor1 from "../../assets/images/doc1.png";
import doctor2 from "../../assets/images/doc2.png";
import doctor3 from "../../assets/images/doc3.png";
import "react-toastify/dist/ReactToastify.css";
import doctors from "../assets/doctors.png";
import appointments from "../assets/appointments.png";
import earnings from "../assets/earnings.png";
import patients from "../assets/patients.png";
import { ArrowUpward } from "@mui/icons-material";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
  Rectangle,
  Legend,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";

const Dashboard = () => {
  const data = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Aug", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Sep", uv: 2490, pv: 4300, amt: 2100 },
    { name: "Oct", uv: 1490, pv: 4300, amt: 2100 },
    { name: "Nov", uv: 2690, pv: 4300, amt: 2100 },
    { name: "Dec", uv: 590, pv: 4300, amt: 2100 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const summary = [
    { name: "Total Patients", image: patients, amount: "2K" },
    { name: "Total Doctors", image: doctors, amount: "4K" },
    { name: "Total Appointments", image: appointments, amount: "8K" },
    { name: "Total Earnings", image: earnings, amount: "200K" },
  ];
  const barData = [
    {
      name: "Mon",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Tue",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Wed",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Thu",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Fri",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Sat",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Sun",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const rows = [
    { id: 1, image: doctor1, name: "Jane Doe", department: "Cardiology" },
    { id: 2, image: doctor2, name: "John Smith", department: "Urology" },
    { id: 3, image: doctor3, name: "Joe Smith", department: "Family" },
  ];
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 60,

      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      renderCell: (params) => {
        return (
          <img
            className=' rounded-full w-10 h-10 bg-pry object-cover '
            src={params.row.image}
            alt={params.row.name}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 60,
      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      flex: 1,
    },

    {
      field: "department",
      headerName: "Department",
      headerClassName: "font-main font-medium bg-[#F9F9FC] text-pry ",
      width: 120,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col px-4 lg:px-8 w-full mt-8 justify-between gap-8'>
        <div className='grid grid-cols-1 w-full gap-8 lg:gap-4 lg:grid-cols-4'>
          {summary.map((item) => (
            <div
              key={item.name}
              className='p-6 gap-2 bg-white shadow-sm rounded-xl flex flex-col'
            >
              <img src={item.image} className='w-14 h-14' alt={item.name} />
              <div className='flex flex-col gap'>
                <h4 className='font-main font-bold text-2xl text-pry'>
                  {item.amount}
                </h4>
                <p className='font-main font-light text-xl text-pry'>
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col lg:flex-row w-full gap-6 justify-between'>
          <div className='p-6 gap-2 bg-white shadow-sm rounded-xl flex flex-col w-full lg:w-4/6'>
            <div className='flex items-center justify-between w-full'>
              <h6 className='font-main font-medium text-lg text-pry'>
                Cashflow
              </h6>
              <select className='border border-pry py-2 px-4 rounded-full font-main text-pry'>
                <option>Last 12 months</option>
                <option>Last 24 months</option>
              </select>
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <h6 className='font-main text-gray-400 font-light text-xs uppercase'>
                Total cash
              </h6>
              <div className='w-full flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <h6 className='font-main text-pry font-bold text-lg uppercase'>
                    $13,232
                  </h6>
                  <div className='p-2 flex gap-2 items-center bg-green-200 rounded-full w-20 h-8'>
                    <div className='bg-green-500 text-white w-2 h-2 p-2 rounded-full flex items-center justify-center'>
                      <ArrowUpward sx={{ fontSize: 14 }} />
                    </div>
                    <p className='font-main text-black font-medium'>4.5%</p>
                  </div>
                </div>
                <div className='flex'>
                  <h4 className='font-main font-bold text-pry'>
                    January-December 2024
                  </h4>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='uv'
                    stroke='#202BD3'
                    fill='#080D58'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='p-6 gap-2 bg-white shadow-sm rounded-xl flex flex-col w-full lg:w-2/6'>
            <div className='flex items-center justify-between w-full'>
              <h6 className='font-main font-medium text-lg text-pry'>
                Top Departments
              </h6>
              <button className='border border-pry rounded-full px-8 py-2 font-main text-pry hover:bg-pry hover:text-white transition duration-300'>
                View All
              </button>
            </div>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='grid grid-cols-4 gap-8'>
              <div className='flex gap-1 items-center'>
                <div className='w-4 h-4 rounded-full p-2 bg-[#0088FE]'></div>
                <p className='font-main text-gray-400 text-xs'>Surgery</p>
              </div>
              <div className='flex gap-1 items-center'>
                <div className='w-4 h-4 rounded-full p-2 bg-[#00C49F]'></div>
                <p className='font-main text-gray-400 text-xs'>Cardiology</p>
              </div>
              <div className='flex gap-1 items-center'>
                <div className='w-4 h-4 rounded-full p-2 bg-[#FFBB28]'></div>
                <p className='font-main text-gray-400 text-xs'>Neurology</p>
              </div>
              <div className='flex gap-1 items-center'>
                <div className='w-4 h-4 rounded-full p-2 bg-[#FF8042]'></div>
                <p className='font-main text-gray-400 text-xs'>Family </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col lg:flex-row gap-6 justify-between'>
          <div className='p-6 gap-2 bg-white shadow-sm rounded-xl flex flex-col w-full lg:w-4/6'>
            <div className='flex items-center justify-between w-full'>
              <h6 className='font-main font-medium text-lg text-pry'>
                Earnings
              </h6>
              <div className=' flex flex-col lg:flex-row gap-2'>
                <div className='flex gap-1 items-center'>
                  <div className='w-4 h-4 rounded-full p-2 bg-pry'></div>
                  <p className='font-main text-gray-400 text-xs'>Income</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <div className='w-4 h-4 rounded-full p-2 bg-sec-50'></div>
                  <p className='font-main text-gray-400 text-xs'>Expense </p>
                </div>
                <select className='border border-pry py-2 px-4 rounded-full font-main text-pry'>
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
            </div>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  width={500}
                  height={300}
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='pv'
                    fill='#080D58'
                    activeBar={<Rectangle fill='pink' stroke='blue' />}
                  />
                  <Bar
                    dataKey='uv'
                    fill='#202BD3'
                    activeBar={<Rectangle fill='gold' stroke='purple' />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='p-6 gap-2 bg-white shadow-sm rounded-xl flex flex-col w-full lg:w-2/6'>
            <div className='flex items-center justify-between w-full'>
              <h6 className='font-main font-medium text-lg text-pry'>
                Top Doctors
              </h6>
              <button className='border border-pry rounded-full px-8 py-2 font-main text-pry hover:bg-pry hover:text-white transition duration-300'>
                View All
              </button>
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
