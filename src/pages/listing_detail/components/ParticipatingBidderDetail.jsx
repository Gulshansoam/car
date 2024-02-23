import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useParams } from "react-router-dom";
import { setBidderName } from "../../../redux/slice";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { valueConvert } from "../../../_helpers/valueConvert";
import { truncateName } from "../../../_helpers/truncateName";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const ParticipatingBidderDetail = ({ setbidders, stage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedFromDate, selectedToDate } =
    React.useContext(selectedDateRange);
  const [bidderDetail, setBidderDetail] = useState([]);
  const theme = useTheme();
  const params = useParams();

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

  React.useEffect(() => {
    tenderDetailServices
      .getParticipatingBidder({ result_id: params.id })
      .then((res) => {
        if (res.Success === true) {
          // setWinnerBidder(res.Data);
          setBidderDetail(res.Data);
          setbidders(res.Data.map((res) => res.bidder_name).join(","));
        } else {
          setBidderDetail([]);
          setbidders("");
        }
      })
      .catch((err) => {
        console.log("Tender Detail Participating Bidder Detail" + err);
      });
  }, []);

  const redirectToCompanyProfile = (e, competitor) => {
    dispatch(setBidderName(competitor.bidder_name));
    window.open(
      `/dashboard/company-profile?datefrom=${selectedFromDate}&dateto=${selectedToDate}`
    );
  };

  const showFinancialStatus = (status, stage) => {
    if (
      status.technical_status &&
      status.financial_status &&
      stage !== "technical"
    ) {
      return "Qualified";
    } else if (
      status.technical_status &&
      !status.financial_status &&
      stage !== "technical"
    ) {
      return "Disqualified";
    } else if (
      !status.technical_status &&
      !status.financial_status &&
      stage !== "technical"
    ) {
      return "Disqualified";
    } else {
      return "-";
    }
  };

  const showAocStatus = (status, stage) => {
    if (
      status.technical_status &&
      status.financial_status &&
      status.aoc_status &&
      stage === "aoc"
    ) {
      return "Qualified";
    } else if (
      status.technical_status &&
      status.financial_status &&
      !status.aoc_status &&
      stage === "aoc"
    ) {
      return "Disqualified";
    } else if (
      status.technical_status &&
      !status.financial_status &&
      !status.aoc_status &&
      stage === "aoc"
    ) {
      return "Disqualified";
    } else if (
      !status.technical_status &&
      !status.financial_status &&
      !status.aoc_status &&
      stage === "aoc"
    ) {
      return "Disqualified";
    } else {
      return "-";
    }
  };

  return (
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
        <Typography>List Of Bidders</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="participating-bidders-details-area">
            <TableContainer
              classes={{ root: classes.customTableContainer }}
              component={Paper}
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>COMPANY NAME</StyledTableCell>
                    <StyledTableCell align="center">TECHNICAL</StyledTableCell>
                    <StyledTableCell align="center">FINANCIAL</StyledTableCell>
                    <StyledTableCell align="center">AOC</StyledTableCell>
                    <StyledTableCell align="center">RATES</StyledTableCell>
                    <StyledTableCell align="center">RANK</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bidderDetail !== undefined &&
                    bidderDetail.length > 0 &&
                    bidderDetail.map((row, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            onClick={(e) => redirectToCompanyProfile(e, row)}
                            component="th"
                            scope="row"
                            style={{ cursor: "pointer" }}
                          >
                            <Tooltip title={row?.bidder_name}>
                              <span>{truncateName(row?.bidder_name)}</span>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.technical_status
                              ? "Qualified"
                              : "Disqualified"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {showFinancialStatus(row, stage)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {showAocStatus(row, stage)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {stage !== "technical" && row?.bid_value > 0
                              ? `₹ ${valueConvert(row?.bid_value)}`
                              : "-"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {stage !== "technical" &&
                            row?.bidder_rank.length > 0
                              ? row?.bidder_rank
                              : "-"}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ParticipatingBidderDetail;
