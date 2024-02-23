import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { dashboardService } from "../../../_services/dashboardService";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { Skeleton } from "@mui/material";

export default function TopCompititorsChart({ competitorPage, dataState }) {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const [value, setValue] = useState({
    month: [],
  });
  const [loader, setLoader] = useState(false);
  const [bidderInfo, setBidderInfo] = useState([]);

  const getBidderTopCompititorsListChartMonthWise = (name) => {
    setLoader(true);
    dashboardService
      .getBidderTopCompititorsListChartMonthWise({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name: name,
      })
      .then((res) => {
        if (res.Success) {
          setValue(res.Data);
          setLoader(false);
          setBidderInfo(res.Data.bidderInfo);
        } else {
          setLoader(true);
          setValue([]);
        }
      })
      .catch((err) => {
        setLoader(true);
        console.log("Dashboard tender State vise" + err);
      });
  };

  useEffect(() => {
    getBidderTopCompititorsListChartMonthWise(
      localStorage.getItem("user_name")
    );
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  const seriesData = bidderInfo?.map((res) => {
    const arr = [];
    for (let i = 0; i < value?.month?.length; i++) {
      const data = res?.bidderDetail?.filter((res1) => {
        return (
          res1?.month.toLowerCase() ===
          value?.month[i].split("-")[0].toLowerCase()
        );
      });
      if (data?.length > 0) {
        arr.push(data?.map((res) => res.no_of_tender_participate));
      } else {
        arr.push(0);
      }
    }
    return {
      name: res?.bidderName,
      data: arr.flat(),
    };
  });

  // const urlCheck = window.location.href.split("/")[4];

  const state = {
    series: seriesData,
    options: {
      tooltip: {
        y: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
        shared: true,
        intersect: false,
      },
      colors: ["#00ab55", "#078dee", "#7635dc", "#fda92d", "#ff3030"],
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max:
          Math.max(...seriesData.flatMap((series) => series.data)) < 5
            ? 5
            : Math.max(...seriesData.flatMap((series) => series.data)),
      },
      xaxis: {
        categories: value?.month?.map((res) => res?.split("-")),
        tickAmount: 12,
        // max: 12,
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },

      responsive: [
        {
          breakpoint: 3000,
          options: {
            chart: { height: 210 },
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
            chart: { height: 210 },
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
            chart: { height: 205 },
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
            chart: {},
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
            chart: { width: "690px" },
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
            chart: { width: "300px" },
            legend: {
              show: true,
              position: "bottom",
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
        value.length == 0 ? (
          <p className="shortlisted-competitors-chart-text">
            If You Want To See The Graph You Have To Select One Year Date
          </p>
        ) : (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        )
      ) : dataState.checked === true ? (
        <>
          <ReactApexChart
            className="apexchartsCaxisLabel"
            options={state.options}
            series={state.series}
            type="line"
          />
        </>
      ) : (
        <>
          <ReactApexChart
            className="apexchartsCaxisLabel"
            options={state.options}
            series={state.series}
            type="bar"
          />
        </>
      )}
    </>
  );
}
