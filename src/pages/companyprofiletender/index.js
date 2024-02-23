import * as React from "react";
import "../../assets/style/BS5_Grid.css";
import "../../assets/style/style.css";
import { Container, Grid } from "@mui/material";
import { useSettingsContext } from "../../components/settings/SettingsContext";
import { useState } from "react";
import { useEffect } from "react";
import ParticipatedTenders from "./components/ParticipatedTenders";
import AwardedTenders from "./components/AwardedTenders";
import LostResult from "./components/LostTenders";
import ResultAnnounced from "./components/ResultAnnounced";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { useSelector } from "react-redux";
import Filters from "../../common/filters";
import Tags from "../../common/filterChips";
import TabArea from "../../common/listing-tab-area/TabArea";
import { dateConvert } from "../../_helpers/date-format";

export default function CompanyProfileListing() {
  const { themeStretch } = useSettingsContext();
  const initialListing = useSelector(
    (state) => state.listing_model.selectedListing
  );

  const sessionData = sessionStorage.getItem("bidModel");
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = React.useContext(selectedDateRange);

  const [publicationDateFrom, setPublicationDateFrom] =
    useState(selectedFromDate);
  const [publicationDateTo, setPublicationDateTo] = useState(selectedToDate);
  const [tenderForm, setTenderForm] = useState(
    sessionData === null
      ? {
          ...initialListing,
          keyword_ids:
            initialListing.keyword_ids !== undefined &&
            initialListing.keyword_ids !== null &&
            Object.keys(initialListing.keyword_ids).length > 0
              ? initialListing.keyword_ids.keyword_id
              : 0,
          product_id:
            initialListing.keyword_ids !== undefined &&
            initialListing.keyword_ids !== null &&
            Object.keys(initialListing.keyword_ids).length > 0
              ? initialListing.keyword_ids.product_id
              : 0,
          search_by:
            initialListing.keyword_ids !== undefined &&
            initialListing.keyword_ids !== null &&
            Object.keys(initialListing.keyword_ids).length > 0
              ? 1
              : 0,
        }
      : JSON.parse(sessionData)
  );
  const [page, setPage] = useState(1);
  const [dataFound, setDataFound] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [value, setValue] = React.useState(
    tenderForm !== null
      ? tenderForm.tender_status == "7"
        ? "1"
        : tenderForm.tender_status == "6"
        ? "2"
        : tenderForm.tender_status == "1"
        ? "3"
        : tenderForm.tender_status == "2"
        ? "4"
        : "1"
      : "1"
  );

  const [bidderName, setBidderName] = useState(
    tenderForm.bidder_name !== undefined &&
      tenderForm.bidder_name !== null &&
      tenderForm.bidder_name !== ""
      ? tenderForm.bidder_name
      : localStorage.getItem("user_name ")
  );

  const [allTags, setAllTags] = useState([]);
  const [stateTag, setStateTag] = useState(
    initialListing.state_ids !== undefined &&
      initialListing.state_ids.length > 0
      ? initialListing.state_ids.map((res) => ({
          ...res,
          title: res.state_name,
          type: "State",
        }))
      : []
  );
  const [cityTag, setCityTag] = useState([]);
  const [wordSearch, setWordSearch] = useState(
    initialListing.search_text !== undefined &&
      initialListing.search_text !== null &&
      initialListing.search_text.length > 0
      ? initialListing.search_text
      : ""
  );
  const [tenderOwnershipTag, setTenderOwnershipTag] = useState(
    initialListing.organization_type_name !== undefined &&
      initialListing.organization_type_name.length > 0
      ? initialListing.organization_type_name.map((res) => ({
          ...res,
          title: res.organization_type_name,
          type: "Tendering Ownership",
        }))
      : []
  );

  const [departmentTag, setDepartmentTag] = useState(
    initialListing.organization_id !== undefined &&
      initialListing.organization_id !== null &&
      Object.keys(initialListing.organization_id).length > 0
      ? {
          ...initialListing.organization_id,
          title: initialListing.organization_id.organization_name,
          type: "Department",
        }
      : null
  );

  const [awardedValue, setAwardedValue] = useState("");
  const [tenderStageTag, setTenderStageTag] = useState(
    initialListing.stage !== undefined &&
      initialListing.stage !== null &&
      initialListing.stage.length > 0
      ? initialListing.stage[0]
      : null
  );

  const [fromDate, setFromDate] = useState(
    tenderForm.contract_date_from !== undefined &&
      tenderForm.contract_date_from.length > 0
      ? tenderForm.contract_date_from
      : ""
  );

  const [toDate, setToDate] = useState(
    tenderForm.contract_date_to !== undefined &&
      tenderForm.contract_date_to.length > 0
      ? tenderForm.contract_date_to
      : ""
  );

  const [valueType, setValueType] = useState(
    tenderForm.tender_value_from > 0 ? "Tender Value" : ""
  );
  const [tenderValueOperator, setTenderValueOperator] = useState(
    tenderForm.tender_value_operator > 0 ? tenderForm.tender_value_operator : 2
  );
  const [fromValue, setFromValue] = useState(
    tenderForm.tender_value_from > 0 ? tenderForm.tender_value_from : 0
  );
  const [toValue, setToValue] = useState(
    tenderForm.tender_value_operator === 4 && tenderForm.tender_value_to > 0
      ? tenderForm.tender_value_to
      : 0
  );
  const [keywordTags, setKeyWordTags] = useState(
    initialListing.keyword_ids !== undefined &&
      initialListing.keyword_ids !== "" &&
      Object.keys(initialListing.keyword_ids).length > 0
      ? {
          ...initialListing.keyword_ids,
          type: "Select Category",
          title: initialListing.keyword_ids.keyword_name,
        }
      : null
  );
  const [participantName, setParticipantName] = useState(
    initialListing.participant_name !== undefined &&
      initialListing.participant_name !== null &&
      initialListing.participant_name.length > 0
      ? { title: initialListing.participant_name, type: "Participated Bidders" }
      : null
  );
  const [winnerBidderName, setWinnerBidderName] = useState(null);
  const [refrenceId, setRefrenceId] = useState("");
  const [isSplitWord, setIsSplitWord] = React.useState(false);
  const [subIndustryTag, setSubIndustryTag] = useState(
    initialListing.sub_industry_id !== undefined &&
      initialListing.sub_industry_id !== null &&
      Object.keys(initialListing.sub_industry_id).length > 0
      ? {
          ...initialListing.sub_industry_id,
          title: initialListing.sub_industry_id.sub_industry_name,
          type: "SubIndustry",
        }
      : null
  );
  const [isSearchBy, setIsSearchBy] = React.useState(false);
  const [websiteType, setWebsiteType] = useState("All");

  const companyProfileResultTabChange = (newValue) => {
    setValue(newValue);
    setPage(1);
    setIsSplitWord(false);
    setDataFound(true);
    setIsSearchBy(false);

    if (newValue !== 0 && newValue === "1") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 7,
      }));
    } else if (newValue !== 0 && newValue === "2") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 6,
      }));
    } else if (newValue !== 0 && newValue === "3") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 1,
      }));
    } else if (newValue !== 0 && newValue === "4") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 2,
      }));
    }
  };

  useEffect(() => {
    if (sessionData === null) {
      sessionStorage.setItem("bidModel", JSON.stringify(tenderForm));
    }
    setTenderForm((prev) => ({
      ...prev,
      sort_by: 3,
      sort_type: 2,
      state_ids:
        initialListing.state_ids !== undefined &&
        initialListing.state_ids !== null &&
        initialListing.state_ids.length > 0
          ? initialListing.state_ids.map((res) => res.state_id).join(",")
          : "",
      organization_type_name:
        initialListing.organization_type_name !== undefined &&
        initialListing.organization_type_name !== null &&
        initialListing.organization_type_name.length > 0
          ? initialListing.organization_type_name
              .map((res) => res.organization_type_id)
              .join(",")
          : "",
      stage:
        initialListing.stage !== undefined &&
        initialListing.stage !== null &&
        initialListing.stage.length > 0
          ? initialListing.stage.map((res) => res.stage_id).join(",")
          : "",
      sub_industry_id:
        initialListing.sub_industry_id !== undefined &&
        initialListing.sub_industry_id !== null &&
        initialListing.sub_industry_id?.sub_industry_id > 0
          ? initialListing.sub_industry_id.sub_industry_id
          : 0,
      organization_id:
        initialListing.organization_id !== undefined &&
        initialListing.organization_id !== null &&
        initialListing.organization_id?.organization_id > 0
          ? initialListing.organization_id.organization_id
          : 0,
      search_by_split_word: false,
      search_by: 0,
    }));
    setAllTags([
      wordSearch
        ? {
            wordSearch: wordSearch,
            type: "Word Search",
            title: wordSearch,
          }
        : null,
      ...stateTag,
      ...cityTag,
      ...tenderOwnershipTag,
      departmentTag,
      participantName,
      winnerBidderName,
      tenderStageTag
        ? { ...tenderStageTag, type: "Stage", title: tenderStageTag.stage }
        : null,
      keywordTags
        ? {
            ...keywordTags,
            type: "Select Category",
            title: keywordTags.keyword_name,
          }
        : null,
      subIndustryTag,
      valueType
        ? {
            valueType: valueType,
            type: "Value Type",
            title: valueType,
          }
        : null,
      fromValue
        ? {
            fromValue: fromValue,
            type: "From Value",
            title: fromValue,
          }
        : null,
      toValue
        ? {
            toValue: toValue,
            type: "To Value",
            title: toValue,
          }
        : null,

      toDate && fromDate
        ? {
            type: "Date",
            title: dateConvert(fromDate) + " → " + dateConvert(toDate),
          }
        : null,
      refrenceId
        ? {
            refrenceId: refrenceId,
            type: "Refrence Id",
            title: refrenceId,
          }
        : null,
    ]);
  }, []);

  React.useEffect(() => {
    setDataFound(false);
    setPublicationDateFrom(selectedFromDate);
    setPublicationDateTo(selectedToDate);
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    if (isDateSelected) {
      setPage(1);
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: publicationDateFrom,
        publication_date_to: publicationDateTo,
      }));
      setDataFound(true);
      setIsDateSelected(false);
    } else {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
      setDataFound(true);
    }
  }, [publicationDateFrom, publicationDateTo]);

  useEffect(() => {
    if (isDateSelected) {
      setPage(1);
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: publicationDateFrom,
        publication_date_to: publicationDateTo,
      }));
      setDataFound(true);
      setIsDateSelected(false);
    } else {
      setTenderForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
      setDataFound(true);
    }
  }, [publicationDateFrom, publicationDateTo]);

  useEffect(() => {
    if (isFilter) {
      setDataFound(true);
      setIsFilter(false);
    }
  }, [isFilter]);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Filters
            setAllTags={setAllTags}
            tenderForm={tenderForm}
            setTenderForm={setTenderForm}
            setDataFound={setDataFound}
            setIsFilter={setIsFilter}
            winnerBidderName={winnerBidderName}
            setWinnerBidderName={setWinnerBidderName}
            participantName={participantName}
            setParticipantName={setParticipantName}
            stateTag={stateTag}
            setStateTag={setStateTag}
            cityTag={cityTag}
            setCityTag={setCityTag}
            wordSearch={wordSearch}
            setWordSearch={setWordSearch}
            tenderOwnershipTag={tenderOwnershipTag}
            setTenderOwnershipTag={setTenderOwnershipTag}
            departmentTag={departmentTag}
            setDepartmentTag={setDepartmentTag}
            awardedValue={awardedValue}
            setAwardedValue={setAwardedValue}
            tenderStageTag={tenderStageTag}
            setTenderStageTag={setTenderStageTag}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            valueType={valueType}
            setValueType={setValueType}
            tenderValueOperator={tenderValueOperator}
            setTenderValueOperator={setTenderValueOperator}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            setToValue={setToValue}
            keywordTags={keywordTags}
            setKeyWordTags={setKeyWordTags}
            refrenceId={refrenceId}
            setRefrenceId={setRefrenceId}
            setPage={setPage}
            setIsSplitWord={setIsSplitWord}
            subIndustryTag={subIndustryTag}
            setSubIndustryTag={setSubIndustryTag}
            setIsSearchBy={setIsSearchBy}
            websiteType={websiteType}
            setWebsiteType={setWebsiteType}
          />

          <Tags
            allTags={allTags}
            setAllTags={setAllTags}
            setTenderForm={setTenderForm}
            setWinnerBidderName={setWinnerBidderName}
            setParticipantName={setParticipantName}
            stateTag={stateTag}
            setStateTag={setStateTag}
            cityTag={cityTag}
            setCityTag={setCityTag}
            setWordSearch={setWordSearch}
            tenderOwnershipTag={tenderOwnershipTag}
            setTenderOwnershipTag={setTenderOwnershipTag}
            departmentTag={departmentTag}
            setDepartmentTag={setDepartmentTag}
            setTenderStageTag={setTenderStageTag}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setValueType={setValueType}
            setTenderValueOperator={setTenderValueOperator}
            fromValue={fromValue}
            setFromValue={setFromValue}
            toValue={toValue}
            setToValue={setToValue}
            setKeyWordTags={setKeyWordTags}
            setRefrenceId={setRefrenceId}
            setIsFilter={setIsFilter}
            setDataFound={setDataFound}
            setIsSplitWord={setIsSplitWord}
            setPage={setPage}
            setSubIndustryTag={setSubIndustryTag}
            setIsSearchBy={setIsSearchBy}
            setWebsiteType={setWebsiteType}
          />

          <div className="company-profile-title-area">
            <div className="row">
              <div className="col-8">
                <h2>{bidderName}</h2>
              </div>
            </div>
          </div>
          <TabArea
            value={value}
            setValue={setValue}
            setDataFound={setDataFound}
            dataFound={dataFound}
            FirstTabResults={ParticipatedTenders}
            SecondTabResults={AwardedTenders}
            ThirdTabResults={LostResult}
            FourthTabResults={ResultAnnounced}
            tenderForm={tenderForm}
            setTenderForm={setTenderForm}
            setIsFilter={setIsFilter}
            firstTabName={"Participated Tenders"}
            secondTabName={"Awarded Tenders"}
            thirdTabName={"Lost Tenders"}
            fourthTabName={"Result TBA"}
            page={page}
            setPage={setPage}
            isSplitWord={isSplitWord}
            setIsSplitWord={setIsSplitWord}
            isSearchBy={isSearchBy}
            setIsSearchBy={setIsSearchBy}
            pageName={"companyProfileListing"}
            companyProfileResultTabChange={companyProfileResultTabChange}
          />
        </Grid>
      </Container>
    </>
  );
}
