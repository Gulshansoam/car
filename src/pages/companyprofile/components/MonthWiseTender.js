import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { Skeleton } from "@mui/material";

const MonthWiseTender = ({
  profileBidderName,
  handleClickMonthWise,
  isParticipated,
}) => {
  const [value, setValue] = useState({
    month: [],
  });
  const [loader, setLoader] = useState(true);
  const [bidderInfo, setBidderInfo] = useState([]);
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0 &&
      isParticipated === true
    ) {
      tenderResultService
        .getCompanyMonthWiseTenderChart({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: profileBidderName,
        })
        .then((res) => {
          setLoader(true);
          if (res.Success) {
            setLoader(false);
            setValue(res.Data);
            setBidderInfo(res.Data.bidderInfo);
          } else {
            setLoader(false);
            setValue([]);
          }
        })
        .catch((err) => {
          setLoader(true);
          console.log("Dashboard tender State vise" + err);
        });
    } else {
      setBidderInfo([]);
      setValue([]);
    }
  }, [selectedFromDate, selectedToDate, isDateSelected, isParticipated]);

  const seriesData = bidderInfo?.map((res) => {
    const arr = [];
    for (let i = 0; i < value?.month?.length; i++) {
      const data =
        res?.biddertDetail !== null &&
        res?.biddertDetail?.filter((res1) => {
          return (
            res1.month.toLowerCase() ===
            value.month[i].split("-")[0].toLowerCase()
          );
        });
      if (data?.length > 0) {
        arr.push(data?.map((res) => res.participated));
      } else {
        arr.push(0);
      }
    }
    const arr2 = [];
    for (let i = 0; i < value?.month?.length; i++) {
      const data = res?.biddertDetail?.filter((res2) => {
        return (
          res2.month.toLowerCase() ===
          value.month[i].split("-")[0].toLowerCase()
        );
      });
      if (data?.length > 0) {
        arr2.push(data?.map((res) => res.awarded));
      } else {
        arr2.push(0);
      }
    }
    return [
      {
        name: "Participated Tender",
        data: arr.flat(),
      },
      {
        name: "Awarded Tender",
        data: arr2.flat(),
      },
    ];
  });

  var options = {
    tooltip: {
      y: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
    },
    series: seriesData[0],
    chart: {
      type: "bar",
      // height: 350,
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          handleClickMonthWise(event, chartContext, config);
        },
      },
    },
    colors: ["#0eb05e", "#ffb826"],
    plotOptions: {
      bar: {
        horizontal: false,
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
    xaxis: {
      categories: value?.month?.map((res) => res?.split("-")),
      labels: {
        style: {
          fontSize: "9px",
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max:
        seriesData.length > 0 &&
        Math.max(
          ...seriesData
            .map((res, i) => res.find((e, i) => i === 0).data)
            .flatMap((series) => series)
        ) < 5
          ? 5
          : Math.max(
              ...seriesData
                .map((res, i) => res.find((e, i) => i === 0).data)
                .flatMap((series) => series)
            ),
    },
    fill: {
      opacity: 1,
    },
    responsive: [
      {
        breakpoint: 2300,
        options: {
          chart: { height: 330 },
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
          chart: { height: 330 },
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
          chart: { width: "320px", height: "350px" },
          legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
            floating: false,
          },
        },
      },
      {
        breakpoint: 767,
        options: {
          chart: { width: "300px", height: "350px" },
          legend: {
            show: true,
            // position: "initial",
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
      {loader === true ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : bidderInfo !== undefined &&
        bidderInfo !== null &&
        bidderInfo.length > 0 ? (
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

export default MonthWiseTender;
