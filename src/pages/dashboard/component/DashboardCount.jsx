import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { dashboardService } from "../../../_services/dashboardService";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import MapIconFirst from "../../../assets/images/map-icon.png";
import MapIconSecond from "../../../assets/images/map-icon02.png";
import MapIconThree from "../../../assets/images/map-icon03.png";
import MapIconFour from "../../../assets/images/map-icon04.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedListing,
  setResultListingModel,
} from "../../../redux/slice";
import CountCard from "../../../common/countCards";
import { valueConvert } from "../../../_helpers/valueConvert";

const DashboardCount = () => {
  const dispatch = useDispatch();
  const dashboardListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const [dashboardCount, setDashboardCount] = useState({});
  const [loader, setLoader] = useState(false);
  const [tenderForm, setTenderForm] = useState({ ...dashboardListing });

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
    if (
      localStorage.getItem("dashboardStatics") !== undefined &&
      localStorage.getItem("dashboardStatics") !== null
    ) {
      isDateSelected
        ? getDashboardStatics({
            from_date: selectedFromDate,
            to_date: selectedToDate,
            bidder_name: localStorage.getItem("user_name"),
            is_publication_date_change: true,
          })
        : setDashboardCount(
            JSON.parse(localStorage.getItem("dashboardStatics"))
          );
    } else {
      getDashboardStatics({
        from_date: selectedFromDate,
        to_date: selectedToDate,
        bidder_name: localStorage.getItem("user_name"),
        is_publication_date_change: false,
      });
    }
  }, [selectedFromDate, selectedToDate]);

  const getDashboardStatics = async (value) => {
    setLoader(true);
    const res = await dashboardService.dashboardStatistics(value);
    if (res.Success && res.TotalRecord > 0) {
      setDashboardCount(res.Data[0]);
      localStorage.setItem("dashboardStatics", JSON.stringify(res.Data[0]));
      setLoader(false);
    } else {
      setDashboardCount({});
      setLoader(true);
    }
  };

  const handleMyParticipated = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: localStorage.getItem("user_name"),
          tender_status: 7,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleTenderValue = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setResultListingModel({
          ...tenderForm,
          bidder_name: "",
          tender_status: 0,
        })
      );
      window.open(
        `/dashboard/tender-result?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };
  const handleRTBTenderValue = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setResultListingModel({
          ...tenderForm,
          bidder_name: "",
          tender_status: 2,
        })
      );
      window.open(
        `/dashboard/tender-result?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleMyAwardedValue = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: localStorage.getItem("user_name"),
          tender_status: 6,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleResultTBA = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: localStorage.getItem("user_name"),
          tender_status: 2,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const redirectCompetitor = () => {
    window.open(`/dashboard/competitors`);
  };

  return (
    <div className="dashboard-box-area">
      <div className="row">
        <div className="col-6">
          <CountCard
            handleClickEvent={handleMyParticipated}
            tenderClickEvent={handleTenderValue}
            loader={loader}
            resultValue={`${valueConvert(dashboardCount?.result_count)}`}
            bidderCount={valueConvert(
              dashboardCount?.participated_bidder_count
            )}
            heading="Result Published"
            subHeading="Company's Particiapted Results"
            mapIcon={MapIconFirst}
          />
        </div>
        <div className="col-6">
          <CountCard
            handleClickEvent={redirectCompetitor}
            loader={loader}
            bidderCount={valueConvert(dashboardCount?.total_competitor)}
            heading="Competitors"
            subHeading="Company Competitors"
            mapIcon={MapIconSecond}
          />
        </div>
        <div className="col-6">
          <CountCard
            handleClickEvent={handleMyAwardedValue}
            tenderClickEvent={handleTenderValue}
            loader={loader}
            resultValue={`₹ ${valueConvert(
              dashboardCount?.total_contract_value
            )}`}
            bidderCount={`₹ ${valueConvert(
              dashboardCount?.participated_contract_value
            )}`}
            heading="Awarded Contracts"
            subHeading="Company's Contract"
            mapIcon={MapIconThree}
          />
        </div>
        <div className="col-6">
          <CountCard
            handleClickEvent={handleResultTBA}
            tenderClickEvent={handleRTBTenderValue}
            loader={loader}
            bidderCount={valueConvert(dashboardCount?.to_be_awarded_user)}
            resultValue={valueConvert(dashboardCount?.to_be_awarded)}
            heading="Result TBA"
            subHeading="Company Result"
            mapIcon={MapIconFour}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCount;
