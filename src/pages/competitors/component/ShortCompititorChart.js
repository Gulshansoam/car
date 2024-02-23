import { Skeleton } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

import { compititorServices } from "../../../_services/compititorService";
import { useEffect } from "react";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";

const ShortCompititorChart = ({
  // shortlistedCompititor,
  // setShortlistedCompititor,
  value,
  setValue,
  shortListBidderInfo,
  setShortListBidderInfo,
  shortListDataState,
  setShortListDataState,

  secondShortListLoader,
  setShortListSecondLoader,
  checkMainData,
  setCheckMainData,
  isDelete,
  setIsDelete,
  handleChange,
  // competitorForm,
}) => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);

  /* ******************** graph data ******************** */

  const getShortListCompititorGraphData = () => {
    setShortListSecondLoader(true);

    compititorServices
      .getShortlistCompetitorsListChartMonthWise({
        from_date: selectedFromDate,
        to_date: selectedToDate,
      })
      .then((res) => {
        setShortListDataState({ checked: true });
        if (res.Success && res.Data !== null) {
          setShortListSecondLoader(false);
          setCheckMainData(false);
          setIsDelete(false);
          setValue(res.Data);
          setShortListBidderInfo(res.Data.bidderInfo);
        } else {
          setShortListSecondLoader(true);
          setValue([]);
        }
      })
      .catch((err) => {
        console.log("Dashboard tender State vise" + err);
      });
  };

  useEffect(() => {
    getShortListCompititorGraphData();
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  useEffect(() => {
    if (checkMainData === true || isDelete === true) {
      getShortListCompititorGraphData();
    }
  }, [isDelete, checkMainData]);

  const seriesData = shortListBidderInfo?.map((res) => {
    const arr = [];
    for (let i = 0; i < value?.month?.length; i++) {
      const data = res?.biddertDetail?.filter((res1) => {
        return (
          res1.month.toLowerCase() ==
          value?.month[i].split("-")[0].toLowerCase()
        );
      });
      if (data?.length > 0) {
        arr.push(data?.map((res) => res.participated_tenders));
      } else {
        arr.push(0);
      }
    }

    return {
      name: res?.bidderName,
      data: arr.flat(),
    };
  });

  const state = {
    series: seriesData,
    options: {
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
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: value?.month?.map((res) => res?.split("-")),
        labels: {
          style: {
            fontSize: "9px",
          },
        },
      },
      responsive: [
        {
          breakpoint: 2360,
          options: {
            chart: { width: "100%", height: 200 },
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
            chart: { height: 200 },
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
            chart: { height: 200 },
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
      {secondShortListLoader === true ? (
        value.length === 0 ? (
          <p className="shortlisted-competitors-chart-text">
            If You Want To See The Graph You Have To Select One Year Date
          </p>
        ) : (
          <>
            <Skeleton animation="wave" width={"100%"} />{" "}
            <Skeleton animation="wave" width={"100%"} />
          </>
        )
      ) : shortListDataState?.checked === true ? (
        <ReactApexChart
          className="apexchartsCaxisLabel"
          options={state.options}
          series={state.series}
          type="line"
          // height={203}
        />
      ) : (
        <ReactApexChart
          className="apexchartsCaxisLabel"
          options={state.options}
          series={state.series}
          type="bar"
          // height={203}
        />
      )}
    </>
  );
};

export default ShortCompititorChart;
