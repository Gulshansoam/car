import * as React from "react";
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
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { valueConvert } from "../../../_helpers/valueConvert";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { setBidderName, setSelectedListing } from "../../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/styles";
import { alpha } from "@mui/material/styles";

const GetBidderResult = (props) => {
  const { bidders } = props;
  const theme = useTheme();
  const shortlistCompetitorListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const dispatch = useDispatch();
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const params = useParams();
  const sessionData = sessionStorage.getItem("bidModel");
  const [bidderList, setBidderList] = useState([]);
  const [tenderForm, setTenderForm] = useState({
    ...shortlistCompetitorListing,
  });


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
    if (bidders.length > 1) {
      tenderDetailServices
        .getBidderParticipatedResult({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: bidders,
        })
        .then((res) => {
          if (res.Success === true) {
            setBidderList(res.Data);
          } else {
            setBidderList([]);
          }
        })
        .catch((err) => {
          console.log("Tender Detail bidder participate Result" + err);
        });
    }
  }, [bidders]);

  //******************************************* */

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

  const redirectToCompanyProfile = (e, competitor) => {
    dispatch(setBidderName(competitor.bidder_name));
    window.open(
      `/dashboard/company-profile?datefrom=${selectedFromDate}&dateto=${selectedToDate}`
    );
  };

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
      window.open("/dashboard/companyprofile-tenders");
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
      window.open("/dashboard/companyprofile-tenders");
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
      window.open("/dashboard/companyprofile-tenders");
    }
  };

  const handleClickEvent = (e, key, bidder) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleAwardedTenders(e, bidder);
        break;
      case "companyprofile":
        redirectToCompanyProfile(e, bidder);
        break;
      case "participated":
        handleMyParticipated(e, bidder);
        break;
      case "losttender":
        handleLostTenders(e, bidder);
        break;
      default:
        break;
    }
  };

  return (
    bidderList.length > 0 && (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel3a-header"
          style={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          }}
        >
          <Typography>Bidders Report</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <div className="bidder-participated-tenders company-india-map"> */}
          {/* <h2>Bidders Report</h2> */}
          <TableContainer component={Paper} className="bidders-report-area">
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Bidder name</StyledTableCell>
                  <StyledTableCell align="center">
                    Participated tender
                    <span>(Value & Count Of Tender)</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Awarded tenders
                    <span>(Value & Count Of Tender)</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Lost Tenders
                    <span>(Value & Count Of Tender)</span>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bidderList.length > 0 &&
                  bidderList.map((bidder, key) => {
                    const truncatedName =
                      bidder?.bidder_name.length > 20
                        ? `${bidder?.bidder_name.slice(0, 20)}...`
                        : bidder?.bidder_name;
                    return (
                      <StyledTableRow key={key}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          onClick={(e) =>
                            handleClickEvent(e, "companyprofile", bidder)
                          }
                        >
                          <Tooltip title={bidder?.bidder_name}>
                            <span>{truncatedName}</span>
                          </Tooltip>
                        </StyledTableCell>
                        {bidder?.participated_tender_value == 0 &&
                        bidder?.participated_tender_count == 0 ? (
                          <StyledTableCell
                            align="center"
                            // onClick={(e) =>
                            //   handleClickEvent(e, "participated", bidder)
                            // }
                          >
                            {`${valueConvert(
                              bidder?.participated_tender_value
                            )} | ${valueConvert(
                              bidder?.participated_tender_count
                            )}`}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            align="center"
                            onClick={(e) =>
                              handleClickEvent(e, "participated", bidder)
                            }
                          >
                            {`₹ ${valueConvert(
                              bidder?.participated_tender_value
                            )} | ${valueConvert(
                              bidder?.participated_tender_count
                            )}`}
                          </StyledTableCell>
                        )}
                        {bidder?.award_result_value == 0 &&
                        bidder?.award_result_count == 0 ? (
                          <StyledTableCell
                            align="center"
                            // onClick={(e) =>
                            //   handleClickEvent(e, "awardvalue", bidder)
                            // }
                          >
                            {`₹ ${valueConvert(
                              bidder?.award_result_value
                            )} | ${valueConvert(bidder?.award_result_count)}`}
                            {/* </Link> */}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            align="center"
                            onClick={(e) =>
                              handleClickEvent(e, "awardvalue", bidder)
                            }
                          >
                            {`₹ ${valueConvert(
                              bidder?.award_result_value
                            )} | ${valueConvert(bidder?.award_result_count)}`}
                            {/* </Link> */}
                          </StyledTableCell>
                        )}

                        {bidder?.lost_value == 0 && bidder?.lost_tender == 0 ? (
                          <StyledTableCell
                            align="center"
                            // onClick={(e) =>
                            //   handleClickEvent(e, "losttender", bidder)
                            // }
                          >
                            {`₹ ${valueConvert(
                              bidder?.lost_value
                            )} | ${valueConvert(bidder?.lost_tender)}`}
                            {/* </Link> */}
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            align="center"
                            onClick={(e) =>
                              handleClickEvent(e, "losttender", bidder)
                            }
                          >
                            {`₹ ${valueConvert(
                              bidder?.lost_value
                            )} | ${valueConvert(bidder?.lost_tender)}`}
                            {/* </Link> */}
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </div> */}
        </AccordionDetails>
      </Accordion>
    )
  );
};

export default GetBidderResult;
