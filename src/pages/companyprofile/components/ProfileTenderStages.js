import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { tenderResultService } from "../../../_services/companyprofileservices";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { Skeleton } from "@mui/material";

const ProfileTenderStages = ({
  profileBidderName,
  handleClickStages,
  isParticipated,
}) => {
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(false);
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);

  // useEffect(() => {
  //   setLoader(true);
  //   tenderResultService
  //     .getCompanyProfileStage({
  //       from_date: selectedFromDate,
  //       to_date: selectedToDate,
  //       bidder_name: profileBidderName,
  //     })
  //     .then((res) => {
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
  // }, [selectedFromDate, selectedToDate, isDateSelected]);

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0 &&
      isParticipated
    ) {
      setLoader(true);
      tenderResultService
        .getCompanyProfileStage({
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

  const state = {
    series:
      value.length > 0 && Object.values(value[0]).filter((val) => val !== 0),
    options: {
      tooltip: {
        y: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
      },
      // tooltip: {
      //   y: {
      //     formatter: function (e, a) {
      //       // console.log(Object.keys(value[0])[a.dataPointIndex], a);
      //       return (
      //         "<p class=''>" +
      //         // Object.keys(value[0])[a.dataPointIndex] +
      //         // " : " +
      //         "</p>" +
      //         +Math.round(e)
      //       );
      //     },
      //   },
      // },
      chart: {
        // width: 380,
        type: "pie",
        events: {
          dataPointSelection: function (event, chartContext, config) {
            handleClickStages(event, chartContext, config);
          },
        },
      },
      labels:
        value.length > 0 &&
        Array.from(
          Object.keys(value.length > 0 && value[0]).filter(
            (key) => value.length > 0 && value[0][key] !== 0
          )
        ),
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
      responsive: [
        {
          breakpoint: 2300,
          options: {
            chart: { height: 377 },
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
            chart: { height: 377 },
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
            chart: { height: 327 },
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
            chart: { height: 327 },
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

export default ProfileTenderStages;
