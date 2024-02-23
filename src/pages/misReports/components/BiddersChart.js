import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Skeleton } from "@mui/material";
import { genrateMISService } from "../../../_services/misReportService";
import { useTheme } from "@mui/material/styles";
import { handleDownloadExcelBidderReports } from "../downloadExcel";

const BiddersChart = (props) => {
  const theme = useTheme();
  const { misReportForm } = props;
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    genrateMISService
      .BidderWiseMis(misReportForm)
      .then((res) => {
        if (res.Success) {
          setLoader(false);
          setValue(res.Data);
        } else {
          setLoader(false);
          setValue([]);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("Dashboard tender State vise" + err);
      });
  }, [misReportForm]);

  const state = {
    series: [
      {
        // name: `${
        //   misReportForm.bidder_name.length > 0
        //     ? "Participated Result"
        //     : "Published Result"
        // }`,
        name: "Participated Result",
        data: value.map((res) => res.participatedcount),
      },
      {
        name: "Awarded Result",
        data: value.map((res) => res.awardedcount),
      },
      // {
      //   name: "Lost Count",
      //   data: value.map((res) => res.lostcount),
      // },
      // {
      //   name: "Rtacount Count",
      //   data: value.map((res) => res.rtacount),
      // },
    ],
    options: {
      noData: {
        text: `${loader ? "Loading..." : "No Data"}`,
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#000000",
          fontSize: "14px",
          fontFamily: "Helvetica",
        },
      },
      chart: {
        type: "bar",
        height: 290,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#0eb05e", "#ffb826"],
      responsive: [
        {
          breakpoint: 2000,
          options: {
            chart: { height: "280px" },
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
            chart: { height: "280px" },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              floating: false,
            },
          },
        },
        {
          breakpoint: 1450,
          options: {
            chart: { height: "280px" },
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
            chart: { height: "280px" },
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
            chart: { height: "280px" },
            legend: {
              show: true,
              position: "left",
              horizontalAlign: "left",
              floating: false,
            },
          },
        },
        {
          breakpoint: 767,
          options: {
            chart: { height: "280px" },
            legend: {
              show: true,
              position: "top",
              horizontalAlign: "center",
              floating: false,
            },
          },
        },
      ],
      xaxis: {
        categories: value.map((res) => res?.bidder_name),
        tickAmount: 5,
        min: 0,
        max:
          value.length > 0 &&
          Math.max(...value.flatMap((series) => series.participatedcount)) < 5
            ? 5
            : Math.max(...value.flatMap((series) => series.participatedcount)),
        labels: {
          formatter: function (val, opts, i) {
            // return val.toFixed(2);
            return Math.round(val);
          },
        },
        title: {
          text: "Count",
        },
      },
      yaxis: {
        title: {
          text: "bidder name",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val, i) {
            console.log(val);
            return val;
          },
        },
      },
    },
  };
  return (
    <>
      <button
        // ref={componentRef}
        className={`
        ${loader ? "excel-disable" : "location-area-bidder-area-mis-reports "}`}
        onClick={() => handleDownloadExcelBidderReports(misReportForm)}
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Download Excel
      </button>
      <h2>Bidders</h2>
      {loader === true ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : value.length > 0 ? (
        <>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={280}
          />
        </>
      ) : (
        <h3>No Data Found in Selected Date</h3>
      )}
    </>
  );
};

export default BiddersChart;
