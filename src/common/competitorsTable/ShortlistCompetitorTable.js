import {
  FormControlLabel,
  Paper,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  tableCellClasses,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { compititorServices } from "../../_services/compititorService";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { useDispatch, useSelector } from "react-redux";
import { TableRowsLoader } from "../../components/table-loader/TableLoader";
import { truncateName } from "../../_helpers/truncateName";
import { setBidderName, setSelectedListing } from "../../redux/slice";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const ShortlistCompetitorTable = (props) => {
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

  const headCells = [
    {
      id: "bidder_name",
      numeric: false,
      disablePadding: true,
      label: `Company Name`,
    },
    {
      id: "participated_tenders",
      numeric: false,
      disablePadding: true,
      label: "Participated Tender",
    },
    {
      id: "awarded_tender",
      numeric: false,
      disablePadding: true,
      label: "Awarded Tender",
    },
    {
      id: "lost_tender",
      numeric: false,
      disablePadding: true,
      label: "Lost Tender",
    },
    {
      id: "result_to_be_announced",
      numeric: false,
      disablePadding: true,
      label: "Result TBA",
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "Delete",
    },
  ];

  const {
    isTableChange,
    isInsert,
    isShortListDelete,
    setIsShortListDelete,
    setIsInsert,
    setPageNo,
    fromdashboard,
    setBidderData,
  } = props;
  const classes = useStyles();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const sessionData = sessionStorage.getItem("bidModel");
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const shortlistCompetitorListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const dispatch = useDispatch();
  const [tenderForm, setTenderForm] = useState({
    ...shortlistCompetitorListing,
  });

  const [activeSorting, setActiveSorting] = useState({
    column: "bidder_name",
    direction: "asc",
  });
  const [updateNotification, setUpdateNotification] = useState({
    watchlist_id: 0,
    notification_type: 0,
  });
  const [shortlistData, setShortlistData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getshortListCompetitor = async () => {
    try {
      setLoader(true);
      let res = await compititorServices.getShortlistCompetitors({
        from_date: selectedFromDate,
        to_date: selectedToDate,
      });
      if (res?.Success && res?.TotalRecord > 0) {
        setShortlistData(res?.Data);

        setLoader(false);
      } else {
        setShortlistData([]);
        setLoader(false);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

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
    getshortListCompetitor();
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    if (isInsert) {
      getshortListCompetitor();
      setIsInsert(false);
    } else if (isShortListDelete) {
      getshortListCompetitor();
      setIsShortListDelete(false);
    }
  }, [isInsert, isShortListDelete]);

  const handleSort = (column) => {
    const element = document.getElementById("scrollShortList");
    element.scrollTop = 0;
    const isAscending =
      activeSorting.column === column && activeSorting.direction === "desc";
    const direction = isAscending ? "asc" : "desc";
    const sortedData = [...shortlistData].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      } else {
        return isAscending ? 1 : -1;
      }
    });
    setShortlistData(sortedData);
    setActiveSorting({ column, direction });
  };

  //***********************handleDelete*********************** */
  const handleDelete = async (e, competitorData) => {
    setPageNo(1);
    setBidderData([]);
    const data = shortlistData.map((res) => {
      if (competitorData.bidder_name === competitorData.bidder_name) {
        return { ...res, is_check: false };
      } else {
        return res;
      }
    });
    setShortlistData(data);
    let res = await compititorServices.deleteData({
      user_id: localStorage.getItem("user_id"),
      bidder_id: 0,
      bidder_name: competitorData.bidder_name,
    });
    if (res.Success && res.TotalRecord > 0) {
      setIsShortListDelete(true);
    }
  };

  //**************************Update-Notifications********************************** */
  const getUpdateNotification = async (value, key) => {
    if (value.awarded_tender > 0 && key === "awarded_count") {
      await compititorServices.getUpdateNotification({
        ...updateNotification,
        watchlist_id: value?.watchlist_id,
        notification_type: 3,
      });
    } else if (value.lost_tender > 0 && key === "lost_count") {
      await compititorServices.getUpdateNotification({
        ...updateNotification,
        watchlist_id: value?.watchlist_id,
        notification_type: 2,
      });
    } else if (value.result_to_be_announced > 0 && key === "rtb_count") {
      await compititorServices.getUpdateNotification({
        ...updateNotification,
        watchlist_id: value?.watchlist_id,
        notification_type: 1,
      });
    }
  };

  //***************************Notification displaying functions***************** */

  const awardedNotification = (awardedCount) => {
    if (awardedCount > 9) {
      return <span className="notificition-areaa">9+</span>;
    } else if (awardedCount > 0) {
      return <span className="notificition-areaa">{awardedCount}</span>;
    } else return "";
  };

  const lostNotification = (lostCount) => {
    if (lostCount > 9) {
      return <span className="notificition-areaa">9+</span>;
    } else if (lostCount > 0) {
      return <span className="notificition-areaa">{lostCount}</span>;
    } else return "";
  };

  const rtaNotification = (rtaCount) => {
    if (rtaCount > 9) {
      return <span className="notificition-areaa">9+</span>;
    } else if (rtaCount > 0) {
      return <span className="notificition-areaa">{rtaCount}</span>;
    } else return "";
  };

  //*********************************Redirect-Click-Events********************************************** */

  const handleMyParticipated = (e, competitor) => {
    if (
      shortlistCompetitorListing.bidder_name !== null &&
      shortlistCompetitorListing.tender_status !== null
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
      shortlistCompetitorListing.bidder_name !== null &&
      shortlistCompetitorListing.tender_status !== null
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
      shortlistCompetitorListing.bidder_name !== null &&
      shortlistCompetitorListing.ternder_status !== null
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
      shortlistCompetitorListing.bidder_name !== null &&
      shortlistCompetitorListing.tender_status !== null
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

  const handleClickEvent = (e, key, res, index) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        getUpdateNotification(res, "awarded_count");
        shortlistData[index].awarded_count = 0;
        setShortlistData([...shortlistData]);
        awardedNotification(0);
        handleAwardedTenders(e, res);

        break;
      case "companyprofile":
        redirectToCompanyProfile(e, res);
        break;
      case "participated":
        handleMyParticipated(e, res);
        break;
      case "losttender":
        getUpdateNotification(res, "lost_count");
        shortlistData[index].lost_count = 0;
        setShortlistData([...shortlistData]);
        lostNotification(0);
        handleLostTenders(e, res);
        break;
      case "rtba":
        getUpdateNotification(res, "rtb_count");
        shortlistData[index].rta_count = 0;
        setShortlistData([...shortlistData]);
        rtaNotification(0);
        handleResultTBA(e, res);
        break;
      default:
        break;
    }
  };

  //************************************************************************************** */

  return (
    <>
      <div className={"top-competitors"} id="scrollShortList">
        <TableContainer
          classes={!isTableChange && { root: classes.customTableContainer }}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead className="publish-tender-in-state-area">
              <TableRow>
                {headCells.map((headCell) => {
                  return (
                    <StyledTableCell
                      key={headCell.id}
                      style={{ textAlign: "center" }}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "normal"}
                      sortDirection={
                        activeSorting.column === headCell.id
                          ? activeSorting.direction
                          : false
                      }
                    >
                      {headCell.id === "" ? (
                        <>{headCell.label}</>
                      ) : (
                        <TableSortLabel
                          active={activeSorting.column === headCell.id}
                          direction={
                            activeSorting.column === headCell.id
                              ? activeSorting.direction
                              : "asc"
                          }
                          className={`${
                            activeSorting.column === headCell.id
                              ? "short_active"
                              : ""
                          }`}
                          onClick={() => handleSort(headCell.id)}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      )}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <TableRowsLoader rowsNum={4} colunmNum={6} />
              ) : shortlistData.length > 0 ? (
                shortlistData.map((res, index) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell
                        className="shortlist-name"
                        component="th"
                        scope="row"
                      >
                        <span
                          onClick={(e) =>
                            handleClickEvent(e, "companyprofile", res, index)
                          }
                        >
                          <Tooltip title={res?.bidder_name}>
                            <span>
                              {truncateName(res?.bidder_name)}
                              {/* {fromDashboard ? shortlistName : truncatedName} */}
                            </span>
                          </Tooltip>
                        </span>
                      </StyledTableCell>
                      <StyledTableCell
                        className="shortlist-participated-tender"
                        style={{ textAlign: "center" }}
                        component="th"
                        scope="row"
                      >
                        {res?.participated_tenders > 0 ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "participated", res, index)
                            }
                          >
                            {res?.participated_tenders}
                          </span>
                        ) : (
                          0
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        className="shortlist-awarded-tender"
                        style={{ textAlign: "center" }}
                        component="th"
                        scope="row"
                      >
                        {res?.awarded_tender > 0 ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "awardvalue", res, index)
                            }
                          >
                            {res?.awarded_tender}
                            {awardedNotification(res.awarded_count)}
                          </span>
                        ) : (
                          0
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        className="shortlist-lost-tender"
                        style={{ textAlign: "center" }}
                        component="th"
                        scope="row"
                      >
                        {res?.lost_tender > 0 ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "losttender", res, index)
                            }
                          >
                            {res?.lost_tender}
                            {lostNotification(res.lost_count)}
                          </span>
                        ) : (
                          0
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        className="shortlist-result-to-be-announced"
                        style={{ textAlign: "center" }}
                        component="th"
                        scope="row"
                      >
                        {res?.result_to_be_announced > 0 ? (
                          <span
                            onClick={(e) =>
                              handleClickEvent(e, "rtba", res, index)
                            }
                          >
                            {res?.result_to_be_announced}
                            {rtaNotification(res?.rta_count)}
                          </span>
                        ) : (
                          0
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        className="shortlist-delete"
                        style={{ textAlign: "center" }}
                        component="th"
                        scope="row"
                      >
                        <DeleteForeverIcon
                          className="short-list-delete-icon"
                          onClick={(e) => handleDelete(e, res)}
                          {...label}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                !loader && (
                  <h3 className="data-not-found">
                    Select Company from Bidders Table
                  </h3>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ShortlistCompetitorTable;
