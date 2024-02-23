import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { Skeleton } from "@mui/material";
import { genrateMISService } from "../../../_services/misReportService";
import { handleDownloadExcelCategoryWise } from "../downloadExcel";
import { useTheme } from "@mui/material/styles";
const CategoryChart = ({
  handleClickStages,
  isParticipated,
  misReportForm,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState([]);

  const [loader, setLoader] = useState(false);
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);

  useEffect(() => {
    setLoader(true);
    genrateMISService
      .categoryWiseMis(misReportForm)
      .then((res) => {
        if (res.Success) {
          setLoader(false);
          setValue(res.Data);
          // console.log(
          //   res,
          //   res.Data.filter((val) => parseInt(val.publishedcount) !== 0).map(
          //     (res1) => parseInt(res1.publishedcount)
          //   )
          // );
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

  //

  const state = {
    // series:
    //   value.length > 0 && Object.values(value[0]).filter((val) => val !== 0),
    series:
      value.length > 0 &&
      value
        .filter((val) => parseInt(val.publishedcount) !== 0)
        .map((res1) => parseInt(res1.publishedcount)),
    options: {
      tooltip: {
        y: {
          formatter: function (e, a) {
            // return Math.round(e) ;
            return (
              //   "<p class='Chartheader'>" +
              //   value[a.dataPointIndex].keyword_name +
              //   ":" +
              //   "</p>" +
              "<ul class='chartTooltip'>" +
              "<li><b>Awarded Result</b>: " +
              value[a.dataPointIndex].awardedcount +
              "</li>" +
              "<li><b>" +
              `${
                misReportForm.bidder_name.length > 0
                  ? "Participated Result"
                  : "Published Result"
              }` +
              "</b>: " +
              value[a.dataPointIndex].publishedcount +
              "</li>" +
              "</ul>"
            );
          },
        },
      },
      chart: {
        type: "pie",
        // events: {
        //   dataPointSelection: function (event, chartContext, config) {
        //     handleClickStages(event, chartContext, config);
        //   },
        // },
      },
      labels:
        value.length > 0 &&
        value
          .filter((val) => parseInt(val.publishedcount) !== 0)
          .map((res1) => res1.keyword_name),
      //   labels:
      //     value.length > 0 &&
      //     Array.from(
      //       Object.keys(value.length > 0 && value[0]).filter(
      //         (key) => value.length > 0 && value[0][key] !== 0
      //       )
      //     ),
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -50,
          },
        },
      },
      legend: {
        position: "bottom",
      },
      colors: [
        "#0eb05e",
        "#ffb826",
        "#2E93fA",
        "#FF0000",
        "#E91E63",
        "#4B0082",
        "#FF4500",
      ],
      responsive: [
        {
          breakpoint: 2000,
          options: {
            chart: { height: "327px" },
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
            chart: { height: "327px" },
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
            chart: { height: "327px" },
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
            chart: { height: "327px" },
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
            chart: { width: "330px", height: "330px" },
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
            chart: { width: "300px", height: "300px" },
            legend: {
              show: true,
              position: "top",
              horizontalAlign: "center",
              floating: false,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <button
        className={`
        ${loader ? "excel-disable" : "location-area-bidder-area-mis-reports "}`}
        onClick={() => handleDownloadExcelCategoryWise(misReportForm)}
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Download Excel
      </button>
      <h2>Category</h2>
      {loader === true ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : value.length > 0 ? (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          //   width={370}
        />
      ) : (
        <h3>No Data Found</h3>
      )}
    </>
  );
};

export default CategoryChart;
