import React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Autocomplete, Chip } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { compareCompetitors } from "../../../_services/compareCompetitorsServices";
import { tenderResultFilterService } from "../../../_services/tenderResultFilterServices";
import { DepartmentModel } from "./model/departmentModel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import SearchBar from "../../../common/filterInputs/SearchBar";
import SubIndustry from "../../../common/filterInputs/SubIndustry";
import KeyWord from "../../../common/filterInputs/KeyWord";

const CompititorFilter = (props) => {
  const {
    bidderSearch,
    setBidderSearch,
    stateTags,
    setStateTags,
    keywordTags,
    setKeyWordTags,
    tenderOwnershipTag,
    setTenderOwnershipTag,
    departmentTags,
    setDepartmentTag,
    setCompetitorForm,
    departmentTag,
    departmentName,
    setDepartmentName,
    departmentList,
    setDepartmentList,
    setCompititorReqBody,
    firstCompetitorList,
    setFirstCompetitorList,
    companyInput,
    setCompanyInput,
    keywordInput,
    setKeyWordInput,
    tenderForm,
    setTenderForm,
    tenderValueOperator,
    setTenderValueOperator,
    fromValue,
    setFromValue,
    toValue,
    setToValue,
    wordSearch,
    setWordSearch,
    setGeneralCount,
    subIndustryTag,
    setSubIndustryTag,
  } = props;
  const { selectedFromDate, selectedToDate } = useContext(selectedDateRange);

  // const [firstCompetitorList, setFirstCompetitorList] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  const [ownershipData, setOwnershipData] = useState([]);
  const [departmentData, setDeparmtentData] = useState([]);
  const [departmentForm, setDepartmentForm] = useState(DepartmentModel);
  const [open, setOpen] = useState(false);
  const [firstOptionOpen, setFirstOptionOpen] = useState(false);
  const theme = useTheme();
  const [isShow, setIsShow] = useState(false);

  const Operator = [
    // { id: 1, label: "=" },
    { id: 2, label: "Greater than" },
    { id: 3, label: "Less than" },
    // { id: 4, label: "Between" },
  ];

  useEffect(() => {
    if (companyInput !== undefined && companyInput.length >= 3) {
      compareCompetitors
        .getCompanyNameForComparison({
          company_name: companyInput,
        })
        .then((res) => {
          if (res.Success === true) {
            setFirstCompetitorList(res.Data);
          } else {
            setFirstCompetitorList([]);
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    } else {
      setFirstCompetitorList([]);
    }
  }, [companyInput]);

  useEffect(() => {
    tenderResultFilterService
      .getState({
        id: 0,
        noofrecords: 0,
        pageNo: 0,
        parentids: "",
        name: "",
      })
      .then((res) => {
        if (res.Success) {
          setStateData(res.Data);
        } else {
          setStateData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    tenderResultFilterService
      .getTenderingOwnership()
      .then((res) => {
        if (res.Success === true) {
          setOwnershipData(res.Data);
        } else {
          setOwnershipData([]);
        }
      })
      .catch((err) => {
        console.log("State in compare page Error" + err);
      });

    tenderResultFilterService.getDepartment(departmentForm).then((res) => {
      if (res.Success) {
        setDeparmtentData(res.Data);
      } else {
        setDeparmtentData([]);
      }
    });
  }, [departmentForm]);
  //====useEffect for department according tenderOwnership.....
  useEffect(() => {
    setDepartmentForm((prev) => ({
      ...prev,
      parentids: tenderOwnershipTag.map((res) => res.organization_type_id),
      pageNo: 1,
      noOfRecords: 10,
    }));
  }, [tenderOwnershipTag]);

  useEffect(() => {
    keywordInput.length > 2 && handleKeyWord();
  }, [keywordInput]);

  const handleSatateChange = (event, value) => {
    setStateTags(value);
  };

  const handleOwnerShipChange = (event, value) => {
    setTenderOwnershipTag(value);
  };

  //=====Submit Button...........
  const handleSubmit = () => {
    // if (
    //   bidderSearch.length > 0 ||
    //   stateTags.length > 0 ||
    //   tenderOwnershipTag.length > 0 ||
    //   keywordTags.length > 0 ||
    //   departmentTag.length > 0 ||
    //   keywordInput.length > 0 ||
    //   Object.keys(keywordTags).length > 0
    // ) {
    // setIsSearched(true);
    setCompetitorForm((prev) => ({
      ...prev,
      bidder_name:
        bidderSearch.length > 0
          ? bidderSearch.toLowerCase().trim()
          : localStorage.getItem("user_name"),
      // participated_bidder_name: bidderSearch,
      state_ids: stateTags.map((res) => res.state_id).join(","),
      organization_id:
        departmentTag !== undefined &&
        departmentTag !== null &&
        Object.keys(departmentTag).length > 0
          ? departmentTag.organization_id
          : 0,
      organization_type_name: tenderOwnershipTag
        .map((res) => res.organization_type_id)
        .join(","),
      product_id:
        keywordTags !== undefined &&
        keywordTags !== null &&
        Object.keys(keywordTags).length > 0
          ? parseInt(keywordTags?.product_id)
          : 0,
      tender_value_operator: tenderValueOperator,
      tender_value_from: fromValue,
      tender_value_to: tenderValueOperator === 4 ? toValue : 0,
      search_text: wordSearch.length > 0 ? wordSearch : "",
      sub_industry_id:
        subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
          ? subIndustryTag.sub_industry_id
          : 0,
    }));
    setCompititorReqBody((prev) => ({
      ...prev,
      // bidder_name: "",

      participate_bidder_name: bidderSearch.toLowerCase().trim(),
      state_ids: stateTags.map((res) => res.state_id).join(","),
      organization_id:
        departmentTag !== undefined &&
        departmentTag !== null &&
        Object.keys(departmentTag).length > 0
          ? departmentTag.organization_id
          : 0,
      organization_type_name: tenderOwnershipTag
        .map((res) => res.organization_type_id)
        .join(","),
      product_id:
        keywordTags !== undefined &&
        keywordTags !== null &&
        Object.keys(keywordTags).length > 0
          ? keywordTags?.product_id
          : 0,
      page_no: 1,
      record_per_page: 20,
      sort_by: 2,
      sort_type: 2,
      tender_value_operator: tenderValueOperator,
      tender_value_from: fromValue,
      tender_value_to: tenderValueOperator === 4 ? toValue : 0,
      is_search_param: true,
      sub_industry_id:
        subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
          ? subIndustryTag.sub_industry_id
          : 0,
      search_text: wordSearch.length > 0 ? wordSearch : "",
    }));
    setTenderForm((prev) => ({
      ...prev,
      bidder_name: bidderSearch.toLowerCase().trim(),
      state_ids: stateTags,
      organization_id:
        departmentTag !== undefined &&
        departmentTag !== null &&
        Object.keys(departmentTag).length > 0
          ? departmentTag
          : 0,
      tender_value_operator: tenderValueOperator,
      tender_value_from: fromValue,
      tender_value_to: tenderValueOperator === 4 ? toValue : 0,
      organization_type_name: tenderOwnershipTag,
      keyword_ids:
        keywordTags !== undefined &&
        keywordTags !== null &&
        Object.keys(keywordTags).length > 0
          ? keywordTags
          : "",
      sub_industry_id:
        subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
          ? subIndustryTag
          : 0,
      search_text: wordSearch.length > 0 ? wordSearch : "",
    }));

    // } else alert("Please Select Any Filter Criteria ");
  };

  //========Clear Buttom
  const handleClear = () => {
    // if (
    //   bidderSearch.length > 0 ||
    //   stateTags.length > 0 ||
    //   tenderOwnershipTag.length > 0 ||
    //   keywordTags.length > 0 ||
    //   departmentTag.length > 0 ||
    //   keywordInput.length > 0 ||
    //   Object.keys(keywordTags).length > 0
    // ) {
    setBidderSearch("");
    setGeneralCount({});
    setStateTags([]);
    setKeyWordTags(null);
    setKeyWordInput({});
    setTenderOwnershipTag([]);
    setDepartmentTag();
    setCompanyInput("");
    setDepartmentName("");
    setFromValue(0);
    setToValue(0);
    setTenderValueOperator(2);
    setWordSearch("");
    setSubIndustryTag(null);
    setCompetitorForm((prev) => ({
      ...prev,
      from_date: "",
      to_date: "",
      bidder_name: localStorage.getItem("user_name"),
      participated_bidder_name: "",
      state_ids: "",
      organization_id: "",
      organization_type_name: "",
      product_id: 0,
      page_no: 0,
      record_per_page: 0,
      sort_by: 0,
      sort_type: 0,
      tender_value_operator: 0,
      tender_value_from: 0,
      tender_value_to: 0,
      sub_industry_id: 0,
      search_text: "",
    }));
    setCompititorReqBody((prev) => ({
      ...prev,
      bidder_name: localStorage.getItem("user_name"),
      participate_bidder_name: "",
      state_ids: "",
      organization_id: 0,
      organization_type_name: "",
      product_id: 0,
      page_no: 1,
      record_per_page: 20,
      keyword_ids: "",
      sort_by: 2,
      sort_type: 2,
      tender_value_operator: 0,
      tender_value_from: 0,
      tender_value_to: 0,
      is_search_param: false,
      sub_industry_id: 0,
      search_text: "",
    }));
    setDepartmentName("");
    setTenderForm((prev) => ({
      ...prev,
      participate_bidder_name: "",
      state_ids: "",
      organization_id: 0,
      organization_type_name: "",
      keyword_ids: "",
      tender_value_operator: 0,
      tender_value_from: 0,
      tender_value_to: 0,
      sub_industry_id: 0,
      search_text: "",
    }));
    // } else alert("Please Select Any Filter Criteria ");
  };
  //==================================================

  const firstOptionData = departmentList.map((a) => {
    return a;
  });
  useEffect(() => {
    if (departmentName !== undefined && departmentName.length >= 3) {
      tenderResultFilterService
        .getDepartment({
          ...departmentForm,
          name: departmentName,
        })
        .then((res) => {
          if (res.Success === true) {
            setFirstOptionOpen(true);
            setDepartmentList(res.Data);
          } else {
            setFirstOptionOpen(false);
            setDepartmentList([]);
          }
        })
        .catch((err) => {
          setDepartmentList([]);
          setFirstOptionOpen(false);
          console.log("State in compare page Error" + err);
        });
    } else {
      setFirstOptionOpen(false);
      setDepartmentList([]);
    }
  }, [departmentName]);

  const handleDepartmentSelect = (event, newInputValue) => {
    setFirstOptionOpen(false);

    newInputValue !== null
      ? setDepartmentTag(newInputValue)
      : setDepartmentTag(null);
  };

  const handleDepartmentInputChange = (event, newInputValue) => {
    setDepartmentName(newInputValue);
  };

  // const handleKeyDown = (e) => {
  //   if (["Enter", "Tab"].includes(e.key)) {
  //     setFirstOptionOpen(false);
  //     setDepartmentTag(departmentName);
  //   }
  // };

  // const handleBlurInput = (e) => {
  //   setFirstOptionOpen(false);
  //   setDepartmentTag(e.target.value);
  // };

  const handleFirstInputChange = (event, newInputValue) => {
    setCompanyInput(newInputValue);
  };

  const handleFirstChange = (event, newInputValue) => {
    newInputValue !== null
      ? setBidderSearch(newInputValue)
      : setBidderSearch("");
    newInputValue !== null
      ? setCompanyInput(newInputValue)
      : setCompanyInput("");
  };

  const companyOptionData = firstCompetitorList.map((a) => {
    return a.bidder_name;
  });

  const handleCompanyInputBlur = () => {
    companyInput.length > 0 && setBidderSearch(companyInput);
  };

  const handleKeyWord = (e) => {
    compareCompetitors
      .getKeywordByName({
        keywordName: e,
        pageNo: 1,
        noOfRecords: 10,
      })
      .then((res) => {
        setKeywordList(res.Data);
      });
  };
  // useEffect(() => {
  //   keywordInput.length > 2 && handleKeyWord();
  // }, [keywordInput]);
  const handleKeywordChange = (event, value) => {
    if (value !== undefined && value !== null) {
      setKeyWordTags(value);
      setKeyWordInput(value);
    } else {
      setKeyWordTags({});
      setKeyWordInput({});
      setKeywordList([]);
    }
    // value !== undefined && value !== null ?  :
    setOpen(false);
  };

  const handleInputKeyWord = (event, newInputValue) => {
    // newInputValue !== null ? setKeyWordInput(newInputValue) : setKeyWordInput("");
    if (newInputValue !== null) {
      newInputValue.length >= 3 && handleKeyWord(newInputValue);
      // ? setOpen(false) : setOpen(true);
      // setKeyWordInput(newInputValue);
    } else {
      setKeywordList([]);
    }
  };

  // const keywordOptionData = keywordList.map((a) => {
  //   return a.keyword_name;
  // });

  const handleValueOperatorChange = (event) => {
    event.target.value === 4 ? setIsShow(true) : setIsShow(false);
    setTenderValueOperator(event.target.value);
  };

  const handleChangeFromValue = (e) => {
    parseInt(e.target.value) !== NaN
      ? setFromValue(parseInt(e.target.value))
      : setFromValue(0);
  };

  // const handleChangeToValue = (e) => {
  //   parseInt(e.target.value) !== NaN
  //     ? tenderValueOperator === 4
  //       ? setToValue(parseInt(e.target.value))
  //       : setToValue(0)
  //     : setToValue(0);
  // };
  return (
    <Accordion className="filter-accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Competitors Search</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="filter-form">
            <div className="filter-first">
              <div className="row">
                <div className="span2 offset1">
                  <div className="search-by-area">
                    <div className="state-area">
                      <Autocomplete
                        freeSolo
                        placeholder="Company Name"
                        value={companyInput}
                        onChange={(event, newValue) => {
                          handleFirstChange(event, newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                          handleFirstInputChange(event, newInputValue);
                        }}
                        options={companyOptionData}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField {...params} label="Search Company" />
                        )}
                        onBlur={handleCompanyInputBlur}
                      />
                    </div>
                    <SearchBar
                      wordSearch={wordSearch}
                      setWordSearch={setWordSearch}
                    />
                    <div className="state-area">
                      <Autocomplete
                        multiple
                        disablePortal
                        id="combo-box-demo"
                        className="multiple-autoscroll"
                        value={stateTags}
                        onChange={handleSatateChange}
                        options={stateData}
                        getOptionLabel={(option) => option.state_name}
                        renderInput={(params) => (
                          <TextField {...params} label="State" />
                        )}
                      />
                    </div>
                    {/* <div className="state-area">
                      <Autocomplete
                        disablePortal
                        freeSolo
                        value={keywordInput}
                        options={keywordList}
                        onChange={handleKeywordChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Category" />
                        )}
                        onInputChange={(event, newInputValue) =>
                          handleInputKeyWord(event, newInputValue)
                        }
                        getOptionLabel={(option) =>
                          option.keyword_name ? option.keyword_name : ""
                        }
                      />
                    </div> */}
                    <KeyWord
                      isProduct={true}
                      keywordTags={keywordTags}
                      setKeyWordTags={setKeyWordTags}
                    />
                    <SubIndustry
                      subIndustryTag={subIndustryTag}
                      setSubIndustryTag={setSubIndustryTag}
                    />
                    <div className="state-area">
                      <Autocomplete
                        multiple
                        disablePortal
                        id="combo-box-demo"
                        className="multiple-autoscroll"
                        value={tenderOwnershipTag}
                        onChange={handleOwnerShipChange}
                        options={ownershipData}
                        getOptionLabel={(option) =>
                          option.organization_type_name
                            ? option.organization_type_name
                            : ""
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Ownership" />
                        )}
                      />
                    </div>
                    <div className="state-area">
                      <Autocomplete
                        freeSolo
                        placeholder="Department"
                        value={departmentTag}
                        onChange={(event, newValue) => {
                          handleDepartmentSelect(event, newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                          handleDepartmentInputChange(event, newInputValue);
                        }}
                        options={departmentList}
                        getOptionLabel={(option) => option.organization_name}
                        renderInput={(params) => (
                          <TextField {...params} label="Department" />
                        )}
                        // onBlur={handleBlurInput}
                        // open={firstOptionOpen}
                        // onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className={"state-area tender-value"}>
                      <div className="between-area">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Tender Value
                          </InputLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tenderValueOperator}
                            label="Tender Value"
                            onChange={handleValueOperatorChange}
                            // disabled={valueType.length > 0 ? false : true}
                          >
                            {Operator.map((res) => {
                              return (
                                <MenuItem value={res.id} key={res.id}>
                                  {res.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="between-area">
                        <TextField
                          id="outlined-basic"
                          label="From"
                          variant="outlined"
                          type="number"
                          value={fromValue}
                          onChange={handleChangeFromValue}
                          // disabled={valueType.length > 0 ? false : true}
                        />
                        {/* <TextField
                          id="outlined-basic"
                          label="To"
                          variant="outlined"
                          type="number"
                          value={tenderValueOperator === 4 ? toValue : 0}
                          onChange={handleChangeToValue}
                          disabled={tenderValueOperator === 4 ? false : true}
                        /> */}
                      </div>

                      <div className="between-area"></div>
                    </div>

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
                </div>
              </div>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CompititorFilter;
