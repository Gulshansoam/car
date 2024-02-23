import { Helmet } from "react-helmet-async";
import Login from "./login/Index";
import React, { useEffect } from "react";
import { loginService } from "../_services/loginService";
import {
  fromDefaulDate,
  toDefaultDate,
} from "../components/date-input/FromDateToDate";
import { useNavigate, useParams } from "react-router";
import { setSession } from "../auth/utils";
import { useDispatch, useSelector } from "react-redux";
import { setResultListingModel, setSelectedListing } from "../redux/slice";
import { useState } from "react";
import Loader from "../components/loading-screen/Loader";
// sections
// import Login from '../sections/auth/Login';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const topCompetitorsTableListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const dispatch = useDispatch();
  const [tenderForm, setTenderForm] = useState({
    ...topCompetitorsTableListing,
  });
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  // const params = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const autologinkey = urlParams.get("key");

  const getAutoLogin = async () => {
    // console.log(autologinkey, "autologinkey");
    if (autologinkey !== null && autologinkey.length > 0) {
      const res = await loginService.autoLogin(autologinkey);

      if (res.Success === true) {
        const {
          user_email_service_query_id,
          user_id,
          token,
          user_name,
          redirection_page_id,
          participated_bidder_name,
          company_name,
        } = res.Data;

        localStorage.setItem("user_name", company_name);
        localStorage.setItem(
          "user_email_service_query_id",
          user_email_service_query_id
        );
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("from_date", fromDefaulDate());
        localStorage.setItem("to_date", toDefaultDate());
        setSession(token);

        if (token.length > 0 && redirection_page_id === 1) {
          dispatch(
            setResultListingModel({
              ...tenderForm,
              tender_status: 3,
              bidder_name: "",
              user_id: user_id,
              user_query_id: user_email_service_query_id,
              publication_date_from: fromDefaulDate(),
              publication_date_to: toDefaultDate(),
            })
          );
          navigate("/dashboard/tender-result");
        } else if (
          token.length > 0 &&
          user_name.length > 0 &&
          redirection_page_id === 2
        ) {
          dispatch(
            setSelectedListing({
              ...tenderForm,
              tender_status: 7,
              bidder_name: participated_bidder_name,
              user_id: user_id,
              user_query_id: user_email_service_query_id,
              publication_date_from: fromDefaulDate(),
              publication_date_to: toDefaultDate(),
            })
          );
          navigate("/dashboard/companyprofile-tenders");
        }
      } else {
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email_service_query_id");
        localStorage.removeItem("user_id");
        localStorage.removeItem("from_date");
        localStorage.removeItem("to_date");
      }
    }
  };

  useEffect(() => {
    if (autologinkey !== undefined) {
      getAutoLogin();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI</title>
      </Helmet>
      {isError ? <Loader /> : <Login />}
      {/* <Login /> */}
    </>
  );
}
