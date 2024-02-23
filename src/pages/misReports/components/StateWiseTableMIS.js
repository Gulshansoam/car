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
import { TableRowsLoader } from "../../../components/table-loader/TableLoader";
import { genrateMISService } from "../../../_services/misReportService";
import {
  handleDownloadExcelComapanyReportStateWise,
  handleDownloadExcelStateWise,
} from "../downloadExcel";
import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const StateWiseTableMIS = (props) => {
  const theme = useTheme();
  const { misReportForm } = props;
  const classes = useStyles();

  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState([]);
  const [activeSorting, setActiveSorting] = useState({
    column: "participate",
    direction: "desc",
  });

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
      label: `${
        misReportForm.bidder_name.length > 0
          ? "Participated Result"
          : "Published Result"
      }`,
    },
    {
      id: "tender_won",
      numeric: false,
      disablePadding: true,
      label: "Awarded tender",
    },
  ];

  //***************************************************************************** */

  const getStateWiseMisReports = async () => {
    setLoader(true);
    const res = await genrateMISService.statewiseMis(misReportForm);
    if (res.Success) {
      setValue(res.Data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    getStateWiseMisReports();
  }, [misReportForm]);

  return (
    <>
      {" "}
      <button
        // location-area-bidder-area-mis-reports
        className={`
        ${loader ? "excel-disable" : "location-area-bidder-area-mis-reports "}`}
        onClick={() => handleDownloadExcelStateWise(misReportForm)}
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Download Excel
      </button>
      <button
        className={`
        ${loader ? "excel-disable" : "location-area-bidder-area-mis-reports "}`}
        onClick={() =>
          handleDownloadExcelComapanyReportStateWise(misReportForm)
        }
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Company Report
      </button>
      <h2>State wise Result</h2>
      <div className="company-india-map state-wise-result-areaa" id="">
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
                      {/* <TableSortLabel
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
                        // onClick={() => handleSort(headCell.id)}
                      > */}
                      {headCell.label}
                      {/* </TableSortLabel> */}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <TableRowsLoader rowsNum={6} colunmNum={3} />
              ) : value.length > 0 ? (
                value.map((competitor, key) => {
                  return (
                    <>
                      <StyledTableRow key={key}>
                        <StyledTableCell
                          component="th"
                          // style={{ cursor: "pointer" }}
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
                          {competitor?.publishedcount == 0 ? (
                            <>
                              <span>0</span>
                              <span>₹ 0.00</span>
                            </>
                          ) : (
                            <>
                              <span>{competitor?.publishedcount}</span>
                              <br />
                              <span>{`₹ ${valueConvert(
                                competitor?.publishedvalue
                              )}`}</span>
                            </>
                          )}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ textAlign: "center" }}
                        >
                          {competitor?.awardedcount === 0 ? (
                            <>
                              <span>0</span>
                              <span>₹ 0.00</span>
                            </>
                          ) : (
                            <>
                              <span>{competitor?.awardedcount}</span>
                              <br />
                              <span>
                                {`₹ ${valueConvert(competitor?.awardedvalue)}`}
                              </span>
                            </>
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
    </>
  );
};

export default StateWiseTableMIS;
