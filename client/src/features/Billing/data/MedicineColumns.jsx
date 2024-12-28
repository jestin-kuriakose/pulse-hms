export const getMedicineColumns = () => [
  {
    field: "code",
    headerName: "Code",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params?.row?.medicine?.code}`;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 2,
    renderCell: (params) => {
      return `${params?.row?.medicine?.name} - ${params?.row?.medicine?.description}`;
    },
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 3,
    renderCell: (params) => {
      return `${params?.row?.notes}`;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params?.row?.medicine?.price}`;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params?.row?.quantity}`;
    },
  },
  {
    field: "total",
    headerName: "Total",
    width: 60,
    headerClassName: "font-main uppercase bg-sec-100 text-pry ",
    flex: 1,
    renderCell: (params) => {
      return `${params?.row?.quantity * params?.row?.medicine?.price}`;
    },
  },
];
