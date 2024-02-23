import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { genrateMISService } from "../../../_services/misReportService";
import { useTheme } from "@mui/material/styles";
import {
  handleDownloadExcelCompanyReportOwnershipReportWise,
  handleDownloadExcelOwnershipReportWise,
} from "../downloadExcel";
import { tenderOwnerShipColor } from "../../../_helpers/tenderOwnershipChart";

const OwnerShipChart = ({ misReportForm }) => {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    genrateMISService
      .ownershipWiseMis(misReportForm)
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
              "<p>" +
              // value[a.dataPointIndex].organization_type_name +
              // ":" +
              "</p>" +
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
      },
      labels:
        value.length > 0 &&
        value
          .filter((val) => parseInt(val.publishedcount) !== 0)
          .map((res1) => res1.organization_type_name),

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
      // colors: [
      //   "#0eb05e",
      //   "#ffb826",
      //   "#2E93fA",
      //   "#FF0000",
      //   "#66DA26",
      //   "#546E7A",
      //   "#E91E63",
      //   "#4B0082",
      //   "#FF9800",
      //   "#FF4500",
      // ],
      colors: tenderOwnerShipColor(value),
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
        onClick={() => handleDownloadExcelOwnershipReportWise(misReportForm)}
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
          handleDownloadExcelCompanyReportOwnershipReportWise(misReportForm)
        }
        style={{
          borderColor: theme.palette.primary.darker,
          color: theme.palette.primary.darker,
        }}
        disabled={loader}
      >
        Company Report
      </button>
      <h2>Ownership Reports</h2>
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
          // width={370}
        />
      ) : (
        <h3>No Data Found</h3>
      )}
    </>
  );
};

export default OwnerShipChart;
