import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { compititorServices } from "../../../_services/compititorService";
import { FormControlLabel } from "@material-ui/core";
import { Skeleton, Switch } from "@mui/material";
// import LinerLoader from "../../../components/loading-screen/LinerLoader";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
// import { converterDefaultValue } from "../../../layouts/dashboard/header/components/DateConvertor";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { encodeString } from "../../../_helpers/encodeDecode";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial !important",
  },
});

const TopCompetitorsList = ({
  compititorDetail,
  setCompititorDetail,
  bidderInfo,
  setBidderInfo,
  chartValue,
  setChartValue,
  dataState,
  setDataState,
  topCompetitorLoader,
  setCompetitorLoader,
  secondLoader,
  setSecondLoader,
  competitorForm,
}) => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();
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

  useEffect(() => {
    setCompetitorLoader(true);
    compititorServices
      .getTopCompetitorslist({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name:
          competitorForm.participated_bidder_name === ""
            ? localStorage.getItem("user_name")
            : competitorForm.participated_bidder_name,
        state_ids:
          competitorForm.state_id === "" ? "" : competitorForm.state_id,
        organization_id:
          competitorForm.organization_id === 0
            ? 0
            : competitorForm.organization_id,
        organization_type_name:
          competitorForm.organization_type_name === ""
            ? ""
            : competitorForm.organization_type_name,
      })
      .then((res) => {
        if (res.Success === true) {
          setCompetitorLoader(false);
          setCompititorDetail(res.Data);
        } else {
          setCompetitorLoader(true);
          setCompititorDetail([]);
        }
      })
      .catch((err) => {
        setCompetitorLoader(true);
        console.log("Compititors List Error" + err);
      });
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  useEffect(() => {
    setSecondLoader(true);
    compititorServices
      .getTopCompetitorsListChartMonthWise({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name:
          competitorForm.participated_bidder_name === ""
            ? localStorage.getItem("user_name")
            : competitorForm.participated_bidder_name,
        state_ids:
          competitorForm.state_id === "" ? "" : competitorForm.state_id,
        organization_id:
          competitorForm.organization_id === 0
            ? 0
            : competitorForm.organization_id,
        organization_type_name:
          competitorForm.organization_type_name === ""
            ? ""
            : competitorForm.organization_type_name,
      })
      .then((res) => {
        if (res.Success) {
          setSecondLoader(false);
          setChartValue(res.Data);
          setBidderInfo(res.Data.bidderInfo);
        } else {
          setSecondLoader(true);
          setChartValue([]);
        }
      })
      .catch((err) => {
        setSecondLoader(true);
      });
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  const seriesData = bidderInfo?.map((res) => {
    const arr = [];
    for (let i = 0; i < chartValue?.month.length; i++) {
      const data = res?.bidderDetail.filter((res1) => {
        return (
          res1.month.toLowerCase() ===
          chartValue?.month[i].split("-")[0].toLowerCase()
        );
      });
      if (data?.length > 0) {
        arr.push(data.map((res) => res.no_of_tender_participate));
      } else {
        arr.push(0);
      }
    }
    return {
      name: res?.bidderName,
      data: arr.flat(),
    };
  });

  const state = {
    series: seriesData?.filter((res, i) => i < 5),
    options: {
      colors: ["#00ab55", "#078dee", "#7635dc", "#fda92d", "#ff3030"],
      chart: {
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        shared: false,
        intersect: false,
      },
      xaxis: {
        categories: chartValue?.month?.map((res) => res?.split("-")),
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
    },
  };

  const handleChange = (event) => {
    setDataState({ checked: event.target.checked });
  };

  const handleParticipatedBidder = (e, competitor) => {
    window.open(
      `/dashboard/companyprofile-tenders${encodeString(
        JSON.stringify({
          tabName: "participated_tenders",
          bidder_name: {
            bidder_name: competitor?.bidder_name,
          },
        })
      )}`

      // {
      //   state: {
      //     // competitor_detail: competitor,
      //     tabName: "participated_tenders",
      //     bidder_name: {
      //       bidder_name: competitor?.bidder_name,
      //     },
      //   },
      // }
    );
  };

  const handleAwardedTender = (e, competitor) => {
    window.open(
      `/dashboard/companyprofile-tenders${encodeString(
        JSON.stringify({
          tabName: "awarded_tender",
          winnerBidderData: {
            bidder_name: competitor?.bidder_name,
          },
          stages: [
            {
              stage: "3",
              stage_id: 3,
            },
          ],
        })
      )}`
      // {
      //   // state: {
      //   //   tabName: "awarded_tender",
      //   //   winnerBidderData: {
      //   //     bidder_name: competitor?.bidder_name,
      //   //   },
      //   //   stages: [
      //   //     {
      //   //       stage: "3",
      //   //       stage_id: 3,
      //   //     },
      //   //   ],
      //   // },
      // }
    );
  };

  const handleLostTender = (e, competitor) => {
    window.open(
      `/dashboard/companyprofile-tenders${JSON.stringify({
        tabName: "lost_tender",
        status: [{ status_id: 1 }],
        bidder_name: {
          bidder_name: competitor?.bidder_name,
        },
      })}`
      // {
      //   // state: {
      //   //   tabName: "lost_tender",
      //   //   status: [{ status_id: 1 }],
      //   //   bidder_name: {
      //   //     bidder_name: competitor?.bidder_name,
      //   //   },
      //   // },
      // }
    );
  };

  const handleToBeAnnouncedTender = (e, competitor) => {
    window.open(
      `/dashboard/companyprofile-tenders${encodeString(
        JSON.stringify({
          // competitor_detail: competitor,
          tabName: "result_to_be_announced",
          bidder_name: {
            bidder_name: competitor?.bidder_name,
          },
          // stages: [
          //   {
          //     stage: "Technical",
          //     stage_id: 1,
          //   },
          //   {
          //     stage: "Financial",
          //     stage_id: 2,
          //   },
          // ],
          status: [{ status_id: 2 }],
        })
      )}`
      // {
      //   state: {
      //     // competitor_detail: competitor,
      //     tabName: "result_to_be_announced",
      //     bidder_name: {
      //       bidder_name: competitor?.bidder_name,
      //     },
      //     // stages: [
      //     //   {
      //     //     stage: "Technical",
      //     //     stage_id: 1,
      //     //   },
      //     //   {
      //     //     stage: "Financial",
      //     //     stage_id: 2,
      //     //   },
      //     // ],
      //     status: [{ status_id: 2 }],
      //   },
      // }
    );
  };

  const handleBidderName = (e, competitor) => {
    navigate("/dashboard/company-profile", {
      state: {
        bidder_name: competitor?.bidder_name,
      },
    });
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function numericalAscending(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const headCells = [
    {
      id: "bidder_name",
      numeric: false,
      disablePadding: true,
      label: "Company Name",
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
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className="publish-tender-in-state-area">
        <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              style={{ textAlign: "center" }}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-6">
          <div className="filter-area">
            <h2>
              Competitors List (
              {competitorForm.participated_bidder_name === ""
                ? localStorage.getItem("user_name")
                : competitorForm.participated_bidder_name}
              )
            </h2>

            <div className="top-competitors">
              {topCompetitorLoader === true ? (
                <>
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                <TableContainer
                  classes={{ root: classes.customTableContainer }}
                  component={Paper}
                >
                  <Table aria-label="customized table ">
                    <EnhancedTableHead
                      stickyHeader
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={compititorDetail.length}
                    />
                    <TableBody>
                      {numericalAscending(
                        compititorDetail,
                        getComparator(order, orderBy)
                      ).map((res, key) => {
                        return (
                          <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">
                              <span onClick={(e) => handleBidderName(e, res)}>
                                {res?.bidder_name}
                              </span>
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.participated_tenders === 0 ? (
                                0
                              ) : (
                                <span
                                  onClick={(e) =>
                                    handleParticipatedBidder(e, res)
                                  }
                                >
                                  {res?.participated_tenders}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.awarded_tender === 0 ? (
                                0
                              ) : (
                                <span
                                  onClick={(e) => handleAwardedTender(e, res)}
                                >
                                  {res?.awarded_tender}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.lost_tender === 0 ? (
                                0
                              ) : (
                                <span onClick={(e) => handleLostTender(e, res)}>
                                  {res?.lost_tender}
                                </span>
                              )}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ textAlign: "center" }}
                              component="th"
                              scope="row"
                            >
                              {res?.result_to_be_announced === 0 ? (
                                0
                              ) : (
                                <span
                                  onClick={(e) =>
                                    handleToBeAnnouncedTender(e, res)
                                  }
                                >
                                  {res?.result_to_be_announced}
                                </span>
                              )}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}

                      {/* {compititorDetail.length > 0 &&
                        compititorDetail.map((res, key) => {
                          return (
                            
                          );
                        })} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="filter-area top-competitors-chart">
            <h2>Top Competitors Chart</h2>
            <FormControlLabel
              control={
                <Switch
                  checked={dataState.checked}
                  onChange={handleChange}
                  value="checked"
                  color="primary"
                />
              }
              labelPlacement="start"
              label={dataState.checked ? "Line Chart" : "Bar Chart"}
            />
            {secondLoader === true ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : dataState.checked === true ? (
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="line"
                height={253}
              />
            ) : (
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={253}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompetitorsList;
