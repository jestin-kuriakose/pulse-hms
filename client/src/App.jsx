import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import createAppRoutes from "./routes/AppRoutes";

function App() {
  const { user } = useSelector((state) => state.auth);
  const router = createAppRoutes(user);

  return <RouterProvider router={router} />;
}

export default App;
