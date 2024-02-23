import * as React from "react";
import "../../../assets/style/BS5_Grid.css";
import "../../../assets/style/style.css";
import { tenderResultService } from "../../../_services/tenderResultPageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import BidderListModal from "../../../components/modal/BidderListModal";
// import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
// import { useContext } from "react";
import TenderArea from "../../../components/tender-area/TenderArea";
import Loader from "../../../components/loading-screen/Loader";
import { Skeleton } from "@mui/material";

const ResultAnnounced = (props) => {
  const {
    tenderForm,
    setDataFound,
    setFourthTabCount,
    page,
    setPage,
    setTenderForm,
    isSplitWord,
    setIsSplitWord,
    isSearchBy,
    setIsSearchBy,
  } = props;
  // const { selectedFromDate, selectedToDate, isDateSelected } =
  //   useContext(selectedDateRange);
  const [participatedResultData, setParticipatedResultData] = React.useState(
    []
  );
  const [participatedResultHashMore, setParticipatedResultHasMore] =
    React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");

  const fetchParticipatedResult = async () => {
    const nextParticipatedResult = await getParticipatedResult();
    if (nextParticipatedResult !== undefined && !isError) {
      nextParticipatedResult.length === 0 && participatedResultData.length === 0
        ? setIsError(true)
        : nextParticipatedResult.length === 0 &&
          participatedResultData.length > 0
        ? setParticipatedResultHasMore(false)
        : setParticipatedResultHasMore(true);
      setParticipatedResultData([
        ...participatedResultData,
        ...nextParticipatedResult,
      ]);
    }
  };

  const getParticipatedResult = async () => {
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      page_no: page,
      tender_status: 2,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success) {
      setLoader(false);
      setIsError(false);
      setPage((prev) => prev + 1);
      res.TotalRecord < 20
        ? setParticipatedResultHasMore(false)
        : setParticipatedResultHasMore(true);

      //search by split word*********************//
      if (res.TotalRecord < 20) {
        if (
          tenderForm.search_text !== undefined &&
          tenderForm.search_text !== null &&
          tenderForm.search_text.split(" ").length > 1 &&
          !tenderForm.search_by_split_word
        ) {
          setParticipatedResultData([...participatedResultData, ...res.Data]);
          setIsSplitWord(true);
          setPage(1);
          setTenderForm((prev) => ({ ...prev, search_by_split_word: true }));
          return;
        }
        //search by keyword and product id****************//
        if (
          tenderForm.search_by < 2 &&
          tenderForm.keyword_ids &&
          tenderForm.product_id &&
          !isSearchBy
        ) {
          setIsSearchBy(true);
          setPage(1);
          setParticipatedResultData([...participatedResultData, ...res.Data]);
          return;
        }
      }
      //use return for fetchResult function  for page wise data
      return res.Data;
    } else {
      // setIsError(true);
      return [];
    }
  };

  React.useEffect(() => {
    setPage(1);
    !isSearchBy && !isSplitWord && getCount();
    !isSearchBy && !isSplitWord && setLoader(true);
    fetchParticipatedResult();
  }, [tenderForm]);

  React.useEffect(() => {
    if (isSearchBy) {
      setTenderForm((prev) => ({ ...prev, search_by: 2, page_no: 1 }));
    }
  }, [isSearchBy]);

  const openParticipatedBidder = (e, participated_result) => {
    setModelOpen(true);
    setModalStage(participated_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({ result_id: participated_result.result_id })
      .then((res) => {
        if (res.Success) {
          setModelData(
            res.Data.map((obj) => {
              return { ...obj, result_id: participated_result.result_id };
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

  const getCount = async () => {
    const res = await tenderResultService.getCountService({
      ...tenderForm,
      tender_status: 2,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });

    if (res.Success === true && res.TotalRecord > 0)
      setFourthTabCount(res.Data);
  };

  return (
    <div className="FreshResult">
      {isError === true ? (
        <h3> No Result Found as per your Filter Criteria.</h3>
      ) : loader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={participatedResultData.length}
          hasMore={participatedResultHashMore}
          next={fetchParticipatedResult}
          style={{ overflow: "unset" }}
          loader={
            // <LinerLoader />
            participatedResultData.length > 19 && (
              <>
                <Skeleton sx={{ bgcolor: "grey.300" }} />
                <Skeleton sx={{ bgcolor: "grey.300" }} />
                <Skeleton sx={{ bgcolor: "grey.300" }} />
                <Skeleton sx={{ bgcolor: "grey.300" }} />
              </>
            )
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more record.</b>
            </p>
          }
          // scrollableTarget="scroll"
        >
          <TenderArea
            tenderResultData={participatedResultData}
            openParticipatedBidder={openParticipatedBidder}
            setDataFound={setDataFound}
            fromFavorite={false}
            tenderForm={tenderForm}
            setPage={setPage}
          />
        </InfiniteScroll>
      )}
      <BidderListModal
        modelOpen={modelOpen}
        setModelOpen={setModelOpen}
        modelData={modelData}
        modalStage={modalStage}
      />
    </div>
  );
};

export default ResultAnnounced;
