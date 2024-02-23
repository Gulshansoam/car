import React, { useEffect, useState } from "react";
import { compititorServices } from "../../../_services/compititorService";
import { FormControlLabel } from "@material-ui/core";
import { Skeleton, Switch, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import TableSortLabel from "@mui/material/TableSortLabel";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing, setBidderName } from "../../../redux/slice";
import { Modal } from "antd";
import FullscreenImg from "../../../assets/images/fullscreen.png";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const ShortlistCompetitorsList = ({
  shortlistedCompititor,
  setShortlistedCompititor,
  setValue,
  setShortShowSnackBar,
  shortListloader,
  setShortListLoader,
  checkMainData,
  setCheckMainData,
  setIsDelete,
  fromDashboard,
  dataTableState,
  handleTableChange,
}) => {
  const classes = useStyles();
  const sessionData = sessionStorage.getItem("bidModel");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
  const [activeSorting, setActiveSorting] = useState({
    column: "bidder_name",
    direction: "asc",
  });

  const [tenderForm, setTenderForm] = useState({
    ...shortlistCompetitorListing,
  });
  const [shortListCount, setShortListCount] = useState("");

  const [updateNotification, setUpdateNotification] = useState({
    watchlist_id: 0,
    notification_type: 0,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  //*********************useEffects******************************* */

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

  useEffect(() => {
    getShortListCompititor();
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    setIsDelete(false);
    if (checkMainData === true) {
      getShortListCompititor();
      setCheckMainData(false);
    }
  }, [checkMainData]);

  const getShortListCompititor = () => {
    setShortListLoader(true);
    compititorServices
      .getShortlistCompetitorsUpdate({
        from_date: selectedFromDate,
        to_date: selectedToDate,
      })
      .then((res) => {
        if (res.Success) {
          setShortListLoader(false);

          // setCheckMainData(false);
          setShortlistedCompititor(
            res.Data.map((res) => ({ ...res, is_check: true }))
          );
          setShortListCount(res.Data.length);
        } else {
          setShortListLoader(true);
          setShortlistedCompititor([]);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
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
        shortlistedCompititor[index].awarded_count = 0;
        setShortlistedCompititor([...shortlistedCompititor]);
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
        shortlistedCompititor[index].lost_count = 0;
        setShortlistedCompititor([...shortlistedCompititor]);
        lostNotification(0);
        handleLostTenders(e, res);
        break;
      case "rtba":
        getUpdateNotification(res, "rtb_count");
        shortlistedCompititor[index].rta_count = 0;
        setShortlistedCompititor([...shortlistedCompititor]);
        rtaNotification(0);
        handleResultTBA(e, res);
        break;
      default:
        break;
    }
  };

  //************************************************************************************** */

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

  //*****************************sorting************************************* */
  const handleSort = (column) => {
    const element = document.getElementById("scrollShortList");
    element.scrollTop = 0;
    const isAscending =
      activeSorting.column === column && activeSorting.direction === "desc";
    const direction = isAscending ? "asc" : "desc";
    const sortedData = [...shortlistedCompititor].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      } else {
        return isAscending ? 1 : -1;
      }
    });
    setShortlistedCompititor(sortedData);
    setActiveSorting({ column, direction });
  };

  //***********************delete-query***************************** */
  const handleDelete = (e, competitorData) => {
    const data = shortlistedCompititor.map((res) => {
      if (competitorData.bidder_name === res.bidder_name) {
        return { ...res, is_check: false };
      } else {
        return res;
      }
    });
    setShortlistedCompititor(data);
    compititorServices
      .deleteData({
        bidder_id: 0,
        bidder_name: competitorData?.bidder_name,
      })
      .then((res) => {
        if (res.Success) {
          setIsDelete(true);
          setShortListCount(shortListCount - 1);
          // setShortShowSnackBar(true);
          // setTimeout(() => {
          //   setShortShowSnackBar(false);
          // }, 3000);
        } else {
          setValue([]);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  return (
    <>
      {!dataTableState.checked && (
        <div className={fromDashboard ? "col-6" : "col-7"}>
          <div className="filter-area shortlist-competitors-list">
            <div className="top-competitors-area">
              <h2>
                Shortlisted Competitors{" "}
                {shortListCount > 0 && `(${shortListCount})`}
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
                        ? "Shortlisted Competitors"
                        : "Top Competitors"
                    }
                  />
                </div>
              )}
            </div>
            <div className="top-competitors" id="scrollShortList">
              {shortListloader === true ? (
                <>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </>
              ) : (
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
                      {shortlistedCompititor.length > 0 ? (
                        shortlistedCompititor.map((res, index) => {
                          const truncatedName =
                            res?.bidder_name.length > 30
                              ? `${res?.bidder_name.slice(0, 30)}...`
                              : res?.bidder_name;
                          const shortlistName =
                            res?.bidder_name.length > 10
                              ? `${res?.bidder_name.slice(0, 10)}...`
                              : res?.bidder_name;
                          return (
                            res.is_check && (
                              <StyledTableRow key={index}>
                                <StyledTableCell
                                  className="shortlist-name"
                                  component="th"
                                  scope="row"
                                >
                                  <span
                                    onClick={(e) =>
                                      handleClickEvent(
                                        e,
                                        "companyprofile",
                                        res,
                                        index
                                      )
                                    }
                                  >
                                    <Tooltip title={res?.bidder_name}>
                                      <span>
                                        {fromDashboard
                                          ? shortlistName
                                          : truncatedName}
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
                                  {res?.participated_tenders === 0 ? (
                                    0
                                  ) : (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) =>
                                        handleClickEvent(
                                          e,
                                          "participated",
                                          res,
                                          index
                                        )
                                      }
                                    >
                                      {res?.participated_tenders}
                                    </span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell
                                  className="shortlist-awarded-tender"
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
                                        handleClickEvent(
                                          e,
                                          "awardvalue",
                                          res,
                                          index
                                        )
                                      }
                                    >
                                      {res?.awarded_tender}
                                      {awardedNotification(res.awarded_count)}
                                    </span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell
                                  className="shortlist-lost-tender"
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
                                        handleClickEvent(
                                          e,
                                          "losttender",
                                          res,
                                          index
                                        )
                                      }
                                    >
                                      {res?.lost_tender}

                                      {lostNotification(res.lost_count)}
                                    </span>
                                  )}
                                </StyledTableCell>
                                <StyledTableCell
                                  className="shortlist-result-to-be-announced"
                                  style={{ textAlign: "center" }}
                                  component="th"
                                  scope="row"
                                >
                                  {res?.result_to_be_announced === 0 ? (
                                    0
                                  ) : (
                                    <span
                                      onClick={(e) =>
                                        handleClickEvent(e, "rtba", res, index)
                                      }
                                    >
                                      {res?.result_to_be_announced}
                                      {rtaNotification(res?.rta_count)}
                                    </span>
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
                            )
                          );
                        })
                      ) : (
                        <h3 className="data-not-found">
                          Select Company from General Competitors
                        </h3>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
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
      )}
      <Modal
        open={open}
        onCancel={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth "
      >
        {/* <div className="filter-area shortlist-competitors-list"> */}
        <div className="top-competitors-area">
          <h2>
            Shortlisted Competitors{" "}
            {shortListCount > 0 && `(${shortListCount})`}
          </h2>
        </div>
        <div className="top-competitors" id="scrollShortList">
          {shortListloader === true ? (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          ) : (
            <div className="popup-fullheight">
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
                    {shortlistedCompititor.length > 0 ? (
                      shortlistedCompititor.map((res, index) => {
                        const truncatedName =
                          res?.bidder_name.length > 30
                            ? `${res?.bidder_name.slice(0, 30)}...`
                            : res?.bidder_name;
                        const shortlistName =
                          res?.bidder_name.length > 10
                            ? `${res?.bidder_name.slice(0, 10)}...`
                            : res?.bidder_name;
                        return (
                          res.is_check && (
                            <StyledTableRow key={index}>
                              <StyledTableCell
                                className="shortlist-name"
                                component="th"
                                scope="row"
                              >
                                <span
                                  onClick={(e) =>
                                    handleClickEvent(
                                      e,
                                      "companyprofile",
                                      res,
                                      index
                                    )
                                  }
                                >
                                  <Tooltip title={res?.bidder_name}>
                                    <span>
                                      {fromDashboard
                                        ? shortlistName
                                        : truncatedName}
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
                                {res?.participated_tenders === 0 ? (
                                  0
                                ) : (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) =>
                                      handleClickEvent(
                                        e,
                                        "participated",
                                        res,
                                        index
                                      )
                                    }
                                  >
                                    {res?.participated_tenders}
                                  </span>
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                className="shortlist-awarded-tender"
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
                                      handleClickEvent(
                                        e,
                                        "awardvalue",
                                        res,
                                        index
                                      )
                                    }
                                  >
                                    {res?.awarded_tender}
                                    {awardedNotification(res.awarded_count)}
                                  </span>
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                className="shortlist-lost-tender"
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
                                      handleClickEvent(
                                        e,
                                        "losttender",
                                        res,
                                        index
                                      )
                                    }
                                  >
                                    {res?.lost_tender}

                                    {lostNotification(res.lost_count)}
                                  </span>
                                )}
                              </StyledTableCell>
                              <StyledTableCell
                                className="shortlist-result-to-be-announced"
                                style={{ textAlign: "center" }}
                                component="th"
                                scope="row"
                              >
                                {res?.result_to_be_announced === 0 ? (
                                  0
                                ) : (
                                  <span
                                    onClick={(e) =>
                                      handleClickEvent(e, "rtba", res, index)
                                    }
                                  >
                                    {res?.result_to_be_announced}
                                    {rtaNotification(res?.rta_count)}
                                  </span>
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
                          )
                        );
                      })
                    ) : (
                      <h3 className="data-not-found">
                        Select Company from General Competitors
                      </h3>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
};

export default ShortlistCompetitorsList;
