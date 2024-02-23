import PropTypes from "prop-types";
import { Navigate, useParams, useRoutes } from "react-router-dom";
// components
import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./useAuthContext";
import { AutoAwesome } from "@mui/icons-material";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const params = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const autologinkey = urlParams.get("key");
  const { isAuthenticated, isInitialized } = useAuthContext();


  if (autologinkey) {
    return <> {children} </>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
