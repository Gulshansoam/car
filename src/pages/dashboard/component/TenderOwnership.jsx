import React from "react";
import { dashboardService } from "../../../_services/dashboardService";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import FullscreenImg from "../../../assets/images/fullscreen.png";
import { Modal } from "antd";
import { Skeleton } from "@mui/material";

const TenderOwnership = () => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoader(true);
    dashboardService
      .getTenderingOwnership({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name: localStorage.getItem("user_name"),
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
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  // const totalCount = value.map((res) => {
  //   const total = value.reduce((acc, curr) => acc + curr.total_result, 0);
  //   return total;
  // });

  useEffect(() => {
    setCount(value.reduce((acc, curr) => acc + curr.total_result, 0));
  }, [value]);

  var options = {
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
    tooltip: {
      y: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
      shared: true,
      intersect: false,
    },
    chart: {
      type: "bar",
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

    xaxis: {
      categories: value.map((res) => res.organization_type_name),
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      dataLabels: {
        enabled: false, //////
        style: {
          fontSize: "9px",
          colors: ["black"],
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
          chart: { height: 250 },
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },

          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1600,
        chart: { height: 250 },
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1400,
        chart: { height: 250 },
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1180,
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
        breakpoint: 767,
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "7px",
              },
            },
          },
          chart: { width: "330px", height: "220px" },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            floating: false,
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          chart: { width: 600, height: "400px" },
          legend: {
            show: true,
            position: "left",
            horizontalAlign: "left",
            floating: false,
          },
        },
      },
    ],
  };

  return (
    <>
      {" "}
      {/* <div className="col-6">
        <div className="india-map tendering-ownership-main-area">
          <h2>Tendering Ownership </h2> */}
      <div className="tendering-ownership-chart-area">
        {loader ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : (
          <>
            {value.length == 0 ? (
              <p className="shortlisted-competitors-chart-text">
                If You Want To See The Graph You Have To Select One Year Date
              </p>
            ) : (
              <ReactApexChart
                options={options}
                series={options.series}
                type="bar"
                // height={400}
              />
            )}
          </>
        )}
      </div>
      {/* <div class="fullscreen-area-new">
            <button
              style={{
                width: "100%",
              }}
              onClick={handleClickOpen}
            >
              <img title="Fullscreen" src={FullscreenImg}></img>
            </button>
          </div>
        </div>
      </div> */}
      {/* <Modal
        open={open}
        onCancel={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth "
      >
        <h2>Tendering Ownership </h2>
        <div>
          <ReactApexChart
            options={options}
            series={options.series}
            type="bar"
            // height={400}
          />
        </div>
      </Modal> */}
    </>
  );
};

export default TenderOwnership;
