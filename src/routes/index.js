import { useRoutes } from "react-router-dom";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// layouts
// import CompactLayout from "../layouts/compact";
import DashboardLayout from "../layouts/dashboard";
// config
// import { PATH_AFTER_LOGIN } from "../config-global";
//
import {
  // Page404,
  LoginPage,
  Dashboard,
  Competitors,
  CompanyProfile,
  Comparison,
} from "./elements";

// pages

import ResultDetailPage from "../pages/listing_detail/Index";
import ListingPageIndex from "../pages/tenderResult/index";
import CompanyProfileTenders from "../pages/companyprofiletender";
import MyProfile from "../pages/myprofile";
import MisReports from "../pages/misReports";
// import MisReports from "../pages/misReports";
// import Welcome from "../pages/welcome/Welcome";
// import AutoLogin from "../AutoLogin";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: "/login",
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: "home", element: <Dashboard /> },
        { path: "competitors", element: <Competitors /> },
        { path: "company-profile", element: <CompanyProfile /> },
        { path: "tender-result", element: <ListingPageIndex /> },
        { path: "comparision", element: <Comparison /> },
        { path: "misreport", element: <MisReports /> },
        { path: "listingdetails/:id", element: <ResultDetailPage /> },
        { path: "companyprofile-tenders", element: <CompanyProfileTenders /> },
        { path: "profile", element: <MyProfile /> },
      ],
    },
    {
      path: "*",
      element: <LoginPage />,
      children: [{ path: "404", element: <LoginPage /> }],
    },
  ]);
}
