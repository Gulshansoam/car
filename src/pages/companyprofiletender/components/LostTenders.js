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

const LostResult = (props) => {
  const {
    tenderForm,
    setDataFound,
    setThirdTabCount,
    page,
    setPage,
    setTenderForm,
    isSplitWord,
    isSearchBy,
    setIsSearchBy,
    setIsSplitWord,
  } = props;
  // const { selectedFromDate, selectedToDate, isDateSelected } =
  //   useContext(selectedDateRange);
  const [lostResultData, setLostResultData] = React.useState([]);
  const [lostResultHashMore, setLostResultHasMore] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [modelData, setModelData] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalStage, setModalStage] = React.useState("");

  //---main function for data showing in fresh result tab listing.......
  const fetchLostResult = async () => {
    //--->getLostResult always call using async and await
    const nextLostResult = await getLostResult();
    //--->condition for hasmore data in Infinite Scroll
    if (nextLostResult !== undefined && !isError) {
      nextLostResult.length === 0 && lostResultData.length === 0
        ? setIsError(true)
        : nextLostResult.length === 0 && lostResultData.length > 0
        ? setLostResultHasMore(false)
        : setLostResultHasMore(true);
      //---->setting prev page data and next page data i.e, pagewise
      setLostResultData([...lostResultData, ...nextLostResult]);
    }
  };
  // Api call for tender result-------------------------------------//>
  const getLostResult = async () => {
    //set tabid when data is render according tab_id, participant_name and stage in future............
    const res = await tenderResultService.getTenderResult({
      ...tenderForm,
      page_no: page,
      tender_status: 1,
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
      //   ? setLostResultHasMore(false)
      //   : setLostResultHasMore(true);

      //search by split word*********************//
      if (res.TotalRecord < 20) {
        if (
          tenderForm.search_text !== undefined &&
          tenderForm.search_text !== null &&
          tenderForm.search_text.split(" ").length > 1 &&
          !tenderForm.search_by_split_word
        ) {
          setLostResultData([...lostResultData, ...res.Data]);
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
          setLostResultData([...lostResultData, ...res.Data]);
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

  const getCount = async () => {
    const res = await tenderResultService.getCountService({
      ...tenderForm,
      tender_status: 1,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    });

    if (res.Success === true && res.TotalRecord > 0) {
      setThirdTabCount(res.Data);
    }
  };

  React.useEffect(() => {
    setPage(1);
    !isSearchBy && !isSplitWord && getCount();
    !isSearchBy && !isSplitWord && setLoader(true);
    fetchLostResult();
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

  return (
    <div className="FreshResult">
      {isError === true ? (
        <h3> No Result Found as per your Filter Criteria.</h3>
      ) : loader ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={lostResultData.length}
          hasMore={lostResultHashMore}
          next={fetchLostResult}
          style={{ overflow: "unset" }}
          loader={
            // <LinerLoader />
            lostResultData.length > 19 && (
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
            tenderResultData={lostResultData}
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

export default LostResult;
