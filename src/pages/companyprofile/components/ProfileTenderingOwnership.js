import React from "react";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { Skeleton } from "@mui/material";

const ProfileTenderingOwnership = ({
  profileBidderName,
  handleClickTenderOwnership,
  value,
  setValue,
  isParticipated,
}) => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);

  // const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0 &&
      isParticipated
    ) {
      tenderResultService
        .getCompanyProfileTenderingOwnership({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: profileBidderName,
        })
        .then((res) => {
          if (res.Success) {
            setLoader(false);
            setValue(res.Data);
          } else {
            setLoader(true);
            setValue([]);
          }
        })
        .catch((err) => {
          setLoader(true);
          console.log("Dashboard tender State vise" + err);
        });
    } else setValue([]);
  }, [selectedFromDate, selectedToDate, isDateSelected, isParticipated]);

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
        name: "Awarded",
        data: value.map((res) => res.total_awarded),
      },
      {
        name: "Participated",
        data: value.map((res) => res.total_participate),
      },
    ],
    chart: {
      type: "bar",
      // height: 350,
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
    colors: ["#ffb826", "#0eb05e"],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false, //////
      style: {
        fontSize: "9px",
        colors: ["black"],
      },
    },
    stroke: {
      show: true, /////
      colors: ["#fff"],
    },
    yaxis: {
      // forceNiceScale: true,
    },
    xaxis: {
      categories: value.map((res) => res.organization_type_name),
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      tickAmount: 5,
      min: 0,
      max:
        value !== undefined &&
        Math.max(...value.flatMap((series) => series.total_participate)) < 5
          ? 5
          : Math.max(...value.flatMap((series) => series.total_participate)),
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
          chart: { height: 230 },
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
            // height={400}
          />
        </>
      ) : (
        <h3>No Data Found</h3>
      )}
    </div>
  );
};

export default ProfileTenderingOwnership;
