import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Skeleton } from "@mui/material";
import { genrateMISService } from "../../../_services/misReportService";
import {
  handleDownloadExcelComapnyReportMonthWise,
  handleDownloadExcelMonthWise,
} from "../downloadExcel";
import { useTheme } from "@mui/material/styles";
const MonthWiseChart = ({ misReportForm }) => {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(true);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const sorter = (a, b) => {
    if (a.month.split("-")[1] !== b.month.split("-")[1]) {
      return a.month.split("-")[1] - b.month.split("-")[1];
    } else {
      return (
        months.indexOf(a.month.split("-")[0]) -
        months.indexOf(b.month.split("-")[0])
      );
    }
  };

  const gerMonthWiseMisData = () => {
    setLoader(true);
    genrateMISService
      .monthWiseMis(misReportForm)
      .then((res) => {
        // setLoader(true);
        if (res.Success) {
          setLoader(false);
          res.Data.sort(sorter);
          setValue(res.Data);
        } else {
          setLoader(false);
          setValue([]);
        }
      })
      .catch((err) => {
        setLoader(false);
        setValue([]);
        console.log("Dashboard tender State vise" + err);
      });
  };

  useEffect(() => {
    gerMonthWiseMisData();
  }, [misReportForm]);

  var options = {
    tooltip: {
      y: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
      shared: true,
      intersect: false,
    },
    series: [
      {
        name: "Awarded Result",
        data: value.map((res) => res.awardedcount),
      },
      {
        name: `${
          misReportForm.bidder_name.length > 0
            ? "Participated Result"
            : "Published Result"
        }`,
        data: value.map((res) => res.publishedcount),
      },
    ],
    chart: {
      type: "bar",

      events: {
        dataPointSelection: function (event, chartContext, config) {
          handleClickTenderOwnership(event, chartContext, config);
        },
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 100,
      curve: "smooth",
      lineCap: "round",
    },
    colors: ["#0eb05e", "#ffb826"],
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "9px",
        colors: ["black"],
      },
    },
    stroke: {
      show: true,
      colors: ["#fff"],
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max:
        value !== undefined &&
        Math.max(...value.flatMap((series) => series.publishedcount)) < 5
          ? 5
          : Math.max(...value.flatMap((series) => series.publishedcount)),
    },
    xaxis: {
      categories: value.map((res) => [
        res.month.split("-")[0].slice(0, 3),
        res.month.split("-")[1],
      ]),

      labels: {
        show: true,
        style: {
          fontSize: "10px",
        },
      },
    },
    responsive: [
      {
        breakpoint: 2500,
        options: {
          chart: { height: 280 },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 2000,
        options: {
          chart: { height: 280 },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1700,
        options: {
          chart: { height: 280 },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: { height: 280 },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: { width: "550px" },
          legend: {
            show: true,
            position: "left",
            horizontalAlign: "left",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1180,
        options: {
          chart: { width: "700px", height: "350px" },
          legend: {
            show: true,
            position: "left",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 767,
        chart: { width: "330px", height: "300px" },
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
          chart: { width: "330px", height: "350px" },
          legend: {
            show: true,
            position: "top",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
    ],
  };

  return (
    <>
      <button
        className={`
        ${loader ? "excel-disable" : "location-area-bidder-area-mis-reports "}`}
        onClick={() => handleDownloadExcelMonthWise(misReportForm)}
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
        onClick={() => handleDownloadExcelComapnyReportMonthWise(misReportForm)}
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Company Report
      </button>
      <h2>Monthwise Reports</h2>
      {loader ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : value.length > 0 ? (
        <ReactApexChart
          options={options}
          series={options.series}
          type="bar"
          // height={350}
        />
      ) : (
        <h3>No Data Found in Selected Date</h3>
      )}
    </>
  );
};

export default MonthWiseChart;
