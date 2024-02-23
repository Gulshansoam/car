import * as React from "react";
import "../../../../assets/style/BS5_Grid.css";
import "../../../../assets/style/style.css";
import ParticipatedTenders from "./components/ParticipatedTenders";
import AwardedTenders from "./components/AwardedTenders";
import LostTenders from "./components/LostTenders";
import ResultAnnounced from "./components/ResultAnnounced";
import { useEffect } from "react";
import { selectedDateRange } from "../../../../layouts/dashboard/header/context-api/Context";
import TabArea from "../../../../common/listing-tab-area/TabArea";
import { useSelector } from "react-redux";

export default function CompanyProfileResults(props) {
  const {
    stateNames,
    organizationType,
    department,
    publicationDateFrom,
    publicationDateTo,
    stage,
    tabName,
    profileBidderName,
  } = props;

  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = React.useContext(selectedDateRange);

  const initialListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [value, setValue] = React.useState(
    tabName === "Awarded Tender" ? "2" : "1"
  );
  const [page, setPage] = React.useState(1);
  const [tenderForm, setTenderForm] = React.useState(initialListing);
  const [dataFound, setDataFound] = React.useState(false);

  useEffect(() => {
    setTenderForm(() => ({
      ...tenderForm,
      page_no: 1,
      record_per_page: 5,
      state_ids:
        stateNames.length > 0
          ? stateNames.map((res) => res.state_id).join(",")
          : "",
      organization_type_name:
        organizationType.length > 0
          ? organizationType.map((res) => res.organization_type_id).join()
          : "",
      organization_id:
        department !== undefined && department !== null
          ? department.organization_id
          : 0,
      contract_date_from:
        publicationDateFrom.length > 0
          ? publicationDateFrom
          : publicationDateFrom,
      contract_date_to:
        publicationDateTo.length > 0 ? publicationDateTo : publicationDateTo,

      bidder_name: profileBidderName,
      stage: stage.length > 0 ? stage.map((res) => res.stage_id).join(",") : "",
    }));
    setDataFound(true);
  }, [
    stateNames,
    organizationType,
    department,
    publicationDateFrom,
    publicationDateTo,
    stage,
    profileBidderName,
  ]);

  React.useEffect(() => {
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
    setValue(tabName === "Awarded Tender" ? "2" : "1");
  }, [tabName]);

  const companyProfileResultTabChange = (newValue) => {
    setValue(newValue);
    setPage(1);
    setDataFound(true);

    if (newValue !== 0 && newValue === "1") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 1,
        page_no: 1,
        tender_status: 7,
      }));
    } else if (newValue !== 0 && newValue === "2") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 1,
        page_no: 1,
        tender_status: 6,
      }));
    } else if (newValue !== 0 && newValue === "3") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 1,
        page_no: 1,
        tender_status: 1,
      }));
    } else if (newValue !== 0 && newValue === "4") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 1,
        page_no: 1,
        tender_status: 2,
      }));
    }
  };

  return (
    <>
      <TabArea
        value={value}
        setValue={setValue}
        setDataFound={setDataFound}
        dataFound={dataFound}
        FirstTabResults={ParticipatedTenders}
        SecondTabResults={AwardedTenders}
        ThirdTabResults={LostTenders}
        FourthTabResults={ResultAnnounced}
        tenderForm={tenderForm}
        setTenderForm={setTenderForm}
        // setIsFilter={setIsFilter}
        firstTabName={"Participated Tenders"}
        secondTabName={"Awarded Tenders"}
        thirdTabName={"Lost Tenders"}
        fourthTabName={"Result TBA"}
        fromPage={"companyProfile"}
        stateNames={stateNames}
        organizationType={organizationType}
        department={department}
        stage={stage}
        setPage={setPage}
        companyProfileResultTabChange={companyProfileResultTabChange}
      />
    </>
  );
}
