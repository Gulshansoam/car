import * as React from "react";
import "../../assets/style/BS5_Grid.css";
import "../../assets/style/style.css";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useSettingsContext } from "../../components/settings/SettingsContext";
import FreshResult from "../tenderResult/component/FreshResult";
import TenderResults from "../tenderResult/component/TenderResults";
import MyResult from "../tenderResult/component/MyResult";
import FavResult from "../tenderResult/component/FavResult";
import { useState } from "react";
import { useEffect } from "react";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { setResultListingModel } from "../../redux/slice";
import Filters from "../../common/filters";
import Tags from "../../common/filterChips";
import TabArea from "../../common/listing-tab-area/TabArea";

export default function ListingPageIndex() {
  const dispatch = useDispatch();
  const initialListing = useSelector((state) =>
    state.listing_model.initialResultListing !== undefined &&
    state.listing_model.initialResultListing !== null
      ? state.listing_model.initialResultListing
      : state.listing_model.initialListing
  );
  const {
    selectedFromDate,
    selectedToDate,
    setIsDateSelected,
    isDateSelected,
  } = useContext(selectedDateRange);

  const { themeStretch } = useSettingsContext();

  const [publicationDateFrom, setPublicationDateFrom] =
    useState(selectedFromDate);
  const [publicationDateTo, setPublicationDateTo] = useState(selectedToDate);
  const [value, setValue] = React.useState(
    initialListing !== null
      ? initialListing.tender_status == "3"
        ? "1"
        : initialListing.tender_status == "0"
        ? "2"
        : initialListing.tender_status == "5"
        ? "3"
        : initialListing.tender_status == "4"
        ? "4"
        : "2"
      : "2"
  );

  const [tenderForm, setTenderForm] = useState({
    ...initialListing,
    tender_status:
      initialListing.tender_status !== undefined &&
      initialListing.tender_status !== null
        ? initialListing.tender_status
        : 0,
    stage:
      initialListing.stage !== undefined &&
      initialListing.stage !== null &&
      initialListing.stage.length > 0
        ? initialListing.stage.map((res) => res.stage_id).join(",")
        : "",
  });
  const [dataFound, setDataFound] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [page, setPage] = useState(1);

  //useStates for filters.....
  const [allTags, setAllTags] = useState([]);
  const [participantName, setParticipantName] = useState(null);
  const [winnerBidderName, setWinnerBidderName] = useState(null); //also used for creating tags
  const [stateTag, setStateTag] = useState(
    initialListing.state_ids !== undefined &&
      initialListing.state_ids !== null &&
      initialListing.state_ids.length > 0
      ? initialListing.state_ids.map((res) => ({
          ...res,
          title: res.state_name,
          type: "State",
        }))
      : []
  );
  const [cityTag, setCityTag] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const [tenderOwnershipTag, setTenderOwnershipTag] = useState([]);
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
  const [tenderStageTag, setTenderStageTag] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [valueType, setValueType] = useState("");
  const [tenderValueOperator, setTenderValueOperator] = useState(2);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [keywordTags, setKeyWordTags] = useState(
    initialListing.keyword_ids !== undefined &&
      initialListing.keyword_ids !== null &&
      initialListing.keyword_ids.keyword_name !== undefined &&
      initialListing.keyword_ids.keyword_name !== null &&
      initialListing.keyword_ids.keyword_name.length > 0
      ? {
          ...initialListing.keyword_ids,
          title: initialListing.keyword_ids.keyword_name,
          type: "Select Category",
        }
      : null
  );

  const [refrenceId, setRefrenceId] = useState("");
  const [isSplitWord, setIsSplitWord] = React.useState(false);
  const [subIndustryTag, setSubIndustryTag] = useState(null);
  const [isSearchBy, setIsSearchBy] = React.useState(false);
  const [websiteType, setWebsiteType] = useState("All");

  const tenderResultTabChange = (newValue) => {
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
        tender_status: 3,
      }));
    } else if (newValue !== 0 && newValue === "2") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 0,
      }));
    } else if (newValue !== 0 && newValue === "3") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 5,
      }));
    } else if (newValue !== 0 && newValue === "4") {
      setTenderForm((prev) => ({
        ...prev,
        search_by_split_word: false,
        search_by: 0,
        page_no: 1,
        tender_status: 4,
      }));
    }
  };

  useEffect(() => {
    setDataFound(false);
    setPublicationDateFrom(selectedFromDate);
    setPublicationDateTo(selectedToDate);
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
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

      keyword_ids:
        initialListing.keyword_ids !== undefined &&
        initialListing.keyword_ids !== null &&
        Object.keys(initialListing.keyword_ids).length > 0
          ? initialListing.keyword_ids.keyword_id
          : null,
      stage:
        initialListing.stage !== undefined &&
        initialListing.stage !== null &&
        initialListing.stage.length > 0
          ? initialListing.stage.map((res) => res.stage_id).join(",")
          : "",
      organization_id:
        initialListing.organization_id !== undefined &&
        initialListing.organization_id !== null &&
        initialListing.organization_id?.organization_id > 0
          ? initialListing.organization_id.organization_id
          : 0,
      page_no: 1,
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
      keywordTags,

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
    dispatch(setResultListingModel(null));
  }, []);

  useEffect(() => {
    if (isSplitWord) {
      setTenderForm((prev) => ({
        ...prev,
        page_no: 1,
        search_by_split_word: true,
      }));
    }
  }, [isSplitWord]);

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
      <Helmet>
        <title>Tender Result</title>
      </Helmet>
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

          <div className="tender-result-tab-area">
            <TabArea
              value={value}
              setValue={setValue}
              setDataFound={setDataFound}
              dataFound={dataFound}
              FirstTabResults={FreshResult}
              SecondTabResults={TenderResults}
              ThirdTabResults={MyResult}
              FourthTabResults={FavResult}
              tenderForm={tenderForm}
              setTenderForm={setTenderForm}
              setIsFilter={setIsFilter}
              firstTabName={"Fresh Results"}
              secondTabName={"Tender Results"}
              thirdTabName={"My Results"}
              fourthTabName={"Fav. Results"}
              page={page}
              setPage={setPage}
              isSplitWord={isSplitWord}
              setIsSplitWord={setIsSplitWord}
              isSearchBy={isSearchBy}
              setIsSearchBy={setIsSearchBy}
              pageName={"tenderListing"}
              tenderResultTabChange={tenderResultTabChange}
            />
          </div>
        </Grid>
      </Container>
    </>
  );
}
