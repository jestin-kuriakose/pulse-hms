import React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Table = ({
  rows,
  columns,
  isLoading,
  customStyles = {},
  ...props
}) => {
  const theme = useTheme();

  const dataGridTheme = createTheme({
    palette: {
      mode: theme.palette.mode,
    },
    typography: {
      fontFamily: 'Sora, sans-serif',
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            backgroundColor: theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.mode === 'dark' ? '#111827' : '#f3f4f6',
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#111827',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#f9fafb',
            },
          },
        },
      },
    },
  });

  const defaultStyles = {
    height: 400,
    width: '100%',
  };

  const mergedStyles = { ...defaultStyles, ...customStyles };

  return (
    <ThemeProvider theme={dataGridTheme}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row?.id}
        sx={mergedStyles}
        slots={{ toolbar: CustomToolbar }}
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        {...props}
      />
    </ThemeProvider>
  );
};

export default Table;