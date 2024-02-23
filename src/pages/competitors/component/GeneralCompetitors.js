import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { compititorServices } from "../../../_services/compititorService";
import { Button, IconButton, Skeleton, Snackbar, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing, setBidderName } from "../../../redux/slice";
import { valueConvert } from "../../../_helpers/valueConvert";
import { truncateName } from "../../../_helpers/truncateName";
import { TableRowsLoader } from "../../../components/table-loader/TableLoader";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const sort = [
  {
    id: "bidder_name",
    key: 1,
    numeric: false,
    disablePadding: true,
    label: "#. Company Name",
    active: false,
    ascending: true,
  },
  {
    id: "participated_tenders",
    key: 2,
    numeric: false,
    disablePadding: true,
    active: true,
    label: "Participated Tender",
    ascending: false,
  },
  {
    id: "awarded_tender",
    numeric: false,
    key: 3,
    active: false,
    disablePadding: true,
    label: "Awarded Tender",
    ascending: true,
  },
  {
    id: "lost_tender",
    key: 4,
    numeric: false,
    active: false,
    disablePadding: true,
    label: "Lost Tender",
    ascending: true,
  },
  {
    id: "result_to_be_announced",
    numeric: false,
    key: 5,
    disablePadding: true,
    active: false,
    label: "Result TBA",
    ascending: true,
  },
  {
    id: "Shortlist_Competitor",
    numeric: false,
    key: 6,
    disablePadding: true,
    active: false,
    label: "Shortlist Competitor",
    ascending: true,
  },
];

