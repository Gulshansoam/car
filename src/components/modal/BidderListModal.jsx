import { Modal } from "antd";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { valueConvert } from "../../_helpers/valueConvert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { setBidderName } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { Tooltip } from "@mui/material";
import { truncateName } from "../../_helpers/truncateName";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const BidderListModal = ({
  modelOpen,
  setModelOpen,
  modelData,
  modalStage,
}) => {
  const classes = useStyles();
  const { selectedFromDate, selectedToDate } = useContext(selectedDateRange);
  const dispatch = useDispatch();

  //******************************************************** */
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
  // **************************************************************/

  const handleModelClose = () => {
    setModelOpen(false);
  };

  // *****************************************************/
  const redirectToCompanyProfile = (e, bidder_name) => {
    dispatch(setBidderName(bidder_name.bidder_name));
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

  // const showBidValue = (status, stage) => {
  //   if(!status.technical_status)

  // }

  return (
    <Modal
      open={modelOpen}
      onCancel={handleModelClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      footer={null}
      className="participant-bidder-list"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`Participant Bidder List ${
            modelData.length > 0
              ? `(Result Id: ${modelData[0]?.result_id})`
              : ""
          } `}
        </Typography>

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
                  {modelData.length > 0 &&
                    modelData.map((row, index) => {
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
                            {showFinancialStatus(row, modalStage)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {showAocStatus(row, modalStage)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {modalStage !== "technical" && row?.bid_value > 0
                              ? `₹ ${valueConvert(row?.bid_value)}`
                              : "-"}
                            {/* {showBidValue(row, modalStage)} */}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {modalStage !== "technical" &&
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
      </Box>
    </Modal>
  );
};

export default BidderListModal;
