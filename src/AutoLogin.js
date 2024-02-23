import React, { useEffect } from "react";
import { loginService } from "./_services/loginService";
import {
  fromDefaulDate,
  toDefaultDate,
} from "./components/date-input/FromDateToDate";
import { useNavigate, useParams } from "react-router";
import { setSession } from "./auth/utils";
import { useDispatch, useSelector } from "react-redux";
import { setResultListingModel, setSelectedListing } from "./redux/slice";
import { useState } from "react";
import Loader from "./components/loading-screen/Loader";

const AutoLogin = () => {
  const topCompetitorsTableListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const dispatch = useDispatch();
  const [tenderForm, setTenderForm] = useState({
    ...topCompetitorsTableListing,
  });
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  // const jsonString =
  //   "F9A199E792FAF1DD72846CDF03B6FA632F50309BFFE5D8293D6537C0F6ECADD883CAD4847E71A73481A30C5D666884961BFDAB37143C125ABEEA8AA64A908B77";

  const getAutoLogin = async () => {
    if (params.autologinkey.length > 0) {
      const res = await loginService.autoLogin(params.autologinkey);

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
        localStorage.removeItem("dashboardStatics");
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
      } else setIsError(true);
    }
  };

  useEffect(() => {
    getAutoLogin();
  }, []);

  return <>{isError ? <Loader /> : <h2>Please wait</h2>}</>;
};

export default AutoLogin;
