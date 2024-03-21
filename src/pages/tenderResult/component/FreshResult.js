import * as React from "react";
import "../../../assets/style/BS5_Grid.css";
import "../../../assets/style/style.css";
import { tenderResultService } from "../../../_services/tenderResultPageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import BidderListModal from "../../../components/modal/BidderListModal";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import TenderArea from "../../../components/tender-area/TenderArea";
import Loader from "../../../components/loading-screen/Loader";
import { Skeleton } from "@mui/material";

const FreshResult = ({
  tenderForm,
  setDataFound,
  setFirtsTabCount,
  page,
  setPage,
  setTenderForm,
  isSplitWord,
  setIsSplitWord,
  isSearchBy,
  setIsSearchBy,
}) => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const [freshResultData, setFreshResultData] = React.useState([]);
  const [freshResultHashMore, setFreshResultHasMore] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  // const [page, setPage] = React.useState(1);
  const [loader, setLoader] = React.useState(true);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");

  const fetchFreshResult = async () => {
    const nextFreshResult = await getfreshResult();
    if (nextFreshResult !== undefined && !isError) {
      nextFreshResult.length === 0 && freshResultData.length === 0
        ? setIsError(true)
        : nextFreshResult.length === 0 && freshResultData.length > 0
        ? setFreshResultHasMore(false)
        : setFreshResultHasMore(true);
      setFreshResultData([...freshResultData, ...nextFreshResult]);
    }
  };

  const getfreshResult = async () => {
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      page_no: page,
      tender_status: 3,
      tab_id: 1,
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
        ? setFreshResultHasMore(false)
        : setFreshResultHasMore(true);

      //search by split word*********************//
      if (res.TotalRecord < 20) {
        if (
          tenderForm.search_text.split(" ").length > 1 &&
          !tenderForm.search_by_split_word
        ) {
          setFreshResultData([...freshResultData, ...res.Data]);
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
          setFreshResultData([...freshResultData, ...res.Data]);
          return;
        }
      }
      return res.Data;
    } else {
      setLoader(false);
      // setIsError(true);
      return [];
    }
  };

  React.useEffect(() => {
    setPage(1);
    fetchFreshResult();
    if (!tenderForm.search_by_split_word) {
      !isSearchBy && !isSplitWord && getCount();
      !isSearchBy && !isSplitWord && setLoader(true);
    } else {
      setFreshResultHasMore(true);
    }
  }, [tenderForm]);

  React.useEffect(() => {
    if (isSearchBy) {
      setTenderForm((prev) => ({ ...prev, search_by: 2, page_no: 1 }));
    }
  }, [isSearchBy]);

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

    if (res.Success === true && res.TotalRecord > 0) setFirtsTabCount(res.Data);
  };

  return (
    <div className="FreshResult">
      {isError === true ? (
        <h3> No Result Found as per your Filter Criteria.</h3>
      ) : loader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={freshResultData.length}
          hasMore={freshResultHashMore}
          next={fetchFreshResult}
          style={{ overflow: "unset" }}
          loader={
            // <LinerLoader />
            freshResultData.length > 19 && (
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
            tenderResultData={freshResultData}
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

export default FreshResult;
