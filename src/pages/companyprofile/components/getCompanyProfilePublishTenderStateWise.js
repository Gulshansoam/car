import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useState } from "react";
import { useEffect } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { valueConvert } from "../../../_helpers/valueConvert";
import { makeStyles } from "@mui/styles";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import { TableRowsLoader } from "../../../components/table-loader/TableLoader";
import FullscreenImg from "../../../assets/images/fullscreen.png";
import { Modal } from "antd";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const GetCompanyProfilePublishTenderStateWise = ({
  handleState,
  profileBidderName,
  isParticipated,
}) => {
  const dispatch = useDispatch();
  const sessionData = sessionStorage.getItem("bidModel");
  const stateWiseListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const classes = useStyles();
  const [tenderForm, setTenderForm] = useState({
    ...stateWiseListing,
  });
  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState([
    {
      state_name: "",
      published: 0,
      participate: 0,
      tender_won: 0,
    },
  ]);
  const [activeSorting, setActiveSorting] = useState({
    column: "participate",
    direction: "desc",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //***************************************************************************** */
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
      id: "state_name",
      numeric: false,
      disablePadding: true,
      label: "State Name",
    },
    {
      id: "published",
      numeric: false,
      disablePadding: true,
      label: "Published Tender",
    },
    {
      id: "participate",
      numeric: false,
      disablePadding: true,
      label: "Participated Tender",
    },
    {
      id: "tender_won",
      numeric: false,
      disablePadding: true,
      label: "Awarded tender",
    },
  ];
  //***************************************************************************** */

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0
    ) {
      if (isParticipated) {
        setLoader(true);
        tenderResultService
          .getCompanyProfilePublishTenderStateWise({
            from_date: selectedFromDate,
            to_date: selectedToDate,
            bidder_name: profileBidderName,
          })
          .then((res) => {
            if (res.Success) {
              setLoader(false);
              setValue(res.Data.sort((a, b) => b.participate - a.participate));
            } else {
              setLoader(true);
              setValue([]);
            }
          })
          .catch((err) => {
            setLoader(true);
            console.log("Dashboard tender State vise" + err);
          });
      } else setValue([]);
    }
  }, [isParticipated, selectedFromDate, selectedToDate]);

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

  const handleMyParticipated = (competitor) => {
    if (
      stateWiseListing.bidder_name !== null &&
      stateWiseListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: profileBidderName,
          tender_status: 7,
          state_ids: [competitor],
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleWonTenders = (competitor) => {
    if (
      stateWiseListing.bidder_name !== null &&
      stateWiseListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: profileBidderName,
          tender_status: 6,
          state_ids: [competitor],
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleSort = (column) => {
    const element = document.getElementById("scroll");
    element.scrollTop = 0;
    const isAscending =
      activeSorting.column === column && activeSorting.direction === "desc";
    const direction = isAscending ? "asc" : "desc";
    const sortedData = [...value].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      } else {
        return isAscending ? 1 : -1;
      }
    });
    setValue(sortedData);
    setActiveSorting({ column, direction });
  };

  const handleClickEvent = (e, competitor, key) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleWonTenders(competitor);
        break;
      case "participated":
        handleMyParticipated(competitor);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="company-india-map" id="scroll">
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
                      padding={headCell.disablePadding ? "none" : "normal"}
                      sortDirection={
                        activeSorting.column === headCell.id
                          ? activeSorting.direction
                          : false
                      }
                    >
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
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <TableRowsLoader rowsNum={7} colunmNum={4} />
              ) : value.length > 0 ? (
                value.map((competitor, key) => {
                  return (
                    <>
                      <StyledTableRow key={key}>
                        <StyledTableCell
                          component="th"
                          style={{ cursor: "pointer" }}
                          scope="row"
                        >
                          <span onClick={(e) => handleState(e, competitor)}>
                            {competitor?.state_name}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "center" }}
                        >
                          {competitor?.published == 0 ? (
                            <></>
                          ) : (
                            <span>{competitor?.published}</span>
                          )}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "center" }}
                        >
                          {competitor?.participate === 0 ? (
                            <>{valueConvert(competitor?.tender_won)}</>
                          ) : (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={(e) =>
                                handleClickEvent(e, competitor, "participated")
                              }
                            >
                              {valueConvert(competitor?.participate)}
                            </span>
                          )}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "center" }}
                        >
                          {competitor?.tender_won == 0 ? (
                            <>{valueConvert(competitor?.tender_won)}</>
                          ) : (
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={(e) =>
                                handleClickEvent(e, competitor, "awardvalue")
                              }
                            >
                              {valueConvert(competitor?.tender_won)}
                            </span>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })
              ) : (
                <h3 className="data-not-found">No Data Found</h3>
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

      <Modal
        open={open}
        onCancel={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <h2>State wise Result</h2>
        <div className="company-india-map" id="scroll">
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
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={
                          activeSorting.column === headCell.id
                            ? activeSorting.direction
                            : false
                        }
                      >
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
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {loader ? (
                  <TableRowsLoader rowsNum={7} colunmNum={4} />
                ) : value.length > 0 ? (
                  value.map((competitor, key) => {
                    return (
                      <>
                        <StyledTableRow key={key}>
                          <StyledTableCell
                            component="th"
                            style={{ cursor: "pointer" }}
                            scope="row"
                          >
                            <span onClick={(e) => handleState(e, competitor)}>
                              {competitor?.state_name}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "center" }}
                          >
                            {competitor?.published == 0 ? (
                              <></>
                            ) : (
                              <span>{competitor?.published}</span>
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "center" }}
                          >
                            {competitor?.participate === 0 ? (
                              <>{valueConvert(competitor?.tender_won)}</>
                            ) : (
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleClickEvent(
                                    e,
                                    competitor,
                                    "participated"
                                  )
                                }
                              >
                                {valueConvert(competitor?.participate)}
                              </span>
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ textAlign: "center" }}
                          >
                            {competitor?.tender_won == 0 ? (
                              <>{valueConvert(competitor?.tender_won)}</>
                            ) : (
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleClickEvent(e, competitor, "awardvalue")
                                }
                              >
                                {valueConvert(competitor?.tender_won)}
                              </span>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })
                ) : (
                  <h3 className="data-not-found">No Data Found</h3>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </>
  );
};

export default GetCompanyProfilePublishTenderStateWise;
