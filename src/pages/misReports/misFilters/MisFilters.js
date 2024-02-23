import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Form } from "antd";
2;
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchBar from "../../../common/filterInputs/SearchBar";
import StateSingleSelect from "../../../common/filterInputs/StateSingleSelect";
import Department from "../../../common/filterInputs/Department";
import RangePickerFilter from "../../../common/filterInputs/RangePicker";
import KeyWord from "../../../common/filterInputs/KeyWord";
import CompanyName from "../../../common/filterInputs/CompanyName";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import Product from "../../../common/filterInputs/Product";
import TenderOwnershipSingleSelect from "../../../common/filterInputs/TenderOwnershipSingleSelect";
import { dateConvert } from "../../../_helpers/date-format";
import SubIndustry from "../../../common/filterInputs/SubIndustry";

const MisFilters = (props) => {
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const theme = useTheme();
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const {
    setIsMisReportGenrate,
    wordSearch,
    setWordSearch,
    stateTag,
    setStateTag,
    tenderOwnershipTag,
    setTenderOwnershipTag,
    departmentTag,
    setDepartmentTag,
    setFromDate,
    setToDate,
    toDate,
    fromDate,
    keywordTags,
    setKeyWordTags,
    productTags,
    setProductTags,
    bidderName,
    setBidderName,
    setMisReportForm,
    setAllTags,
    subIndustryTag,
    setSubIndustryTag,
  } = props;

  const handleSubmit = () => {
    if (
      wordSearch.length > 0 ||
      (fromDate.length > 0 && toDate.length > 0) ||
      (stateTag !== undefined &&
        stateTag !== null &&
        Object.keys(stateTag).length > 0) ||
      (tenderOwnershipTag !== undefined &&
        tenderOwnershipTag !== null &&
        Object.keys(tenderOwnershipTag).length > 0) ||
      (productTags !== undefined &&
        productTags !== null &&
        Object.keys(productTags).length > 0) ||
      (keywordTags !== undefined &&
        keywordTags !== null &&
        Object.keys(keywordTags).length > 0) ||
      (departmentTag !== undefined &&
        departmentTag !== null &&
        Object.keys(departmentTag).length > 0) ||
      (bidderName !== undefined &&
        bidderName !== null &&
        Object.keys(bidderName).length > 0) ||
      (subIndustryTag !== undefined &&
        subIndustryTag !== null &&
        Object.keys(subIndustryTag).length > 0)
    ) {
      setAllTags([
        wordSearch
          ? {
              wordSearch: wordSearch,
              type: "Word Search",
              title: wordSearch,
            }
          : null,
        stateTag,
        tenderOwnershipTag,
        productTags,
        departmentTag,
        keywordTags,
        bidderName,
        subIndustryTag
          ? {
              ...subIndustryTag,
              type: "SubIndustry",
              title: subIndustryTag.sub_industry_name,
            }
          : null,
        toDate && fromDate
          ? {
              type: "Date",
              title: dateConvert(fromDate) + " → " + dateConvert(toDate),
            }
          : null,
      ]);

      setMisReportForm((prev) => ({
        ...prev,
        page_no: 1,
        record_per_page: 5,
        publication_date_from:
          fromDate !== undefined && fromDate !== null && fromDate.length > 0
            ? fromDate.toString()
            : selectedFromDate,
        publication_date_to:
          toDate !== undefined && toDate !== null && toDate.length > 0
            ? toDate.toString()
            : selectedToDate,
        search_text:
          wordSearch !== undefined &&
          wordSearch !== null &&
          wordSearch.length > 0
            ? wordSearch
            : "",
        state_id:
          stateTag !== undefined &&
          stateTag !== null &&
          Object.keys(stateTag).length > 0
            ? stateTag.state_id
            : 0,
        keyword_id:
          keywordTags !== undefined &&
          keywordTags !== null &&
          Object.keys(keywordTags).length > 0
            ? keywordTags.keyword_id
            : 0,
        organization_type_id:
          tenderOwnershipTag !== undefined &&
          tenderOwnershipTag !== null &&
          Object.keys(tenderOwnershipTag).length > 0
            ? tenderOwnershipTag.organization_type_id
            : 0,
        product_id:
          productTags !== undefined &&
          productTags !== null &&
          Object.keys(productTags).length > 0
            ? productTags.product_id
            : 0,
        // organization_name:
        //   departmentTag !== undefined &&
        //   departmentTag !== null &&
        //   Object.keys(departmentTag).length > 0
        //     ? departmentTag.organization_name
        //     : "",
        organization_id:
          departmentTag !== undefined &&
          departmentTag !== null &&
          Object.keys(departmentTag).length > 0
            ? departmentTag.organization_id
            : 0,
        bidder_name:
          bidderName !== undefined &&
          bidderName !== null &&
          Object.keys(bidderName).length > 0
            ? bidderName.bidder_name
            : "",
        sub_industry_id:
          subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
            ? subIndustryTag.sub_industry_id
            : 0,
      }));
      setIsMisReportGenrate(true);
    } else {
      alert("Please Select Valid Filter for Generating Mis Reports");
    }
  };

  const handleClear = () => {
    setIsMisReportGenrate(false);
    setWordSearch("");
    setStateTag(null);
    setTenderOwnershipTag(null);
    setDepartmentTag(null);
    setKeyWordTags(null);
    setProductTags(null);
    setBidderName(null);
    setSubIndustryTag(null);
    setFromDate("");
    setToDate("");
    formRef.current?.resetFields();
  };

  return (
    <Accordion className="filter-accordion" defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>MIS Reports Search</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="filter-form">
            <div className="filter-first">
              <div className="row">
                <div className="span2 offset1">
                  <div className="search-by-area">
                    <form>
                      <SearchBar
                        wordSearch={wordSearch}
                        setWordSearch={setWordSearch}
                      />
                      <StateSingleSelect
                        setStateTag={setStateTag}
                        stateTag={stateTag}
                      />
                      <KeyWord
                        keywordTags={keywordTags}
                        setKeyWordTags={setKeyWordTags}
                      />
                      <TenderOwnershipSingleSelect
                        tenderOwnershipTag={tenderOwnershipTag}
                        setTenderOwnershipTag={setTenderOwnershipTag}
                      />
                      <Department
                        fromMisPage={true}
                        tenderOwnershipTag={tenderOwnershipTag}
                        departmentTag={departmentTag}
                        setDepartmentTag={setDepartmentTag}
                      />
                      <Product
                        productTags={productTags}
                        setProductTags={setProductTags}
                      />
                      <CompanyName
                        companyName={bidderName}
                        setCompanyName={setBidderName}
                        titleLabel={"Participated Bidders"}
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
                      <SubIndustry
                        subIndustryTag={subIndustryTag}
                        setSubIndustryTag={setSubIndustryTag}
                      />
                      <div className="four-row four-row-mis-reports">
                        <div className="fiv-row-mis-reports">
                          <a
                            onClick={handleSubmit}
                            style={{
                              backgroundColor: theme.palette.primary.darker,
                              color: theme.palette.common.white,
                            }}
                          >
                            Generate MIS
                          </a>
                          <a
                            onClick={handleClear}
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default MisFilters;
