import * as React from "react";

import "../../../../../assets/style/BS5_Grid.css";
import "../../../../../assets/style/style.css";

import { tenderResultService } from "../../../../../_services/tenderResultPageServices";

import BidderListModal from "../../../../../components/modal/BidderListModal";
import { Button } from "@mui/material";
// import LinerLoader from "../../../../../components/loading-screen/LinerLoader";
import { selectedDateRange } from "../../../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setResultListingModel } from "../../../../../redux/slice";
import TenderArea from "../../../../../components/tender-area/TenderArea";
import Loader from "../../../../../components/loading-screen/Loader";

const FreshResults = (props) => {
  const { setFreshResultCount, freshResultCount, setPage } = props;
  const dispatch = useDispatch();
  const dashboardListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const sessionData = sessionStorage.getItem("bidModel");
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const [freshResultData, setFreshResultData] = React.useState([]);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [tenderForm, setTenderForm] = React.useState({ ...dashboardListing });

  React.useEffect(() => {
    if (isDateSelected) {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
      setIsDateSelected(false);
    } else {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
    }
  }, [selectedFromDate, selectedToDate]);

  const getFreshResult = () => {
    tenderResultService
      .getTenderResult({
        ...tenderForm,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
        page_no: 1,
        record_per_page: 5,
        tender_status: 3,
        tab_id: 1,
        user_id: parseInt(localStorage.getItem("user_id")),
        user_query_id: parseInt(
          localStorage.getItem("user_email_service_query_id")
        ),
      })
      .then((res) => {
        if (res.Success && res.TotalRecord > 0) {
          setLoader(false);
          setFreshResultData(res.Data);
        } else {
          setLoader(false);
          setFreshResultData([]);
        }
      })
      .catch((err) => {
        setLoader(true);
        console.log(err);
      });
  };

  const getCount = async () => {
    const res = await tenderResultService.getCountService({
      ...tenderForm,
      publication_date_from: selectedFromDate,
      publication_date_to: selectedToDate,
      tender_status: 3,
      tab_id: 1,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success === true && res.TotalRecord > 0)
      setFreshResultCount(res.Data);
  };

  React.useEffect(() => {
    getCount();
    setLoader(true);
    getFreshResult();
  }, [selectedFromDate, selectedToDate]);

  const openParticipatedBidder = (e, fresh_result) => {
    setModelOpen(true);
    setModalStage(fresh_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({
        result_id: fresh_result.result_id,
      })
      .then((res) => {
        if (res.Success) {
          setModelData(
            res.Data.map((obj) => {
              return { ...obj, result_id: fresh_result.result_id };
            })
          );
        } else {
          setModelData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFreshResults = () => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setResultListingModel({
          ...tenderForm,
          bidder_name: "",
          tender_status: 3,
          tab_id: 1,
        })
      );

      window.open(
        `/dashboard/tender-result?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  return (
    <>
      {loader === true ? (
        <Loader />
      ) : // ) : freshResultData.length === 0 && freshResultCount.resultcount === 0 ? (
      freshResultData.length === 0 ? (
        <h3>No Data Found</h3>
      ) : (
        <div className="FreshResult">
          <TenderArea
            tenderResultData={freshResultData}
            openParticipatedBidder={openParticipatedBidder}
            tenderForm={tenderForm}
            setPage={setPage}
          />
          <div className="view-btn">
            {freshResultData.length === 5 && (
              <Button variant="contained" onClick={handleFreshResults}>
                View More
              </Button>
            )}
          </div>
          <BidderListModal
            modelOpen={modelOpen}
            setModelOpen={setModelOpen}
            modelData={modelData}
            modalStage={modalStage}
          />
        </div>
      )}
    </>
  );
};

export default FreshResults;
