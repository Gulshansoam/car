import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import noData from "../../../assets/images/not-data-found.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { tenderOwnerShipColor } from "../../../_helpers/tenderOwnershipChart";

const TenderOwnerShipComparisionChart = ({
  companyDetail,
  selectedKeyWord,
  selectedState,
  formData,
  wordSearch,
  subIndustryTag,
}) => {
  const theme = useTheme();
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const dispatch = useDispatch();
  const comparisionListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [tenderForm, setTenderForm] = useState({ ...comparisionListing });
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (isDateSelected) {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
      setIsDateSelected(false);
    } else {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
    }
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    if (click) {
      setClick(false);
      dispatch(
        setSelectedListing({
          ...tenderForm,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  }, [click]);

  const sessionData = sessionStorage.getItem("bidModel");

  const handleClickEvent = (event, chartContext, config, detail, i) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    setTenderForm((prev) => ({
      ...prev,
      bidder_name:
        detail !== undefined &&
        detail !== null &&
        detail.tenderInfo[0]?.bidder_name,
      state_ids:
        selectedState !== undefined && selectedState !== null
          ? [selectedState]
          : "",
      search_text:
        wordSearch !== undefined && wordSearch !== null && wordSearch.length > 0
          ? wordSearch
          : "",
      sub_industry_id:
        subIndustryTag !== undefined &&
        subIndustryTag !== null &&
        [subIndustryTag].length > 0
          ? subIndustryTag
          : 0,
      keyword_ids:
        selectedKeyWord !== undefined && selectedKeyWord !== null
          ? selectedKeyWord
          : "",
      tender_status: 7,
      organization_type_name: [detail.tenderOwnerShip[config.dataPointIndex]],
    }));
    setClick(true);
  };

  return (
    <div className="col-12">
      <div className="row">
        <div className="First-Compare-area">
          <div className="col-12">
            <div className="text-area bg-dark tender-ownership-text">
              Tender Ownership
            </div>
          </div>
        </div>

        {companyDetail !== undefined &&
          companyDetail !== null &&
          companyDetail?.length > 0 && (
            <>
              {companyDetail.map((detail, i) => (
                <div className="Second-Compare-area">
                  <div className="col-12">
                    <div className="text-area text-center big-text bg-dark tender-ownership-text">
                      <div id="chart">
                        {detail?.tenderOwnerShip !== null &&
                        detail?.tenderOwnerShip?.length > 0 ? (
                          <ReactApexChart
                            options={{
                              colors: tenderOwnerShipColor(
                                detail?.tenderOwnerShip
                              ),
                              tooltip: {
                                y: {
                                  formatter: function (value) {
                                    return Math.round(value);
                                  },
                                },
                              },
                              responsive: [
                                {
                                  breakpoint: 1700,
                                  options: {
                                    chart: { width: 300, height: 300 },
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
                                    chart: { width: "300px", height: "300px" },
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
                                    chart: {
                                      width: "300px",
                                      height: "200px",
                                    },
                                    legend: {
                                      show: false,
                                      position: "left",
                                      horizontalAlign: "left",
                                      floating: false,
                                    },
                                  },
                                },
                                {
                                  breakpoint: 767,
                                  options: {
                                    chart: { width: "250px", height: "250px" },
                                    legend: {
                                      show: true,
                                      position: "top",
                                      horizontalAlign: "bottom",
                                      floating: false,
                                    },
                                  },
                                },
                              ],
                              chart: {
                                events: {
                                  dataPointSelection: function (
                                    event,
                                    chartContext,
                                    config
                                  ) {
                                    handleClickEvent(
                                      event,
                                      chartContext,
                                      config,
                                      detail,
                                      i
                                    );
                                  },
                                },
                                type: "pie",
                                toolbar: {
                                  show: false,
                                },
                              },
                              dataLabels: {
                                enabled: true,
                              },
                              labels: detail.tenderOwnerShip.map(
                                (res) => res.organization_type_name
                              ),
                            }}
                            series={detail.tenderOwnerShip.map(
                              (res) => res.participate_result_count
                            )}
                            type="pie"
                          />
                        ) : (
                          <img src={noData}></img>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

export default TenderOwnerShipComparisionChart;
