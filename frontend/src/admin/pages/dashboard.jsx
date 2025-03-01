import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ProfileComponent from "../components/profilecomplete";
import AllUsers from "../components/allusers";
import EditUser from "../components/edituser";
import AllAuctions from "../components/allauction";
import EditAuction from "../components/editauction";
import ErrorPage from "./errorpage";
import AllCategories from "../components/allcatagories";
import EditCategory from "../components/editcatagory";
import CreateCategory from "../components/createcategory";
import SingleAuctionDetail from "../../pages/singleauction";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row py-4">
        {/* Sidebar - Takes up 3 columns on large screens */}
        <div className="col-lg-3 mb-3">
          <Sidebar />
        </div>

        {/* Main Content - Takes up 9 columns on large screens */}
        <div className="col-lg-9">
          <Routes>
            <Route path="/users/*" element={<AllUsers />} />
            <Route path="/users/profile/:id" element={<ProfileComponent />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/auctions/*" element={<AllAuctions />} />
            <Route path="/auctions/edit/:id" element={<EditAuction />} />
            <Route
              path="/auctions/view/:id"
              element={<SingleAuctionDetail noPadding />}
            />
            <Route path="/categories/*" element={<AllCategories />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/create-category" element={<CreateCategory />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
