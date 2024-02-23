import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  FormControlLabel,
  Paper,
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
import { dashboardService } from "../../_services/dashboardService";
import { compititorServices } from "../../_services/compititorService";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { TableRowsLoader } from "../../components/table-loader/TableLoader";
import { truncateName } from "../../_helpers/truncateName";
import { useSelector, useDispatch } from "react-redux";
import { setBidderName, setSelectedListing } from "../../redux/slice";
import { valueConvert } from "../../_helpers/valueConvert";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const TopCompetiorsTable = (props) => {
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

  //***************props********************** */
  const { fromdashboard, competitorsPageForm } = props;
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const topCompetitorsTableListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const dispatch = useDispatch();
  const sessionData = sessionStorage.getItem("bidModel");

  const [tenderForm, setTenderForm] = useState({
    ...topCompetitorsTableListing,
  });
  const [activeSorting, setActiveSorting] = useState({
    column: "bidder_name",
    direction: "asc",
  });
  const [dashboardPageForm, setDashboardPageForm] = useState({
    user_id: localStorage.getItem("user_id"),
    user_query_id: localStorage.getItem("user_email_service_query_id"),
    from_date: selectedFromDate,
    to_date: selectedToDate,
    bidder_name: localStorage.getItem("user_name"),
  });
  const [topCompetitorList, setTopCompetitorList] = useState([]);
  const [loader, setLoader] = useState(false);

  const getTopCompetitorList = async () => {
    try {
      if (fromdashboard) {
        setLoader(true);
        let res = await dashboardService.getTopCompetitorsList(
          dashboardPageForm
        );
        if (res?.Success && res?.TotalRecord > 0) {
          setTopCompetitorList(res?.Data);
          setLoader(false);
        } else {
          setTopCompetitorList([]);
        }
      } else {
        setLoader(true);
        let res = await compititorServices.getTopCompetitorslist({
          ...competitorsPageForm,
          from_date: selectedFromDate,
          to_date: selectedToDate,
        });
        if (res.Success && res.TotalRecord > 0) {
          setTopCompetitorList(res?.Data);
          setLoader(false);
        } else {
          setTopCompetitorList([]);
        }
      }
    } catch (error) {
      console.log("error", error);
      setTopCompetitorList([]);
      setLoader(false);
    }
  };

  useEffect(() => {
    getTopCompetitorList();
  }, [selectedFromDate, selectedToDate, competitorsPageForm]);

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

  const handleSort = (column) => {
    const isAscending =
      activeSorting.column === column && activeSorting.direction === "desc";
    const direction = isAscending ? "asc" : "desc";
    const sortedData = [...topCompetitorList].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      } else {
        return isAscending ? 1 : -1;
      }
    });
    setTopCompetitorList(sortedData);
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

  const redirectToCompanyProfile = (e, bidder_name) => {
    dispatch(setBidderName(bidder_name));
    window.open(
      `/dashboard/company-profile?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
    );
  };

  const handleMyParticipated = (e, competitor) => {
    if (
      topCompetitorsTableListing.bidder_name !== null &&
      topCompetitorsTableListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          participant_name:
            bidderSearch === undefined ||
            bidderSearch === "" ||
            bidderSearch.length < 0
              ? localStorage.getItem("user_name")
              : bidderSearch,
          tender_status: 7,
          bidder_name: competitor.bidder_name,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleAwardedTenders = (e, competitor) => {
    if (
      topCompetitorsTableListing.bidder_name !== null &&
      topCompetitorsTableListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          participant_name:
            bidderSearch === undefined ||
            bidderSearch === "" ||
            bidderSearch.length < 0
              ? localStorage.getItem("user_name")
              : bidderSearch,
          tender_status: 6,
          bidder_name: competitor.bidder_name,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  return (
    <>
      <div
        className="top-competitors company-competitors"
        id="scrollTopCompetitor"
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
                <TableRowsLoader rowsNum={4} colunmNum={3} />
              ) : topCompetitorList.length > 0 ? (
                topCompetitorList.map((res, i) => {
                  return (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        <div
                          onClick={(e) =>
                            handleClickEvent(
                              e,
                              "companyprofile",
                              res?.bidder_name
                            )
                          }
                        >
                          <Tooltip title={res?.bidder_name}>
                            <span>{truncateName(res?.bidder_name)}</span>
                          </Tooltip>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            handleClickEvent(e, "participated", res)
                          }
                        >
                          {res?.participated_tenders}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ textAlign: "center" }}
                      >
                        {res?.award_result_value === 0 ? (
                          0
                        ) : (
                          <span
                            onClick={(e) =>
                              handleClickEvent(e, "awardvalue", res)
                            }
                          >
                            ₹ {valueConvert(res?.award_result_value)}
                          </span>
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
    </>
  );
};

export default TopCompetiorsTable;
