export const getPackageColumns = () => [
    {
      field: "package_name",
      headerName: "Name",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
      renderCell: (params) => {
        return `${params?.row?.package?.name} - ${params?.row?.package?.description}`;
      },
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 60,
      headerClassName: "font-main uppercase bg-sec-100 text-pry ",
      flex: 1,
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
        return `${params?.row?.package?.price}`;
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
        return `${params?.row?.quantity * params?.row?.package?.price}`;
      },
    },
  ]