import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, MainLoader } from "../components";
import { AppContext } from "../context";
import {
  Page404,
  Login,
  Jobs,
  Companies,
  Invoices,
  EditProfile,
  ChangePassword,
  ForgotPassword,
  EmailVerification,
  AccessDenied,
  Packages,
  // PaymentMethods,
  TransactionLogs,
  Dashboard,
  AdminOptions as TeachersDashbord,
  Help as EducationInstitute,
  Terms as ClaimStationDasboard,
  WorkTypes as RidersDashboard,
} from "../pages";
import { base_url } from "../utils/url";

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
            <Route path="/dashboard" element={privateRoutes(Dashboard)} />
            <Route path="/edit-profile" element={privateRoutes(EditProfile)} />
            <Route path="/subscribers" element={privateRoutes(Companies)} />
            <Route path="/advertising-and-annoucements" element={privateRoutes(Packages)} />
            <Route path="/jobs" element={privateRoutes(Jobs)} />
            {/* <Route
              path="/payment-methods"
              element={privateRoutes(PaymentMethods)}
            /> */}
              <Route path="/education-institute" element={privateRoutes(EducationInstitute)} />

            <Route
              path="/transactions"
              element={privateRoutes(TransactionLogs)}
            />

            <Route
              index
              path="/orders"
              element={privateRoutes(Invoices)}
            />

            <Route path="/dashboard">
              <Route
                index
                element={privateRoutes(Dashboard)}
              />
              <Route path="/dashboard/teachers" element={privateRoutes(TeachersDashbord)} />
              <Route path="/dashboard/riders" element={privateRoutes(RidersDashboard)} />
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
