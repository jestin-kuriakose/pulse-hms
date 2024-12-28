const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_SERVER_URL;
// const serverURL = "https://sinta-server.onrender.com";

export default serverURL;
