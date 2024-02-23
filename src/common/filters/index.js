import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { alpha } from "@mui/material/styles";
import StateFilter from "../filterInputs/StateFilter";
import CityFilter from "../filterInputs/CityFilter";
import Department from "../filterInputs/Department";
import TenderOwnership from "../filterInputs/TenderOwnership";
import TenderStage from "../filterInputs/TenderStage";
import SearchBar from "../filterInputs/SearchBar";
import RangePickerFilter from "../filterInputs/RangePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ValueTypes from "../filterInputs/ValueTypes";
import { Form } from "antd";
import KeyWord from "../filterInputs/KeyWord";
import { IsNumeric } from "../../_helpers/checkIsNumberOrText";
import RefrenceId from "../filterInputs/RefrenceId";
import ResultValue from "../filterInputs/ResultValue";
import CompanyName from "../filterInputs/CompanyName";
import { dateConvert } from "../../_helpers/date-format";
import SubIndustry from "../filterInputs/SubIndustry";
import WebSiteType from "../filterInputs/WebsiteType";

function Filters(props) {
  const {
    setAllTags,
    setTenderForm,
    setDataFound,
    setIsFilter,
    tenderForm,
    wordSearch,
    setWordSearch,
    setStateTag,
    stateTag,
    cityTag,
    setCityTag,
    tenderOwnershipTag,
    setTenderOwnershipTag,
    departmentTag,
    setDepartmentTag,
    valueType,
    setValueType,
    tenderValueOperator,
    setTenderValueOperator,
    fromValue,
    setFromValue,
    toValue,
    setToValue,
    participantName,
    setParticipantName,
    winnerBidderName,
    setWinnerBidderName,
    tenderStageTag,
    setTenderStageTag,
    toDate,
    fromDate,
    setFromDate,
    setToDate,
    keywordTags,
    setKeyWordTags,
    setRefrenceId,
    refrenceId,
    setPage,
    setIsSplitWord,
    subIndustryTag,
    setSubIndustryTag,
    setIsSearchBy,
    websiteType,
    setWebsiteType,
  } = props;

  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const theme = useTheme();

  const handleSubmit = () => {
    setPage(1);
    setIsSplitWord(false);
    setIsSearchBy(false);
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
      subIndustryTag
        ? {
            ...subIndustryTag,
            type: "SubIndustry",
            title: subIndustryTag.sub_industry_name,
          }
        : null,

      websiteType && (websiteType === "Non-GeM" || websiteType === "GeM")
        ? {
            websiteType: websiteType,
            type: "WebSite",
            title: websiteType,
          }
        : null,
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
    setTenderForm((prev) => ({
      ...prev,
      page_no: 1,
      search_text:
        wordSearch !== undefined && wordSearch !== null && wordSearch.length > 0
          ? IsNumeric(wordSearch.trim())
            ? ""
            : wordSearch.trim().split("-").join(" ").toLowerCase()
          : "",
      search_by_split_word: false,
      result_id:
        wordSearch !== undefined && wordSearch !== null && wordSearch.length > 0
          ? IsNumeric(wordSearch.trim())
            ? parseInt(wordSearch.trim())
            : 0
          : 0,
      contract_date_from: fromDate.toString(),
      contract_date_to: toDate.toString(),
      state_ids:
        stateTag !== undefined
          ? stateTag.map((res) => res.state_id).join(",")
          : "",
      city_ids:
        cityTag !== undefined
          ? cityTag.map((res) => res.city_id).join(",")
          : "",
      search_by: keywordTags !== null && [keywordTags].length > 0 ? 1 : 0,
      keyword_ids: keywordTags !== null ? keywordTags.keyword_id : 0,
      product_id: keywordTags !== null ? keywordTags.product_id : 0,
      organization_id:
        departmentTag !== null ? departmentTag.organization_id : 0,

      organization_type_name: tenderOwnershipTag
        .map((res) => res.organization_type_id)
        .join(","),
      tender_value_operator:
        valueType !== undefined
          ? valueType === "Tender Value"
            ? tenderValueOperator
            : 0
          : 0,
      contract_value_operator:
        valueType !== undefined
          ? valueType === "Contract Value"
            ? tenderValueOperator
            : 0
          : 0,
      contract_value_from:
        valueType !== undefined
          ? valueType === "Contract Value"
            ? fromValue
            : 0
          : 0,
      contract_value_to:
        valueType !== undefined
          ? valueType === "Contract Value"
            ? toValue
            : 0
          : 0,
      tender_value_from:
        valueType !== undefined
          ? valueType === "Tender Value"
            ? fromValue
            : 0
          : 0,
      tender_value_to:
        valueType !== undefined
          ? valueType === "Tender Value"
            ? tenderValueOperator === 4
              ? toValue
              : 0
            : 0
          : 0,
      participant_name:
        participantName !== null ? participantName.bidder_name : "",
      winner_bidder:
        winnerBidderName !== null ? winnerBidderName.bidder_name : "",
      stage:
        tenderStageTag !== undefined
          ? tenderStageTag?.stage_id?.toString()
          : "",

      record_per_page: 20,
      tender_number: refrenceId.length > 0 ? refrenceId : "",

      sub_industry_id:
        subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
          ? subIndustryTag.sub_industry_id
          : 0,

      name_of_website:
        websiteType === "All"
          ? 1
          : websiteType === "GeM"
          ? 2
          : websiteType === "Non-GeM"
          ? 3
          : 1,
    }));
    setDataFound(false);
    setIsFilter(true);
  };

  //-------------------------------Clear Button------------------------------//
  const allClear = () => {
    setPage(1);
    setIsSplitWord(false);
    setIsSearchBy(false);
    setStateTag([]);
    setKeyWordTags(null);
    setCityTag([]);
    setDepartmentTag(null);
    setTenderOwnershipTag([]);
    setTenderStageTag(null);
    setFromDate("");
    setToDate("");
    setParticipantName(null);
    setWinnerBidderName(null);
    setTenderValueOperator(2);
    setValueType("");
    setFromValue(0);
    setToValue(0);
    setWordSearch("");
    setRefrenceId("");
    setSubIndustryTag(null);
    setWebsiteType("All");
    setAllTags([]);
    formRef.current?.resetFields();
    setTenderForm((prev) => ({
      ...prev,
      result_id: 0,
      name_of_website: 1,
      search_text: "",
      contract_date_from: "",
      contract_date_to: "",
      state_ids: "",
      city_ids: "",
      keyword_ids: 0,
      organization_id: 0,
      organization_type_name: "",
      tender_value_operator: 0,
      contract_value_operator: 0,
      contract_value_from: 0,
      contract_value_to: 0,
      tender_value_from: 0,
      tender_value_to: 0,
      bidder_name: "",
      participant_name: "",
      winner_bidder: "",
      stage: "",
      sort_by: 3,
      sort_type: 1,
      page_no: 1,
      record_per_page: 20,
      tender_status: 0,
      search_by_split_word: false,
      tender_number: "",
      tab_id: 0,
      product_id: 0,
      search_by: 0,
      sub_industry_id: 0,
    }));

    setDataFound(false);
    setIsFilter(true);
  };

  return (
    <div className="filter-main-area">
      <Accordion className="filter-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="filter-by-area">
              <div className="filter-form">
                <div className="filter-first">
                  <div className="row">
                    <div className="span2 offset1">
                      <div className="search-area">
                        {/* All AutoComplete and Input Fields of filters  */}
                        <form>
                          <SearchBar
                            wordSearch={wordSearch}
                            setWordSearch={setWordSearch}
                          />
                          <StateFilter
                            tenderForm={tenderForm}
                            setStateTag={setStateTag}
                            stateTag={stateTag}
                          />
                          <CityFilter
                            cityTag={cityTag}
                            setCityTag={setCityTag}
                            stateTag={stateTag}
                          />
                          <TenderOwnership
                            tenderOwnershipTag={tenderOwnershipTag}
                            setTenderOwnershipTag={setTenderOwnershipTag}
                          />
                          <Department
                            tenderOwnershipTag={tenderOwnershipTag}
                            departmentTag={departmentTag}
                            setDepartmentTag={setDepartmentTag}
                          />
                          <ValueTypes
                            valueType={valueType}
                            setValueType={setValueType}
                          />
                          <ResultValue
                            valueType={valueType}
                            tenderValueOperator={tenderValueOperator}
                            setTenderValueOperator={setTenderValueOperator}
                            fromValue={fromValue}
                            setFromValue={setFromValue}
                            toValue={toValue}
                            setToValue={setToValue}
                          />
                          <CompanyName
                            companyName={participantName}
                            setCompanyName={setParticipantName}
                            titleLabel={"Participated Bidders"}
                          />
                          <CompanyName
                            companyName={winnerBidderName}
                            setCompanyName={setWinnerBidderName}
                            titleLabel={"Winner Bidder"}
                          />

                          <TenderStage
                            tenderStageTag={tenderStageTag}
                            setTenderStageTag={setTenderStageTag}
                          />

                          <div className="state-area rangepicker-area">
                            <Form form={form} ref={formRef}>
                              <Form.Item name="Closing Date">
                                <RangePickerFilter
                                  setFromDate={setFromDate}
                                  setToDate={setToDate}
                                />
                              </Form.Item>
                            </Form>
                          </div>
                          <KeyWord
                            isProduct={true}
                            keywordTags={keywordTags}
                            setKeyWordTags={setKeyWordTags}
                          />
                          <RefrenceId
                            refrenceId={refrenceId}
                            setRefrenceId={setRefrenceId}
                          />
                          <SubIndustry
                            subIndustryTag={subIndustryTag}
                            setSubIndustryTag={setSubIndustryTag}
                          />
                          <WebSiteType
                            websiteType={websiteType}
                            setWebsiteType={setWebsiteType}
                          />
                          <div className="four-row"></div>
                          <div className="fiv-row">
                            <a
                              onClick={handleSubmit}
                              style={{
                                backgroundColor: theme.palette.primary.darker,
                                color: theme.palette.common.white,
                              }}
                            >
                              Search
                            </a>
                            <a
                              onClick={allClear}
                              style={{
                                color: theme.palette.primary.main,
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  theme.palette.action.selectedOpacity
                                ),
                              }}
                            >
                              Clear
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Filters;
