import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {
  AdminProtected,
  AdminRoutes,
  AdminPublicRoute,
} from "../auth/Protected";

const App = () => {
  return (
    <>
      <Header />
      <div className="container mt-4"> {/* Bootstrap container for spacing */}
        <Routes>
          <Route element={<AdminPublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<AdminProtected />}>
            <Route element={<AdminRoutes />}>
              <Route path="/*" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
