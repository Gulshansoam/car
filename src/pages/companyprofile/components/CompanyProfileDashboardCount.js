import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { tenderResultService } from "../../../_services/companyprofileservices";
import MapIconFirst from "../../../assets/images/map-icon.png";
import MapIconSecond from "../../../assets/images/map-icon02.png";
import MapIconThree from "../../../assets/images/map-icon03.png";
import MapIconFour from "../../../assets/images/map-icon04.png";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import ProfileCountCard from "../../../common/countCards/profileCountCard";

const CompanyProfileDashboardCount = ({
  profileBidderName,
  setIsParticipated,
}) => {
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
  const [dashboardCount, setDashboardCount] = useState([]);
  const [loader, setLoader] = useState(false);

  const [tenderForm, setTenderForm] = useState({
    ...dashboardListing,
    publication_date_from: selectedFromDate,
    publication_date_to: selectedToDate,
  });

  // useEffect(() => {
  //   if (dashboardCount[0]?.participated_result_count === 0) {
  //     // alert("No Data is Available for Search Company in Selected Date");

  //   } else {
  //     setIsParticipated(true);
  //   }
  // }, [dashboardCount[0]?.participated_result_count]);

  useEffect(() => {
    if (isDateSelected) {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
      setIsDateSelected(false);
    }
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    if (
      profileBidderName !== undefined &&
      profileBidderName !== null &&
      profileBidderName.length > 0
    ) {
      tenderResultService
        .companyProfileDashboardCount({
          from_date: selectedFromDate,
          to_date: selectedToDate,
          bidder_name: profileBidderName,
        })
        .then((res) => {
          if (res.Success === true) {
            setLoader(false);
            setDashboardCount(res.Data);
            if (res.Data[0]?.participated_result_count === 0) {
              setIsParticipated(false);
              alert("No Data is Available for Search Company in Selected Date");
            } else {
              setIsParticipated(true);
            }
          } else {
            setLoader(true);
            setDashboardCount([]);
          }
        })
        .catch((err) => {
          setLoader(true);
          console.log("Dashboard Statisctic Error" + err);
        });
    }
  }, [profileBidderName, selectedFromDate, selectedToDate]);

  const handleMyParticipated = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: profileBidderName,
          tender_status: 7,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
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
          bidder_name: profileBidderName,
          tender_status: 6,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleLostTenders = () => {
    if (
      dashboardListing.bidder_name !== null &&
      dashboardListing.ternder_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: profileBidderName,
          tender_status: 1,
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
          bidder_name: profileBidderName,
          tender_status: 2,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  return (
    <div className="dashboard-box-area">
      <div className="row">
        <div className="col-3">
          <ProfileCountCard
            handleMyParticipated={handleMyParticipated}
            loader={loader}
            resultCount={dashboardCount[0]?.participated_result_count}
            resultValue={dashboardCount[0]?.participated_contract_value}
            mapIcon={MapIconFirst}
            heading={"Participated Tenders"}
          />
        </div>
        <div className="col-3">
          <ProfileCountCard
            handleMyAwardedValue={handleMyAwardedValue}
            loader={loader}
            resultCount={dashboardCount[0]?.awarded_tender}
            resultValue={dashboardCount[0]?.awarded_tender_value}
            mapIcon={MapIconSecond}
            heading={"Awarded Tenders"}
          />
        </div>
        <div className="col-3">
          <ProfileCountCard
            handleLostTenders={handleLostTenders}
            loader={loader}
            resultCount={dashboardCount[0]?.lost_tender}
            resultValue={dashboardCount[0]?.lost_tender_value}
            mapIcon={MapIconFour}
            heading={"Lost Tenders"}
          />
        </div>
        <div className="col-3">
          <ProfileCountCard
            handleResultTBA={handleResultTBA}
            loader={loader}
            resultCount={dashboardCount[0]?.result_to_be_awarded}
            resultValue={dashboardCount[0]?.result_to_be_awarded_value}
            mapIcon={MapIconThree}
            heading={"Result TBA"}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileDashboardCount;
