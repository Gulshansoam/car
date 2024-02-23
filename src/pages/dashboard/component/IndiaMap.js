import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { dashboardService } from "../../../_services/dashboardService";
import { useState } from "react";
import { useEffect } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { valueConvert } from "../../../_helpers/valueConvert";
import LinerLoader from "../../../components/loading-screen/LinerLoader";
import { makeStyles } from "@mui/styles";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedListing,
  setResultListingModel,
} from "../../../redux/slice";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const MapChart = () => {
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
  const [value, setValue] = useState([
    {
      state_name: "",
      published: 0,
      participate: 0,
      tender_won: 0,
    },
  ]);
  const [activeSorting, setActiveSorting] = useState({
    column: "state_name",
    direction: "asc",
  });
  const [loader, setLoader] = useState(true);
  const [tenderForm, setTenderForm] = useState(stateWiseListing);
  useEffect(() => {
    setLoader(true);
    dashboardService
      .getPublishTenderStateVise({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name: localStorage.getItem("user_name"),
      })
      .then((res) => {
        if (res.Success) {
          setLoader(false);
          setValue(res.Data);
        } else {
          setLoader(true);
          setValue([]);
        }
      })
      .catch((err) => {
        setLoader(true);
        console.log("Dashboard tender State vise" + err);
      });
  }, [selectedFromDate, selectedToDate]);

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

  const handleState = (e, competitor) => {
    if (
      stateWiseListing.state_ids !== null &&
      stateWiseListing.tender_status !== null
    ) {
      dispatch(
        setResultListingModel({
          ...tenderForm,
          state_ids: competitor.state_id.toString(),
          tender_status: 0,
        })
      );
      window.open(
        `/dashboard/tender-result?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleMyParticipated = (e, competitor) => {
    if (
      stateWiseListing.bidder_name !== null &&
      stateWiseListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: localStorage.getItem("user_name"),
          tender_status: 7,
          state_ids: competitor.state_id.toString(),
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleWonTenders = (e, competitor) => {
    if (
      stateWiseListing.bidder_name !== null &&
      stateWiseListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: localStorage.getItem("user_name"),
          tender_status: 6,
          state_ids: competitor.state_id.toString(),
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };
  const handleClickEvent = (e, key, competitor) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleWonTenders(e, competitor);
        break;
      case "state":
        handleState(e, competitor);
        break;
      case "participated":
        handleMyParticipated(e, competitor);
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
              {loader === true ? (
                <LinerLoader />
              ) : value.length > 0 ? (
                value.map((competitor, key) => {
                  const truncatedName =
                    competitor?.state_name.length > 30
                      ? `${competitor?.state_name.slice(0, 30)}...`
                      : competitor?.state_name;
                  return (
                    <StyledTableRow key={key}>
                      <StyledTableCell
                        component="th"
                        style={{ cursor: "pointer" }}
                        scope="row"
                        onClick={(e) =>
                          handleClickEvent(e, "state", competitor)
                        }
                      >
                        {/* <Link
                          to={`/dashboard/tender-result/${encodeString(
                            JSON.stringify({
                              statesName: [
                                {
                                  state_id: competitor.state_id,
                                  state_name: competitor.state_name,
                                },
                              ],
                              stages: [],
                              tabName: "tender_results",
                            })
                          )}`}
                          target="_blank"
                        > */}
                        {/* <Tooltip title={competitor?.state_name}>
                          <span>{truncatedName}</span>
                        </Tooltip> */}
                        {/* {competitor?.state_name} */}
                        {/* </Link> */}
                        {competitor?.state_name}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center", cursor: "pointer" }}
                      >
                        {competitor?.published === 0 ? (
                          0
                        ) : (
                          // <Link
                          //   to={`/dashboard/tender-result/${encodeString(
                          //     JSON.stringify({
                          //       statesName: [
                          //         {
                          //           state_id: competitor.state_id,
                          //           state_name: competitor.state_name,
                          //         },
                          //       ],
                          //       tabName: "tender_results",
                          //       stages: [],
                          //     })
                          //   )}`}
                          //   target="_blank"
                          // >
                          //   {competitor?.published}
                          // </Link>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "state", competitor)
                            }
                          >
                            {competitor?.published}
                          </span>
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        {competitor?.participate === 0 ? (
                          0
                        ) : (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "participated", competitor)
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
                        {competitor?.tender_won === 0 ? (
                          0
                        ) : (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleClickEvent(e, "awardvalue", competitor)
                            }
                          >
                            {valueConvert(competitor?.tender_won)}
                          </span>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <h3 className="data-not-found">No Data Found</h3>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MapChart;