const GeneralCompetitors = ({
  generalCompetitorList,
  showSnackBar,
  GeneralCompetitorLoader,
  setGeneralCompetitorList,
  setShowSnackBar,
  setGeneralCompetitorLoader,
  competitorForm,
  setCheckMainData,
  isDelete,
  setIsDelete,
  compititorReqBody,
  setCompititorReqBody,
  tenderForm,
  setTenderForm,
  generalCount,
  setGeneralCount,
}) => {
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const generalCompetitorListing = useSelector(
    (state) => state.listing_model.initialListing
  );

  const dispatch = useDispatch();
  const classes = useStyles();
  const sessionData = sessionStorage.getItem("bidModel");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [headCells, setHeadCells] = useState(sort);
  const [sorted, setSorted] = useState(false);
  const [loader, setLoader] = useState(true);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.darker,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
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

  const loadMoreData = () => {
    compititorServices
      .getGeneralCompetitorList({
        ...compititorReqBody,
        page_no: pageNo,
        from_date: selectedFromDate,
        to_date: selectedToDate,
      })
      .then((res) => {
        if (res.Success && res.Data.length > 0) {
          setGeneralCompetitorLoader(false);
          // setIsDelete(false);
          setGeneralCompetitorList((prev) => [...prev, ...res.Data]);
          setPageNo((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  const getGeneralCompetitorList = () => {
    setHasMore(true);
    setLoader(true);
    const element = document.getElementById("scroll");
    element.scrollTop = 0;
    setGeneralCompetitorLoader(true);
    compititorServices
      .getGeneralCompetitorList({
        ...compititorReqBody,
        from_date: selectedFromDate,
        to_date: selectedToDate,
        record_per_page: 20,
      })
      .then((res) => {
        if (res.Success && res.TotalRecord > 0) {
          setLoader(false);
          setGeneralCompetitorLoader(false);
          // setIsDelete(false);
          setGeneralCompetitorList(res.Data);
          setPageNo((prev) => prev + 1);
          res.TotalRecord < 20 && setHasMore(false);
        } else {
          setLoader(false);
          setGeneralCompetitorLoader(false);
          setGeneralCompetitorList([]);
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  const getGeneralListCount = async () => {
    setLoader(true);
    const res = await compititorServices.getGeneralCompetitorListCount({
      ...compititorReqBody,
      from_date: selectedFromDate,
      to_date: selectedToDate,
    });
    if (res.Success && res.TotalRecord > 0) {
      // setLoader(false);
      setGeneralCount(res.Data);
    } else {
      setGeneralCount({});
      // setLoader(true);
    }
  };

  useEffect(() => {
    if (isDelete === true) {
      setIsDelete(false);
      getGeneralListCount();
      getGeneralCompetitorList();
      setPageNo(1);
      setHeadCells(sort);
    }
  }, [isDelete]);

  useEffect(() => {
    // setLoader(true);
    setCheckMainData(false);
    setPageNo(1);
    setHeadCells(sort);
    getGeneralCompetitorList();
    getGeneralListCount();
  }, [selectedFromDate, selectedToDate, competitorForm]);

  useEffect(() => {
    if (sorted) {
      getGeneralListCount();
      getGeneralCompetitorList();
      setSorted(false);
    }
  }, [sorted]);

  const handleInsert = (e, competitorData) => {
    const data = generalCompetitorList.map((res) => {
      if (competitorData.bidder_name === res.bidder_name) {
        return { ...res, is_check: e.target.checked };
      } else {
        return res;
      }
    });
    setGeneralCompetitorList(data);
    compititorServices
      .insert({
        user_id: localStorage.getItem("user_id"),
        bidder_id: 0,
        bidder_name: competitorData.bidder_name,
      })
      .then((competitorData) => {
        if (competitorData.Success) {
          setCheckMainData(true);
          // setShowSnackBar(true);
          // setTimeout(() => {
          //   setShowSnackBar(false);
          // }, 2000);
        } else {
          setCheckMainData(false);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  const handleUnCheck = (e, competitorData) => {
    const data = generalCompetitorList.map((res) => {
      if (competitorData.bidder_name === res.bidder_name) {
        return { ...res, is_check: e.target.checked };
      } else {
        return res;
      }
    });

    setGeneralCompetitorList(data);
    compititorServices
      .deleteData({
        bidder_id: 0,
        bidder_name: competitorData.bidder_name,
      })
      .then((res) => {
        if (res.Success) {
          setCheckMainData(true);
        } else {
          setValue([]);
          setCheckMainData(false);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackBar(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}></Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        style={{ position: "top" }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleMyParticipated = (e, competitor) => {
    if (
      generalCompetitorListing.bidder_name !== null &&
      generalCompetitorListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: competitor.bidder_name,
          tender_status: 7,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleAwardedTenders = (e, competitor) => {
    if (
      generalCompetitorListing.bidder_name !== null &&
      generalCompetitorListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: competitor.bidder_name,
          tender_status: 6,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleLostTenders = (e, competitor) => {
    if (
      generalCompetitorListing.bidder_name !== null &&
      generalCompetitorListing.ternder_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: competitor.bidder_name,
          tender_status: 1,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleResultTBA = (e, competitor) => {
    if (
      generalCompetitorListing.bidder_name !== null &&
      generalCompetitorListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: competitor.bidder_name,
          tender_status: 2,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const redirectToCompanyProfile = (e, competitor) => {
    dispatch(setBidderName(competitor.bidder_name));
    window.open(
      `/dashboard/company-profile?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
    );
  };

  const handleShorting = (e, res) => {
    const element = document.getElementById("scroll");
    element.scrollTop = 0;
    const data = headCells.map((cell) => {
      if (cell.key === res.key) {
        return { ...cell, ascending: !cell.ascending, active: true };
      } else {
        return { ...cell, ascending: true, active: false };
      }
    });
    setHeadCells(data);
    setPageNo(1);
    setCompititorReqBody((prev) => ({
      ...prev,
      sort_by: res.key,
      sort_type: res.ascending ? 2 : 1,
      page_no: 1,
    }));
    setSorted(true);
  };

  const handleClickEvent = (e, key, res) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleAwardedTenders(e, res);
        break;
      case "companyprofile":
        redirectToCompanyProfile(e, res);
        break;
      case "participated":
        handleMyParticipated(e, res);
        break;
      case "losttender":
        handleLostTenders(e, res);
        break;
      case "rtba":
        handleResultTBA(e, res);
        break;
      default:
        break;
    }
  };

  return (
    <div className="col-12">
      <div className="filter-area">
        <h2>
          Bidders{" "}
          {valueConvert(generalCount.biddercount) == 0
            ? ""
            : `(${valueConvert(generalCount.biddercount)})`}
        </h2>
        {showSnackBar === true && (
          <Snackbar
            open={showSnackBar}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Record successfully updated."
            action={action}
          />
        )}
        <div>
          <InfiniteScroll
            dataLength={generalCompetitorList.length}
            hasMore={hasMore}
            next={loadMoreData}
            scrollableTarget="scroll"
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
          >
            <div className="top-competitors general-competitors" id="scroll">
              <TableContainer
                classes={{ root: classes.customTableContainer }}
                component={Paper}
              >
                <Table aria-label="customized table">
                  <TableHead className="publish-tender-in-state-area">
                    <TableRow>
                      {headCells.map((res) => {
                        return (
                          <StyledTableCell>
                            {res.key === 6 ? (
                              <>
                                <span>{res.label}</span>
                              </>
                            ) : (
                              <>
                                <span
                                  className={`${
                                    res.active ? "short_active" : ""
                                  }`}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => handleShorting(e, res)}
                                >
                                  {res.label}
                                </span>

                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={(e) => handleShorting(e, res)}
                                >
                                  {res.ascending ? (
                                    <ArrowUpwardIcon />
                                  ) : (
                                    <ArrowDownwardIcon />
                                  )}
                                </span>
                              </>
                            )}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loader ? (
                      <TableRowsLoader rowsNum={10} colunmNum={6} />
                    ) : generalCompetitorList.length > 0 ? (
                      generalCompetitorList.map((res, key) => {
                        return (
                          <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">
                              <span
                                onClick={(e) =>
                                  handleClickEvent(e, "companyprofile", res)
                                }
                              >
                                <Tooltip title={res?.bidder_name}>
                                  <span>{`${key + 1}) ${truncateName(
                                    res?.bidder_name
                                  )}`}</span>
                                </Tooltip>
                              </span>
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.participated_tenders === 0 ? (
                                0
                              ) : (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    handleClickEvent(e, "participated", res)
                                  }
                                >
                                  {res?.participated_tenders}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.awarded_tender === 0 ? (
                                0
                              ) : (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    handleClickEvent(e, "awardvalue", res)
                                  }
                                >
                                  {res?.awarded_tender}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.lost_tender === 0 ? (
                                0
                              ) : (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    handleClickEvent(e, "losttender", res)
                                  }
                                >
                                  {res?.lost_tender}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.result_to_be_announced === 0 ? (
                                0
                              ) : (
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    handleClickEvent(e, "rtba", res)
                                  }
                                >
                                  {res?.result_to_be_announced}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              <Checkbox
                                checked={res.is_check}
                                onClick={
                                  res.is_check === false
                                    ? (e) => handleInsert(e, res)
                                    : (e) => handleUnCheck(e, res)
                                }
                                {...label}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })
                    ) : (
                      <h3 className="data-not-found">
                        No Competitors Found For The Selected Date
                      </h3>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {hasMore && (
                <>
                  {" "}
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default GeneralCompetitors;
