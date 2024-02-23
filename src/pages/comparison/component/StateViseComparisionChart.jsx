import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { valueConvert } from "../../../_helpers/valueConvert";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const StateViseComparisionChart = ({
  companyDetail,
  formData,
  selectedKeyWord,
  wordSearch,
  subIndustryTag,
}) => {
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const classes = useStyles();
  const [firstChart, setFirstChart] = useState([]);
  const [secondChart, setSecondChart] = useState([]);
  const [thirdChart, setThirdChart] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const comparisionListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [tenderForm, setTenderForm] = useState({ ...comparisionListing });

  useEffect(() => {
    if (companyDetail.length > 0) {
      setFirstChart(companyDetail[0].tenderState);
      setSecondChart(companyDetail[1].tenderState);
      companyDetail.length > 2
        ? setThirdChart(companyDetail[2].tenderState)
        : setThirdChart([]);
    }
  }, [companyDetail]);

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

  const handleMyParticipated = (value, i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: bidderName,

          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          tender_status: 7,
          state_ids: [value],
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleMyAwardedValue = (value, i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: bidderName,
          state_ids: [value],
          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
          tender_status: 6,
          stage: 3,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const sessionData = sessionStorage.getItem("bidModel");

  const handleClickEvent = (e, state, i, key, res) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleMyAwardedValue(
          state,
          i,

          res.tenderInfo[0].bidder_name
        );
        break;
      case "participated":
        handleMyParticipated(
          state,
          i,

          res.tenderInfo[0].bidder_name
        );
        break;
      default:
        break;
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
  }, [selectedFromDate, selectedToDate]);

  return (
    <div className="col-12">
      <div className="row">
        <div className="First-Compare-area">
          <div className="col-12">
            <div className="text-area tender-ownership-text state-wise-compare">
              State Wise
            </div>
          </div>
        </div>
        {companyDetail.length > 0 && (
          <>
            {companyDetail.map((res, i) => {
              return (
                res !== undefined && (
                  <div className="Second-Compare-area">
                    <div className="col-12">
                      <div className="text-area text-center big-text state-wise-compare">
                        <div className="indiamap-graph">
                          <TableContainer
                            classes={{ root: classes.customTableContainer }}
                            component={Paper}
                          >
                            <Table
                              sx={{ minWidth: 100, minHeight: 100 }}
                              aria-label="customized table"
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>States</StyledTableCell>
                                  <StyledTableCell align="center">
                                    Participated tenders
                                    <span>(Count | Value)</span>
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Awarded Tenders
                                    <span>(Count | Value)</span>
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {res.tenderState?.length > 0 ? (
                                  res.tenderState !== null &&
                                  res.tenderState?.length > 0 &&
                                  res.tenderState?.map((state, index) => {
                                    return (
                                      <StyledTableRow>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                          onClick={(e) =>
                                            handleClickEvent(
                                              e,
                                              state,
                                              i,
                                              "participated",
                                              res
                                            )
                                          }
                                        >
                                          {state?.state_name}
                                        </StyledTableCell>
                                        {state?.participated_tender_count ==
                                          0 &&
                                        state?.participated_tender_value ==
                                          0 ? (
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                            style={{ textAlign: "center" }}
                                            // onClick={(e) =>
                                            //   handleClickEvent(
                                            //     e,
                                            //     state,
                                            //     i,
                                            //     "participated"
                                            //   )
                                            // }
                                          >
                                            {`${
                                              state?.participated_tender_count
                                            } | ₹ ${valueConvert(
                                              state?.participated_tender_value
                                            )}`}
                                          </StyledTableCell>
                                        ) : (
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                            style={{ textAlign: "center" }}
                                            onClick={(e) =>
                                              handleClickEvent(
                                                e,
                                                state,
                                                i,
                                                "participated",
                                                res
                                              )
                                            }
                                          >
                                            {`${
                                              state?.participated_tender_count
                                            } | ₹ ${valueConvert(
                                              state?.participated_tender_value
                                            )}`}
                                          </StyledTableCell>
                                        )}
                                        {state?.award_result_count == 0 &&
                                        state?.award_result_value == 0 ? (
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                            style={{ textAlign: "center" }}
                                            // onClick={(e) =>
                                            //   handleClickEvent(
                                            //     e,
                                            //     state,
                                            //     i,
                                            //     "awardvalue"
                                            //   )
                                            // }
                                          >
                                            {`${
                                              state?.award_result_count
                                            } | ₹ ${valueConvert(
                                              state?.award_result_value
                                            )}`}
                                          </StyledTableCell>
                                        ) : (
                                          <StyledTableCell
                                            component="th"
                                            scope="row"
                                            style={{ textAlign: "center" }}
                                            onClick={(e) =>
                                              handleClickEvent(
                                                e,
                                                state,
                                                i,
                                                "awardvalue",
                                                res
                                              )
                                            }
                                          >
                                            {`${
                                              state?.award_result_count
                                            } | ₹ ${valueConvert(
                                              state?.award_result_value
                                            )}`}
                                          </StyledTableCell>
                                        )}
                                      </StyledTableRow>
                                    );
                                  })
                                ) : (
                                  <h3 className="data-not-found">
                                    No Data Found
                                  </h3>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default StateViseComparisionChart;
