import * as React from "react";

import "../../../assets/style/BS5_Grid.css";
import "../../../assets/style/style.css";

import { tenderResultService } from "../../../_services/tenderResultPageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import BidderListModal from "../../../components/modal/BidderListModal";

import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import TenderArea from "../../../components/tender-area/TenderArea";
import { Skeleton } from "@mui/material";
import Loader from "../../../components/loading-screen/Loader";

const MyResult = ({
  tenderForm,
  setDataFound,
  setThirdTabCount,
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
  const [myResultData, setMyResultData] = React.useState([]);
  const [myResultHashMore, setMyResultHasMore] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");

  //---main function for data showing in fresh result tab listing.......
  const fetchFreshResult = async () => {
    //--->getfreshResult always call using async and await
    const nextFreshResult = await getfreshResult();
    //--->condition for hasmore data in Infinite Scroll
    if (nextFreshResult !== undefined && !isError) {
      nextFreshResult.length === 0 && myResultData.length === 0
        ? setIsError(true)
        : nextFreshResult.length === 0 && myResultData.length > 0
        ? setMyResultHasMore(false)
        : setMyResultHasMore(true);
      //---->setting prev page data and next page data i.e, pagewise
      setMyResultData([...myResultData, ...nextFreshResult]);
    }
  };
  // Api call for tender result-------------------------------------//>
  const getfreshResult = async () => {
    //set tabid when data is render according tab_id, participant_name and stage in future............
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      page_no: page,
      tender_status: 5,
      tab_id: 0,
      bidder_name: localStorage.getItem("user_name"),
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });

    if (res.Success) {
      setLoader(false);
      setIsError(false);
      setPage((prev) => prev + 1);

      // res.TotalRecord < 20
      //   ? setMyResultHasMore(false)
      //   : setMyResultHasMore(true);

      //search by split word*********************//
      if (res.TotalRecord < 20) {
        if (
          tenderForm.search_text.split(" ").length > 1 &&
          !tenderForm.search_by_split_word
        ) {
          setMyResultData([...myResultData, ...res.Data]);
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
          setMyResultData([...myResultData, ...res.Data]);
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
    fetchFreshResult();
  }, [tenderForm]);

  React.useEffect(() => {
    if (isSearchBy) {
      setTenderForm((prev) => ({ ...prev, search_by: 2, page_no: 1 }));
    }
  }, [isSearchBy]);

  const openParticipatedBidder = (e, my_result) => {
    setModelOpen(true);
    setModalStage(my_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({ result_id: my_result.result_id })
      .then((res) => {
        if (res.Success) {
          setModelData(
            res.Data.map((obj) => {
              return { ...obj, result_id: my_result.result_id };
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
      tender_status: 5,
      tab_id: 0,
      bidder_name: localStorage.getItem("user_name"),
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });

    if (res.Success === true && res.TotalRecord > 0) setThirdTabCount(res.Data);
  };

  return (
    <div className="FreshResult">
      {isError === true ? (
        <h3>No Result Found as per your Filter Criteria.</h3>
      ) : loader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={myResultData.length}
          hasMore={myResultHashMore}
          next={fetchFreshResult}
          style={{ overflow: "unset" }}
          loader={
            // <LinerLoader />
            myResultData.length > 19 && (
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
            tenderResultData={myResultData}
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

export default MyResult;
