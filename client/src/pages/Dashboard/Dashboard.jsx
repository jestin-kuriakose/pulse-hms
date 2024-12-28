import doctor1 from "/images/doc1.png";
import doctor2 from "/images/doc2.png";
import doctor3 from "/images/doc3.png";
import doctors from "/images/doctors.png";
import appointments from "/images/appointments.png";
import earnings from "/images/earnings.png";
import patients from "/images/patients.png";
import { ArrowUpward } from "@mui/icons-material";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchBillings } from "../../features/Billing/billingSlice";
import { getAppointments } from "../../features/Appointments/appointmentsSlice";
import { fetchEmployees } from "../../features/Employees/employeeSlice";
import { Table } from "../../components/ui";
import { fetchPatients } from "../../features/MedicalRecords/patientsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: appointmentsList } = useSelector((state) => state.appointments);
  const { patientsList } = useSelector((state) => state.patients);
  const { billingList, status: billingStatus } = useSelector(
    (state) => state.billing
  );
  const {
    list: employeeList
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(getAppointments())
    dispatch(fetchPatients());
    dispatch(fetchBillings());
  }, [dispatch]);

  const doctorsList = useMemo(
    () => employeeList?.filter((emp) => emp?.position === "DOCTOR"),
    [employeeList]
  );

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const totalSum = billingList?.reduce((sum, bill) => sum + bill.total, 0);

  const summary = [
    {
      name: `${patientsList?.length > 1 ? "Total Patients" : "Patient"}`,

      image: patients,
      amount: patientsList?.length,
    },
    {
      name: `${doctorsList?.length > 1 ? "Total Doctors" : "Doctor"}`,
      image: doctors,
      amount: doctorsList?.length,
    },
    {
      name: `${
        appointmentsList?.length > 1 ? "Total Appointments" : "Appointment"
      }`,

      image: appointments,
      amount: appointmentsList?.length,
    },
    { name: "Total Earnings", image: earnings, amount: totalSum },
  ];

  const calculateMonthlyEarnings = (billingList) => {
    const monthlyEarnings = Array(12).fill(0); // Array to hold earnings for each month, initialized to 0 for Jan to Dec

    billingList?.forEach((bill) => {
      const date = new Date(bill.created_at);
      const month = date.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
      monthlyEarnings[month] += bill.total; // Add the total to the corresponding month
    });

    return monthlyEarnings; // Return an array of monthly totals
  };

  const earningsData = calculateMonthlyEarnings(billingList);

  const data = [
    { month: "January", earnings: earningsData[0] },
    { month: "February", earnings: earningsData[1] },
    { month: "March", earnings: earningsData[2] },
    { month: "April", earnings: earningsData[3] },
    { month: "May", earnings: earningsData[4] },
    { month: "June", earnings: earningsData[5] },
    { month: "July", earnings: earningsData[6] },
    { month: "August", earnings: earningsData[7] },
    { month: "September", earnings: earningsData[8] },
    { month: "October", earnings: earningsData[9] },
    { month: "November", earnings: earningsData[10] },
    { month: "December", earnings: earningsData[11] },
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
            className=" rounded-full w-10 h-10 bg-pry object-cover "
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
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="flex flex-col px-4 lg:px-8 w-full mt-8 justify-between gap-8 ">
        <div className="grid grid-cols-1 w-full gap-8 lg:gap-4 lg:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.name}
              className="p-6 gap-2 shadow-sm rounded-xl flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <img src={item.image} className="w-14 h-14" alt={item.name} />
              <div className="flex flex-col gap">
                <h4 className="font-main font-bold text-2xl ">{item.amount}</h4>
                <p className="font-main font-light text-xl">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-6 justify-between">
          <div className="p-6 gap-2 shadow-sm rounded-xl flex flex-col w-full lg:w-4/6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between w-full">
              <h6 className="font-main font-medium text-lg ">Cashflow</h6>
              <select className="border border-pry py-2 px-4 rounded-full font-main ">
                <option>Last 12 months</option>
                <option>Last 24 months</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <h6 className="font-main text-gray-400 font-light text-xs uppercase">
                Total cash
              </h6>
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <h6 className="font-main font-bold text-lg uppercase">
                    $13,232
                  </h6>
                  <div className="p-2 flex gap-2 items-center bg-green-200 rounded-full w-20 h-8">
                    <div className="bg-green-500 text-white w-2 h-2 p-2 rounded-full flex items-center justify-center">
                      <ArrowUpward sx={{ fontSize: 14 }} />
                    </div>
                    <p className="font-main text-black font-medium">4.5%</p>
                  </div>
                </div>
                <div className="flex">
                  <h4 className="font-main font-bold ">
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#202BD3"
                    fill="#080D58"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-6 gap-2 shadow-sm rounded-xl flex flex-col w-full lg:w-2/6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between w-full">
              <h6 className="font-main font-medium text-lg">Top Departments</h6>
              <button className="border border-pry rounded-full px-8 py-2 font-main transition duration-300">
                View All
              </button>
            </div>
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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
            <div className="grid grid-cols-4 gap-8">
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4 rounded-full p-2 bg-[#0088FE]"></div>
                <p className="font-main text-gray-400 text-xs">Surgery</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4 rounded-full p-2 bg-[#00C49F]"></div>
                <p className="font-main text-gray-400 text-xs">Cardiology</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4 rounded-full p-2 bg-[#FFBB28]"></div>
                <p className="font-main text-gray-400 text-xs">Neurology</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4 rounded-full p-2 bg-[#FF8042]"></div>
                <p className="font-main text-gray-400 text-xs">Family </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col lg:flex-row gap-6 justify-between">
          <div className="p-6 gap-2 shadow-sm rounded-xl flex flex-col w-full lg:w-4/6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between w-full">
              <h6 className="font-main font-medium text-lg ">Earnings</h6>
              <div className=" flex flex-col lg:flex-row gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 rounded-full p-2 bg-pry"></div>
                  <p className="font-main text-gray-400 text-xs">Income</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 rounded-full p-2 bg-sec-50"></div>
                  <p className="font-main text-gray-400 text-xs">Expense </p>
                </div>
                <select className="border border-pry py-2 px-4 rounded-full font-main text-pry">
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
            </div>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pv"
                    fill="#080D58"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#202BD3"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-6 gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm rounded-xl flex flex-col w-full lg:w-2/6">
            <div className="flex items-center justify-between w-full">
              <h6 className="font-main font-medium text-lg ">Top Doctors</h6>
              <button className="border border-pry rounded-full px-8 py-2 font-main  transition duration-300">
                View All
              </button>
            </div>
            <div style={{ width: "100%" }} className="h-auto">
              <Table rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
