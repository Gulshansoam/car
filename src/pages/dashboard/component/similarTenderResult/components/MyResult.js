import * as React from "react";
import "../../../../../assets/style/BS5_Grid.css";
import "../../../../../assets/style/style.css";
import { DashboardTenderModel } from "../model/SimilarTenderModel";
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

const MyResults = (props) => {
  const { myResultCount, setMyResultCount, setPage } = props;
  const sessionData = sessionStorage.getItem("bidModel");
  const dispatch = useDispatch();
  const dashboardListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const [myResultData, setMyResultData] = React.useState([]);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [tenderForm, setTenderForm] = React.useState({ ...dashboardListing });

  React.useEffect(() => {
    getCount();
    setLoader(true);
    getMyResult();
  }, [selectedFromDate, selectedToDate]);

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

  const getMyResult = () => {
    tenderResultService
      .getTenderResult({
        ...DashboardTenderModel,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
        page_no: 1,
        tab_id: 0,
        tender_status: 5,
        bidder_name: localStorage.getItem("user_name"),
        user_id: parseInt(localStorage.getItem("user_id")),
        user_query_id: parseInt(
          localStorage.getItem("user_email_service_query_id")
        ),
      })
      .then((res) => {
        if (res.Success && res.TotalRecord > 0) {
          setLoader(false);
          setMyResultData(res.Data);
        } else {
          setLoader(false);
          setMyResultData([]);
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
      tender_status: 5,
      tab_id: 0,
      bidder_name: localStorage.getItem("user_name"),
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success === true && res.TotalRecord > 0) {
      setMyResultCount(res.Data);
    }
  };

  const handleMyResultViewMore = () => {
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
          tender_status: 5,
          page_no: 1,
          record_per_page: 5,
        })
      );

      window.open(
        `/dashboard/tender-result?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const openParticipatedBidder = (e, fresh_result) => {
    setModelOpen(true);
    setModalStage(fresh_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({ result_id: fresh_result.result_id })
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

  return (
    <>
      {loader === true ? (
        <Loader />
      ) : myResultData.length === 0 ? (
        <h3>No Data Found</h3>
      ) : (
        <div className="FreshResult">
          <TenderArea
            tenderResultData={myResultData}
            openParticipatedBidder={openParticipatedBidder}
            tenderForm={tenderForm}
            setPage={setPage}
          />
          <div className="view-btn">
            {myResultData.length === 5 && (
              <Button variant="contained" onClick={handleMyResultViewMore}>
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

export default MyResults;
