import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, MainLoader } from "../components";
import { AppContext } from "../context";
import {
  Page404,
  Login,
  BranchChat,
  EnvironmentalSetup,
  Orders,
  EditProfile,
  ChangePassword,
  ForgotPassword,
  EmailVerification,
  AccessDenied,
  Advertising,
  // PaymentMethods,
  Branch,
  AdminChat,
  Dashboard,
  AdminOptions as TeachersDashbord,
  Help as EducationInstitute,
  Terms as ClaimStationDasboard,
  Riders as RidersDashboard,
} from "../pages";
import { base_url } from "../utils/url";
import RiderStatusCheck from "../pages/RiderStatusCheck";
import OrderLogs from "../pages/OrderLogs";

// Router component handles the routing of the application
const Router = () => {
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const privateRoutes = (Page) => (user ? <Page /> : <AccessDenied />);
  const publicRoutes = (Page) =>
    user ? <Navigate to="/dashboard" /> : <Page />;

  const login = async (email, password) => {
    setIsLoading(true);
    let json = null;

    try {
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(`${base_url}/admin-login`, requestOptions);
      json = await res.json();

      if (json.success) {
        let data = json.success.data;

        setUser(data);
      } else {
        localStorage.clear();
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user"));

    if (user_data) {
      login(user_data.email, user_data.password);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  return (
    <>
      <MainLoader
        extraStyles={`${isLoading ? "" : "!opacity-0 !pointer-events-none"}`}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Layout /> : <Navigate to="/login" replace />}
          >
            {user?.role_id == 1 ? (
              <Route path="/dashboard" element={privateRoutes(Dashboard)} />
            ) : (
              <Route index path="/orders" element={privateRoutes(Orders)} />
            )}
            <Route path="/edit-profile" element={privateRoutes(EditProfile)} />
            <Route
              path="/EnvironmentalSetup"
              element={privateRoutes(EnvironmentalSetup)}
            />
            <Route
              path="/advertising-and-annoucements"
              element={privateRoutes(Advertising)}
            />
            <Route path="/BranchChat" element={privateRoutes(BranchChat)} />
            <Route
              path="/RiderActivity"
              element={privateRoutes(RiderStatusCheck)}
            />
            <Route path="/OrderLogs" element={privateRoutes(OrderLogs)} />
            <Route path="/Chat" element={privateRoutes(BranchChat)} />
            {/* <Route
              path="/payment-methods"
              element={privateRoutes(PaymentMethods)}
            /> */}
            <Route
              path="/education-institute"
              element={privateRoutes(EducationInstitute)}
            />

            <Route path="/Branch" element={privateRoutes(Branch)} />
            <Route path="/AdminChat" element={privateRoutes(AdminChat)} />

            <Route index path="/orders" element={privateRoutes(Orders)} />

            <Route path="/dashboard">
              <Route
                index
                element={privateRoutes(
                  user?.role_id == "4"
                    ? TeachersDashbord
                    : user?.role_id == "2"
                    ? Orders
                    : Dashboard
                )}
              />
              <Route
                path="/dashboard/teachers"
                element={privateRoutes(TeachersDashbord)}
              />
              <Route
                path="/dashboard/riders"
                element={privateRoutes(RidersDashboard)}
              />
              <Route
                path="/dashboard/claim-station"
                element={privateRoutes(ClaimStationDasboard)}
              />
            </Route>
          </Route>

          <Route path="*" element={<Page404 />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/forgot-password"
            element={publicRoutes(ForgotPassword)}
          />
          <Route
            path="/email-verification"
            element={publicRoutes(EmailVerification)}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

// Auth component checks if the user has the allowed role and renders the protected routes
// const Auth = ({ allowedRoles }) => {
//   const { user } = useContext(AppContext);
//   const isAllowed = allowedRoles.find(
//     (role) => user?.role?.toLowerCase() === role?.toLowerCase()
//   );

//   // Check if the user role is allowed and render the protected routes
//   return isAllowed ? (
//     <Outlet />
//   ) : user.role === "super_admin" ? (
//     <Navigate to="/company-invoices" replace />
//   ) : (
//     <Navigate to="/" replace />
//   );
// };

export default Router;
