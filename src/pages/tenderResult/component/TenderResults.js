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

const TenderResults = ({
  tenderForm,
  setDataFound,
  setSecondTabCount,
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
  const [tenderResultData, setTenderResultData] = React.useState([]);
  const [tenderResultHasMore, setTenderResultHasMore] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");

  //---main function for data showing in fresh result tab listing.......
  const fetchFreshResult = async () => {
    //--->getfreshResult always call using async and await
    const nextFreshResult = await getfreshResult();
    //--->condition for hasmore data in Infinite Scroll
    if (nextFreshResult !== undefined && !isError) {
      setPage(page + 1);
      nextFreshResult.length === 0 && tenderResultData.length === 0
        ? setIsError(true)
        : nextFreshResult.length === 0 && tenderResultData.length > 0
        ? setTenderResultHasMore(false)
        : setTenderResultHasMore(true);
      //---->setting prev page data and next page data i.e, pagewise
      setTenderResultData([...tenderResultData, ...nextFreshResult]);
    }
  };

  // Api call for tender result-------------------------------------//>
  const getfreshResult = async () => {
    //set tabid when data is render according tab_id, participant_name and stage in future............
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      page_no: page,
      tab_id: 0,
      // tender_status: 0,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });
    if (res.Success) {
      setLoader(false);
      setIsError(false);
      // console.log(page);

      // res.TotalRecord < 20
      //   ? setTenderResultHasMore(false)
      //   : setTenderResultHasMore(true);

      //search by split word*********************//
      if (res.TotalRecord < 20) {
        if (
          tenderForm.search_text.split(" ").length > 1 &&
          !tenderForm.search_by_split_word
        ) {
          // console.log(page);
          setPage(1);
          setIsSplitWord(true);
          setTenderResultData([...tenderResultData, ...res.Data]);
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
          setTenderResultData([...tenderResultData, ...res.Data]);
          return;
        }
      }
      //use return for fetchResult function  for page wise data
      // ;

      return res.Data;
    } else {
      setLoader(false);
      // setIsError(true);
      return [];
    }
  };

  React.useEffect(() => {
    if (isSearchBy) {
      setTenderForm((prev) => ({ ...prev, search_by: 2, page_no: 1 }));
    }
  }, [isSearchBy]);

  React.useEffect(() => {
    setPage(1);
    fetchFreshResult();
    if (!tenderForm.search_by_split_word) {
      !isSearchBy && !isSplitWord && getCount();
      !isSearchBy && !isSplitWord && setLoader(true);
    } else {
      setTenderResultHasMore(true);
    }
  }, [tenderForm]);

  const openParticipatedBidder = (e, tender_result) => {
    setModelOpen(true);
    setModalStage(tender_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({ result_id: tender_result.result_id })
      .then((res) => {
        if (res.Success) {
          setModelData(
            res.Data.map((obj) => {
              return { ...obj, result_id: tender_result.result_id };
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
      // tender_status: 0,
      tab_id: 0,
      publication_date_from: selectedFromDate,
      publication_date_to: selectedToDate,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });

    if (res.Success && res.TotalRecord > 0) {
      setSecondTabCount(res.Data);
    }
  };

  return (
    <div className="FreshResult">
      {isError === true ? (
        <h3>No Result Found as per your Filter Criteria.</h3>
      ) : loader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={tenderResultData.length}
          hasMore={tenderResultHasMore}
          next={fetchFreshResult}
          loader={
            // <LinerLoader />
            tenderResultData.length > 19 && (
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
          scrollableTarget="scroll"
        >
          <TenderArea
            tenderResultData={tenderResultData}
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

export default TenderResults;
