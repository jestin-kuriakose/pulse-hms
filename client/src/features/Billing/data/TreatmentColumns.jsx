export const getTreatmentColumns = () => [
  {
    field: "name",
    headerName: "Name",
    width: 320,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    renderCell: (params) => {
      return (
        params?.row?.treatment?.name +
        " - " +
        params?.row?.treatment?.description
      );
    },
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 350,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    renderCell: (params) => {
      return params?.row?.notes;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    renderCell: (params) => {
      return params?.row?.treatment?.price;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    renderCell: (params) => {
      return params?.row?.quantity;
    },
  },
  {
    field: "total",
    headerName: "Total",
    width: 120,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    renderCell: (params) => {
      return params?.row?.quantity * params?.row?.treatment?.price;
    },
  },
];
