import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { Skeleton } from "@mui/material";

const ProfileDepartment = ({
  profileBidderName,
  handleDepartmentClickEvent,
  isParticipated,
  setDepartment,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState([]);

  const [loader, setLoader] = useState(true);
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const handleClickEvent = (event, chartContext, config, departmentId) => {
    console.log(value[config.dataPointIndex]);
    setDepartment(value[config.dataPointIndex]);
    handleDepartmentClickEvent();
  };
  // useEffect(() => {
  //   tenderResultService
  //     .CompanyDepartment({
  //       from_date: selectedFromDate,
  //       to_date: selectedToDate,
  //       bidder_name: profileBidderName,
  //     })
  //     .then((res) => {
  //       setLoader(true);
  //       if (res.Success) {
  //         setLoader(false);
  //         setValue(res.Data);
  //       } else {
  //         setLoader(true);
  //         setValue([]);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoader(true);
  //       console.log("Dashboard tender State vise" + err);
  //     });
  // }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0 &&
      isParticipated
    ) {
      tenderResultService
        .CompanyDepartment({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: profileBidderName,
        })
        .then((res) => {
          setLoader(true);
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

  const state = {
    series: [
      {
        name: "Participated Result",
        data: value.map((res) => res.participate_result),
      },
    ],
    options: {
      tooltip: {
        y: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
      },
      colors: ["#00ab55", "#078dee", "#7635dc", "#fda92d", "#ff3030"],
      chart: {
        type: "bar",
        events: {
          dataPointSelection: function (event, chartContext, config) {
            handleClickEvent(event, chartContext, config);
          },
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
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
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "left",
      },
      xaxis: {
        categories: value.map((res) => res.organization_name.split(" ")),
        labels: {
          show: true,
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max:
          value !== undefined &&
          Math.max(...value.flatMap((series) => series.participate_result)) < 5
            ? 5
            : Math.max(...value.flatMap((series) => series.participate_result)),
        // forceNiceScale: true,
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
            xaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: "7.5px",
                },
              },
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
            xaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: "7.5px",
                },
              },
            },
          },
        },
        {
          breakpoint: 1450,
          options: {
            chart: { height: 280 },
            legend: {
              show: false,
              position: "bottom",
              horizontalAlign: "left",
              floating: false,
            },
            xaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: "7.9px",
                },
              },
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
            chart: { width: "330px" },
            legend: {
              show: false,
              position: "bottom",
              horizontalAlign: "bottom",
              floating: false,
              fontSize: "14px",
              fontWeight: 400,
            },
            xaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: "9.5px",
                },
              },
            },
          },
        },
        {
          breakpoint: 767,
          options: {
            chart: { width: "300px", height: "390px" },
            legend: {
              show: false,
              position: "top",
              horizontalAlign: "left",
              floating: false,
            },
            xaxis: {
              labels: {
                show: true,
                style: {
                  fontSize: "8.4px",
                },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      {loader === true ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : value.length > 0 ? (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          // height={350}
        />
      ) : (
        <h3>No Data Found</h3>
      )}
    </div>
  );
};

export default ProfileDepartment;
