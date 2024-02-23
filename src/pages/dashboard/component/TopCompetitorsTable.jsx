import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FullscreenImg from "../../../assets/images/fullscreen.png";

import Button from "@mui/material/Button";
import { Modal } from "antd";

import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useState } from "react";
import { useEffect } from "react";
import { dashboardService } from "../../../_services/dashboardService";
import { valueConvert } from "../../../_helpers/valueConvert";
// import LinerLoader from "../../../components/loading-screen/LinerLoader";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { FormControlLabel, Skeleton, Switch, Tooltip } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { setBidderName } from "../../../redux/slice";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import { compititorServices } from "../../../_services/compititorService";
import { TableRowsLoader } from "../../../components/table-loader/TableLoader";
import { truncateName } from "../../../_helpers/truncateName";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const TopCompetitorsTable = ({
  bidderSearch,
  fromDashboard,
  dataTableState,
  handleTableChange,
  competitorForm,
  tenderForm,
  setTenderForm,
}) => {
  const theme = useTheme();
  const topCompetitorsTableListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  // const [tenderForm, setTenderForm] = useState({
  //   ...topCompetitorsTableListing,
  // });
  const dispatch = useDispatch();
  const sessionData = sessionStorage.getItem("bidModel");
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);

  const [activeSorting, setActiveSorting] = useState({
    column: "bidder_name",
    direction: "asc",
  });
  const [competitorList, setCompetitorList] = useState([]);
  const [competitorCount, setCompetitorCount] = useState("");
  const [loader, setLoader] = useState(false);
  const classes = useStyles();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.darker,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      id: "award_result_value",
      numeric: false,
      disablePadding: true,
      label: "Awarded Value",
    },
  ];

  // useEffect(() => {
  //   if (isDateSelected) {
  //     setTenderForm((prev) => ({
  //       ...prev,
  //       publication_date_from: selectedFromDate,
  //       publication_date_to: selectedToDate,
  //     }));
  //     setIsDateSelected(false);
  //   } else {
  //     setTenderForm((prev) => ({
  //       ...prev,
  //       publication_date_from: selectedFromDate,
  //       publication_date_to: selectedToDate,
  //     }));
  //   }
  // }, [selectedFromDate, selectedToDate]);

  const getTopCompititor = (name) => {
    setLoader(true);
    if (fromDashboard) {
      dashboardService
        .getTopCompetitorsList({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: name,
        })
        .then((res) => {
          if (res.Success === true) {
            setCompetitorList(res.Data);
            setLoader(false);
          } else {
            setLoader(true);
            setCompetitorList([]);
          }
        })
        .catch((err) => {
          setLoader(true);
          console.log("Top Competitors Error" + err);
        });
    } else {
      compititorServices
        .getTopCompetitorslist({
          ...competitorForm,
          from_date: selectedFromDate,
          to_date: selectedToDate,
        })
        .then((res) => {
          if (res.Success === true) {
            setLoader(false);
            setCompetitorList(res.Data);
            setCompetitorCount(res.TotalRecord);
          } else {
            setLoader(true);
            setCompetitorList([]);
          }
        })
        .catch((err) => {
          setCompetitorLoader(true);
          console.log("Compititors List Error" + err);
        });
    }
  };

  useEffect(() => {
    if (bidderSearch !== undefined && bidderSearch.length > 0) {
      getTopCompititor(bidderSearch);
    } else {
      getTopCompititor(localStorage.getItem("user_name"));
    }
  }, [selectedFromDate, selectedToDate, competitorForm]);

  const redirectToCompanyProfile = (e, bidder_name) => {
    dispatch(setBidderName(bidder_name));
    window.open(
      `/dashboard/company-profile?datefrom=${selectedFromDate}&dateto=${selectedToDate}`
    );
  };

  const handleMyParticipated = (e, competitor) => {
    if (
      topCompetitorsTableListing.bidder_name !== null &&
      topCompetitorsTableListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing(
          fromDashboard
            ? {
                ...topCompetitorsTableListing,
                participant_name:
                  bidderSearch === undefined ||
                  bidderSearch === "" ||
                  bidderSearch.length < 0
                    ? localStorage.getItem("user_name")
                    : bidderSearch,
                tender_status: 7,
                bidder_name: competitor.bidder_name,
              }
            : {
                ...tenderForm,
                participant_name:
                  bidderSearch === undefined ||
                  bidderSearch === "" ||
                  bidderSearch.length < 0
                    ? localStorage.getItem("user_name")
                    : bidderSearch,
                tender_status: 7,
                bidder_name: competitor.bidder_name,
              }
        )
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${selectedFromDate}&dateto=${selectedToDate}`
      );
    }
  };

  const handleAwardedTenders = (e, competitor) => {
    if (
      topCompetitorsTableListing.bidder_name !== null &&
      topCompetitorsTableListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing(
          fromDashboard
            ? {
                ...topCompetitorsTableListing,
                participant_name:
                  bidderSearch === undefined ||
                  bidderSearch === "" ||
                  bidderSearch.length < 0
                    ? localStorage.getItem("user_name")
                    : bidderSearch,
                tender_status: 6,
                bidder_name: competitor.bidder_name,
              }
            : {
                ...tenderForm,
                participant_name:
                  bidderSearch === undefined ||
                  bidderSearch === "" ||
                  bidderSearch.length < 0
                    ? localStorage.getItem("user_name")
                    : bidderSearch,
                tender_status: 6,
                bidder_name: competitor.bidder_name,
              }
        )
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${selectedFromDate}&dateto=${selectedToDate}`
      );
    }
  };

  const handleSort = (column) => {
    const isAscending =
      activeSorting.column === column && activeSorting.direction === "desc";
    const direction = isAscending ? "asc" : "desc";
    const sortedData = [...competitorList].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      } else {
        return isAscending ? 1 : -1;
      }
    });
    setCompetitorList(sortedData);
    setActiveSorting({ column, direction });
  };

  const handleClickEvent = (e, key, bidder_name) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleAwardedTenders(e, bidder_name);
        break;
      case "companyprofile":
        redirectToCompanyProfile(e, bidder_name);
        break;
      case "participated":
        handleMyParticipated(e, bidder_name);
        break;
      default:
        break;
    }
  };

  const headingCount = (value, name) => {
    if (value > 0 && name.length > 0) {
      return `(${value}) Of ${name}`;
    }
  };

  return (
    <>
      {fromDashboard === true ? (
        dataTableState.checked && (
          <div className="col-6">
            <div className="topcompetitorstable">
              <div className="bidder-participated-tenders">
                <div className="top-competitors-area">
                  <h2>
                    Top Competitors{" "}
                    {competitorCount == 0 ? "" : `(${competitorCount})`}
                  </h2>
                  {fromDashboard && (
                    <div className="top-competitors-chart-on-off">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={dataTableState.checked}
                            onChange={handleTableChange}
                            value="checked"
                            color="primary"
                          />
                        }
                        labelPlacement="start"
                        label={
                          dataTableState.checked
                            ? "Shortlist Competitors"
                            : "Top Competitors"
                        }
                      />
                    </div>
                  )}
                </div>

                <div id="scrollTopCompetitor">
                  <TableContainer
                    component={Paper}
                    className="top-competitors-header-area"
                  >
                    <Table aria-label="customized table">
                      <TableHead className="publish-tender-in-state-area">
                        <TableRow>
                          <StyledTableCell style={{ cursor: "text" }}>
                            Name
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ textAlign: "center", cursor: "text" }}
                          >
                            Participated Tender
                          </StyledTableCell>
                          <StyledTableCell
                            style={{ textAlign: "center", cursor: "text" }}
                          >
                            Awarded Value
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loader ? (
                          <TableRowsLoader rowsNum={3} colunmNum={3} />
                        ) : competitorList.length > 0 ? (
                          competitorList.map((competitor, key) => {
                            return (
                              <StyledTableRow key={key}>
                                <StyledTableCell component="th" scope="row">
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) =>
                                      handleClickEvent(
                                        e,
                                        "companyprofile",
                                        competitor?.bidder_name
                                      )
                                    }
                                  >
                                    <Tooltip title={competitor?.bidder_name}>
                                      <span>
                                        {truncateName(competitor?.bidder_name)}
                                      </span>
                                    </Tooltip>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  style={{ textAlign: "center" }}
                                >
                                  {competitor?.participated_tenders === 0 ? (
                                    0
                                  ) : (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        handleClickEvent(
                                          e,
                                          "participated",
                                          competitor
                                        )
                                      }
                                    >
                                      {competitor?.participated_tenders}
                                    </div>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell
                                  component="th"
                                  scope="row"
                                  style={{ textAlign: "center" }}
                                >
                                  {competitor?.award_result_value === 0 ? (
                                    0
                                  ) : (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        handleClickEvent(
                                          e,
                                          "awardvalue",
                                          competitor
                                        )
                                      }
                                    >
                                      ₹{" "}
                                      {valueConvert(
                                        competitor?.award_result_value
                                      )}
                                    </div>
                                  )}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        ) : (
                          !loader && (
                            <h3 className="data-not-found">No Data Found</h3>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div class="fullscreen-area-new">
                  <button
                    style={{
                      width: "100%",
                    }}
                    onClick={handleClickOpen}
                  >
                    <img title="Fullscreen" src={FullscreenImg}></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          {dataTableState.checked && (
            <div className="col-5">
              <div className="topcompetitorstableFirst">
                <div className="bidder-participated-tenders">
                  <div className="top-competitors-area">
                    <h2>
                      Competitors{" "}
                      {headingCount(
                        competitorCount,
                        competitorForm.bidder_name
                      )}
                    </h2>
                    {fromDashboard && (
                      <div className="top-competitors-chart-on-off">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={dataTableState.checked}
                              onChange={handleTableChange}
                              value="checked"
                              color="primary"
                            />
                          }
                          labelPlacement="start"
                          label={
                            dataTableState.checked
                              ? "Top Competitors"
                              : "Shortlisted Competitors"
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="top-competitors company-competitors"
                    id="scrollShortList"
                  >
                    <TableContainer
                      classes={{ root: classes.customTableContainer }}
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
                                  padding={
                                    headCell.disablePadding ? "none" : "normal"
                                  }
                                  sortDirection={
                                    activeSorting.column === headCell.id
                                      ? activeSorting.direction
                                      : false
                                  }
                                >
                                  <TableSortLabel
                                    active={
                                      activeSorting.column === headCell.id
                                    }
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
                                </StyledTableCell>
                              );
                            })}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {loader === true ? (
                            <TableRowsLoader rowsNum={5} colunmNum={3} />
                          ) : competitorList.length > 0 &&
                            competitorCount > "0" ? (
                            competitorList.map((competitor, key) => {
                              return (
                                <StyledTableRow key={key}>
                                  <StyledTableCell component="th" scope="row">
                                    <div
                                      onClick={(e) =>
                                        handleClickEvent(
                                          e,
                                          "companyprofile",
                                          competitor?.bidder_name
                                        )
                                      }
                                    >
                                      <Tooltip title={competitor?.bidder_name}>
                                        <span>
                                          {truncateName(
                                            competitor?.bidder_name
                                          )}
                                        </span>
                                      </Tooltip>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    style={{ textAlign: "center" }}
                                  >
                                    {competitor?.participated_tenders === 0 ? (
                                      0
                                    ) : (
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                          handleClickEvent(
                                            e,
                                            "participated",
                                            competitor
                                          )
                                        }
                                      >
                                        {competitor?.participated_tenders}
                                      </div>
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                    style={{ textAlign: "center" }}
                                  >
                                    {competitor?.award_result_value === 0 ? (
                                      0
                                    ) : (
                                      <span
                                        onClick={(e) =>
                                          handleClickEvent(
                                            e,
                                            "awardvalue",
                                            competitor
                                          )
                                        }
                                      >
                                        {" "}
                                        ₹{" "}
                                        {valueConvert(
                                          competitor?.award_result_value
                                        )}
                                      </span>
                                    )}
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
                  </div>
                  <div class="fullscreen-area-new">
                    <button
                      style={{
                        width: "100%",
                      }}
                      onClick={handleClickOpen}
                    >
                      <img title="Fullscreen" src={FullscreenImg}></img>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        open={open}
        onCancel={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth"
      >
        <div id="scrollTopCompetitor">
          <h2>
            Top Competitors {competitorCount == 0 ? "" : `(${competitorCount})`}
          </h2>
          <div className="popup-fullheight">
            <TableContainer
              component={Paper}
              classes={{ root: classes.customTableContainer }}
            >
              <Table aria-label="customized table">
                <TableHead className="publish-tender-in-state-area">
                  <TableRow>
                    <StyledTableCell style={{ cursor: "text" }}>
                      Name
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center", cursor: "text" }}
                    >
                      Participated Tender
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ textAlign: "center", cursor: "text" }}
                    >
                      Awarded Value
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loader ? (
                    <TableRowsLoader rowsNum={3} colunmNum={3} />
                  ) : competitorList.length > 0 ? (
                    competitorList.map((competitor, key) => {
                      return (
                        <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={(e) =>
                                handleClickEvent(
                                  e,
                                  "companyprofile",
                                  competitor?.bidder_name
                                )
                              }
                            >
                              <Tooltip title={competitor?.bidder_name}>
                                <span>
                                  {truncateName(competitor?.bidder_name)}
                                </span>
                              </Tooltip>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "center" }}
                          >
                            {competitor?.participated_tenders === 0 ? (
                              0
                            ) : (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleClickEvent(
                                    e,
                                    "participated",
                                    competitor
                                  )
                                }
                              >
                                {competitor?.participated_tenders}
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "center" }}
                          >
                            {competitor?.award_result_value === 0 ? (
                              0
                            ) : (
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleClickEvent(e, "awardvalue", competitor)
                                }
                              >
                                ₹ {valueConvert(competitor?.award_result_value)}
                              </div>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  ) : (
                    !loader && <h3 className="data-not-found">No Data Found</h3>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TopCompetitorsTable;
