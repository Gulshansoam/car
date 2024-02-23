import React from "react";
import { genrateMISService } from "../../../_services/misReportService";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Skeleton } from "@mui/material";
import {
  handleDownloadExcelCompanyReportValueWise,
  handleDownloadExcelValueWise,
} from "../downloadExcel";
import { useTheme } from "@mui/material/styles";

const ValueChart = (props) => {
  const theme = useTheme();
  const { misReportForm } = props;
  const [value, setValue] = useState([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getDepartmentData();
  }, [misReportForm]);

  const getDepartmentData = async () => {
    setLoader(true);
    let res = await genrateMISService.valuewiseMis(misReportForm);
    if (res.Success) {
      const validData = res.Data.filter(
        (e) => parseInt(e.awardedcount) > 0 || parseInt(e.publishedcount) > 0
      );
      // console.log(validData);
      validData && validData.length > 0 ? setValue(res.Data) : setValue([]);
      return setLoader(false);
    }
    return setLoader(false);
  };

  useEffect(() => {
    setCount(
      value.length > 0 &&
        value.reduce((acc, curr) => acc + curr.total_result, 0)
    );
  }, [value]);

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
    colors: ["#fda92d", "#7635dc"],
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
      categories: value.map((res) => res.indexName.split(" ")),
      labels: {
        show: true,
        style: {
          fontSize: "10px",
        },
      },
    },
    colors: ["#0eb05e", "#ffb826"],
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
        onClick={() => handleDownloadExcelValueWise(misReportForm)}
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
        onClick={() => handleDownloadExcelCompanyReportValueWise(misReportForm)}
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Company Report
      </button>
      <h2>Value</h2>
      <div>
        {loader === true ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : value?.length > 0 ? (
          <>
            <ReactApexChart
              options={options}
              series={options.series}
              type="bar"
            />
          </>
        ) : (
          <h3>No Data Found</h3>
        )}
      </div>
    </>
  );
};

export default ValueChart;
