import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext.jsx";
import App from "./App.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { persistor, store } from "./store/store.js";

const queryClient = new QueryClient();

const ThemedApp = () => {
  const { isDarkMode } = useDarkMode();
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <ThemedApp />
          </QueryClientProvider>
        </DarkModeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
