import * as React from "react";
import "../../../../../assets/style/BS5_Grid.css";
import "../../../../../assets/style/style.css";
import { tenderResultService } from "../../../../../_services/tenderResultPageServices";
import { Button } from "@mui/material";
import BidderListModal from "../../../../../components/modal/BidderListModal";
import { setSelectedListing } from "../../../../../redux/slice";
import { useDispatch } from "react-redux";
import TenderArea from "../../../../../components/tender-area/TenderArea";
import Loader from "../../../../../components/loading-screen/Loader";

const AwardedTenders = (props) => {
  const {
    tenderForm,
    setSecondTabCount,
    stateNames,
    organizationType,
    department,
    stage,
    setPage,
  } = props;
  const dispatch = useDispatch();
  const [participatedTender, setParticipatedTender] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  // Api call for tender result-------------------------------------//>

  React.useEffect(() => {
    getCount();
    setLoader(true);
    getParticipatedTenders();
  }, [tenderForm]);

  const getParticipatedTenders = async () => {
    setLoader(true);
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      tender_status: 6,
      page_no: 1,
      record_per_page: 5,
      participant_name: "",
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success && res.TotalRecord > 0) {
      setLoader(false);
      setIsError(false);
      setParticipatedTender(res.Data);
    } else {
      setLoader(false);
      setParticipatedTender([]);
    }
  };

  const getCount = async () => {
    const res = await tenderResultService.getCountService({
      ...tenderForm,
      tender_status: 6,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success === true && res.TotalRecord > 0) {
      setSecondTabCount(res.Data);
    }
  };

  //-------------------------------------------------------

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

  //----------------------------View More Function---------------------------
  const handleViewMore = () => {
    const sessionData = sessionStorage.getItem("bidModel");
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    dispatch(
      setSelectedListing({
        ...tenderForm,
        tender_status: 6,
        record_per_page: 20,
        stage: stage,
        state_ids: stateNames,
        organization_id: department,
        organization_type_name: organizationType,
      })
    );
    window.open(
      `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
    );
  };

  return (
    <>
      {loader === true ? (
        <Loader />
      ) : participatedTender.length === 0 ? (
        <h3>No Data Found</h3>
      ) : (
        <div className="FreshResult">
          <TenderArea
            tenderResultData={participatedTender}
            openParticipatedBidder={openParticipatedBidder}
            tenderForm={tenderForm}
            setPage={setPage}
          />
          <div className="view-btn">
            {participatedTender.length === 5 && (
              <Button variant="contained" onClick={handleViewMore}>
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

export default AwardedTenders;
