import React, { useEffect } from "react";
import CategoryState from "./CategoryState";
import AddIcon from "@mui/icons-material/Add";
import { compareCompetitors } from "../../../_services/compareCompetitorsServices";
import { TextField, Button, Autocomplete, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
// import LinerLoader from "../../../components/loading-screen/LinerLoader";
import CompareImg from "../../../assets/images/compare.png";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { LoadingButton } from "@mui/lab";
import SearchBar from "../../../common/filterInputs/SearchBar";
import KeyWord from "../../../common/filterInputs/KeyWord";
import SubIndustry from "../../../common/filterInputs/SubIndustry";

const AddCompany = ({
  formData,
  setFormData,
  categoryValue,
  setCategoryValue,
  keywordValue,
  setKeywordValue,
  addCompany,
  setAddCompany,
  setCompanyDetail,
  setSelectedState,
  setSelectedKeyWord,
  /////////////////////////
  firstCompetitorList,
  setFirstCompetitorList,
  setFirstOptionOpen,
  firstBidderSearch,
  setFirstBidderSearch,
  /////////////////////////
  secondCompetitorList,
  setSecondCompetitorList,
  setSecondOptionOpen,
  secondBidderSearch,
  setSecondBidderSearch,
  /////////////////////////
  thirdCompetitorList,
  setThirdCompetitorList,
  setThirdOptionOpen,
  thirdBidderSearch,
  setThirdBidderSearch,
  /////////////////////////
  alertOpen,
  setAlertOpen,
  apiLoader,
  setApiLoader,

  wordSearch,
  setWordSearch,
  subIndustryTag,
  setSubIndustryTag,
}) => {
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const theme = useTheme();
  const [firstStoreData, setFirstStoreData] = useState({
    bidder_name: "",
  });
  const [secondStoreData, setSecondStoreData] = useState({
    bidder_name: "",
  });
  const [thirdStoreData, setThirdStoreData] = useState({});
  const [keywordId, setKeywordId] = useState("");
  const [stateId, setstatedId] = useState("");

  /////////////////////////////////////////////


  useEffect(() => {
    if (firstBidderSearch !== undefined && firstBidderSearch.length >= 3) {
      setFirstOptionOpen(true);
      compareCompetitors
        .getCompanyNameForComparison({
          company_name: firstBidderSearch,
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
      setFirstOptionOpen(false);
      setFirstCompetitorList([]);
    }
  }, [firstBidderSearch]);
  const firstOptionData = firstCompetitorList.filter((a) => {
    return (
      a.bidder_name !== secondStoreData.bidder_name &&
      a.bidder_name !== thirdStoreData.bidder_name
    );
  });

  const handleFirstInputChange = (event, newInputValue) => {
    setFirstBidderSearch(newInputValue);
  };

  const handleFirstChange = (event, newInputValue) => {
    setFirstOptionOpen(false);

    // setFirstStoreData((prev) => [...prev, newInputValue]);
    newInputValue !== null
      ? setFirstStoreData(newInputValue)
      : setFirstStoreData({});
  };

  /////////////////////////////////////////////

  useEffect(() => {
    if (secondBidderSearch !== undefined && secondBidderSearch.length >= 3) {
      setSecondOptionOpen(true);
      compareCompetitors
        .getCompanyNameForComparison({
          company_name: secondBidderSearch,
        })
        .then((res) => {
          if (res.Success === true) {
            setSecondCompetitorList(res.Data);
          } else {
            setSecondCompetitorList([]);
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    } else {
      setSecondOptionOpen(false);
      setSecondCompetitorList([]);
    }
  }, [secondBidderSearch]);

  const secondOptionData = secondCompetitorList.filter((a) => {
    return (
      a.bidder_name !== firstStoreData.bidder_name &&
      a.bidder_name !== thirdStoreData.bidder_name
    );
  });

  const handleSecondInputChange = (event, newInputValue) => {
    setSecondBidderSearch(newInputValue);
  };

  const handleSecondChange = (event, newInputValue) => {
    setSecondOptionOpen(false);
    // setFirstStoreData((prev) => [...prev, newInputValue]);
    newInputValue !== null
      ? setSecondStoreData(newInputValue)
      : setSecondStoreData({});
  };

  /////////////////////////////////////////////

  useEffect(() => {
    if (thirdBidderSearch !== undefined && thirdBidderSearch.length >= 3) {
      setThirdOptionOpen(true);
      compareCompetitors
        .getCompanyNameForComparison({
          company_name: thirdBidderSearch,
        })
        .then((res) => {
          if (res.Success === true) {
            setThirdCompetitorList(res.Data);
          } else {
            setThirdCompetitorList([]);
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    } else {
      setThirdOptionOpen(false);
      setThirdCompetitorList([]);
    }
  }, [thirdBidderSearch]);

  // const thirdOptionData = thirdCompetitorList.filter((a) => {
  //   return (
  //     a.bidder_name !== secondStoreData.bidder_name &&
  //     a.bidder_name !== firstStoreData.bidder_name
  //   );
  // });
  // const handleThirdInputChange = (event, newInputValue) => {
  //   setThirdBidderSearch(newInputValue);
  // };

  // const handleThirdChange = (event, newInputValue) => {
  //   setThirdOptionOpen(false);
  //   // setFirstStoreData((prev) => [...prev, newInputValue]);
  //   newInputValue !== null
  //     ? setThirdStoreData(newInputValue)
  //     : setThirdStoreData({});
  // };

  // /////////////////////////////////////////////

  // const handleAddBox = () => {
  //   setAddCompany(true);
  // };

  const compnyForCompere = () => {
    const data = [firstStoreData, secondStoreData, thirdStoreData];
    return data.filter(
      (res) => res.bidder_name !== undefined && res.bidder_name.length > 0
    );
  };

  // useEffect(() => {
  //   debugger
  //   formData.bidder_name.length > 0 && handleCompareNow()
  // }, [selectedFromDate, selectedToDate])

  useEffect(() => {
    if (isDateSelected === true) {
      handleCompareNow();
      setIsDateSelected(false);
    }
  }, [selectedFromDate, selectedToDate]);

  const handleCompareNow = () => {
    // const namesForCompere = compnyForCompere();

    if (firstStoreData && secondStoreData) {
      setApiLoader(true);
      setFormData((prev) => ({
        ...prev,
        from_date: selectedFromDate,
        to_date: selectedToDate,
        search_text:
          wordSearch !== undefined &&
          wordSearch !== null &&
          wordSearch.length > 0
            ? wordSearch
            : "",
        product_id:
          categoryValue !== undefined && categoryValue !== null
            ? categoryValue.product_id
            : 0,
        sub_industry_id:
          subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
            ? subIndustryTag.sub_industry_id
            : 0,
        state_id: stateId,
        bidder_name_1:
          firstStoreData !== null && firstStoreData !== undefined
            ? firstStoreData.bidder_name
            : "",
        bidder_name_2:
          secondStoreData !== null && secondStoreData !== undefined
            ? secondStoreData.bidder_name
            : "",
        bidder_name: "",
      }));
      compareCompetitors
        .getCompareCompetitorCompanies({
          ...formData,
          from_date: selectedFromDate,
          to_date: selectedToDate,
          state_id: stateId,
          bidder_name: "",
          bidder_name_1:
            firstStoreData !== null && firstStoreData !== undefined
              ? firstStoreData.bidder_name
              : "",
          bidder_name_2:
            secondStoreData !== null && secondStoreData !== undefined
              ? secondStoreData.bidder_name
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          product_id:
            categoryValue !== undefined && categoryValue !== null
              ? categoryValue.product_id
              : 0,
          sub_industry_id:
            subIndustryTag !== null && Object.keys(subIndustryTag).length > 0
              ? subIndustryTag.sub_industry_id
              : 0,
        })
        .then((res) => {
          if (res.Success) {
            setCompanyDetail(res.Data.companyInfo);
            setApiLoader(false);
          } else {
            setCompanyDetail([]);
            setApiLoader(false);
          }
        })
        .catch((err) => {
          console.log("Company Detail page Error" + err);
          setApiLoader(false);
        });
    } else {
      // setAlertOpen(true)
      alert("Enter Minimum 2 Competitor Name");
    }
  };

  return (
    <div className="compare-first-box">
      <div className="compare-first-white-box">
        {/* <form onSubmit={handleCompareNow}> */}
        <div className="row">
          <div className="col-4 First-line-First-Compare-area">
            <div className="compare-first-txt compare-first-img">
              <img src={CompareImg}></img>
            </div>
          </div>
          <div className="col-4 First-line-Second-Compare-area">
            <div className="compare-first">
              <div
                className="compare-first-box-new"
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              ></div>
              <div className="compare-one">
                <div className="compare-box-area">
                  <Autocomplete
                    freeSolo
                    placeholder="Search Company"
                    inputValue={firstBidderSearch}
                    onChange={(event, newValue) => {
                      handleFirstChange(event, newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleFirstInputChange(event, newInputValue);
                    }}
                    options={firstOptionData}
                    getOptionLabel={(option) => option.bidder_name}
                    renderInput={(params) => (
                      <TextField {...params} label="Search Company" />
                    )}
                    // loading={<LinerLoader />}
                  />
                </div>
                <CategoryState
                  setSelectedKeyWord={setSelectedKeyWord}
                  keywordId={keywordId}
                  setKeywordId={setKeywordId}
                  stateId={stateId}
                  setstatedId={setstatedId}
                  formData={formData}
                  setFormData={setFormData}
                  categoryValue={categoryValue}
                  setCategoryValue={setCategoryValue}
                  keywordValue={keywordValue}
                  setKeywordValue={setKeywordValue}
                  setSelectedState={setSelectedState}
                />
                <div className="compare-box-area">
                  <SearchBar
                    wordSearch={wordSearch}
                    setWordSearch={setWordSearch}
                    fromPage={"comparePage"}
                  />
                </div>
                <div className="compare-box-area">
                  <SubIndustry
                    subIndustryTag={subIndustryTag}
                    setSubIndustryTag={setSubIndustryTag}
                    fromPage={"comparePage"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 First-line-Second-Compare-area">
            <div className="compare-first">
              <div
                className="compare-first-box-new"
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
              ></div>
              <div className="compare-one">
                <div className="compare-box-area">
                  <Autocomplete
                    freeSolo
                    placeholder="Search Company"
                    inputValue={secondBidderSearch}
                    onChange={(event, newValue) => {
                      handleSecondChange(event, newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleSecondInputChange(event, newInputValue);
                    }}
                    options={secondOptionData}
                    getOptionLabel={(option) => option.bidder_name}
                    renderInput={(params) => (
                      <TextField {...params} label="Search Company" />
                    )}
                    // loading={<LinerLoader />}
                  />
                </div>
                <CategoryState
                  setSelectedKeyWord={setSelectedKeyWord}
                  keywordId={keywordId}
                  setKeywordId={setKeywordId}
                  stateId={stateId}
                  setstatedId={setstatedId}
                  formData={formData}
                  setFormData={setFormData}
                  categoryValue={categoryValue}
                  setCategoryValue={setCategoryValue}
                  keywordValue={keywordValue}
                  setKeywordValue={setKeywordValue}
                  setSelectedState={setSelectedState}
                />
                <div className="compare-box-area">
                  <SearchBar
                    wordSearch={wordSearch}
                    setWordSearch={setWordSearch}
                    fromPage={"comparePage"}
                  />
                </div>
                <div className="compare-box-area">
                  <SubIndustry
                    subIndustryTag={subIndustryTag}
                    setSubIndustryTag={setSubIndustryTag}
                    fromPage={"comparePage"}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* {addCompany === false && (
            <div className="col-3 First-line-Second-Compare-area">
              <div className="compare-first">
                <div
                  className="compare-first-box-new"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                ></div>
                <div className="compare-one">
                  <div className="compare-box-area add-icon-main-area">
                    <div className="add-icon-area">
                      <AddIcon className="plus-round" onClick={handleAddBox} />
                    </div>
                    <div className="add-company">Add Company</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {addCompany === true && (
            <div className="col-3">
              <div className="compare-first">
                <div
                  className="compare-first-box-new"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                ></div>
                <div className="compare-one">
                  <div className="compare-box-area">
                    <Autocomplete
                      freeSolo
                      placeholder="Search Company"
                      inputValue={thirdBidderSearch}
                      onChange={(event, newValue) => {
                        handleThirdChange(event, newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        handleThirdInputChange(event, newInputValue);
                      }}
                      options={thirdOptionData}
                      getOptionLabel={(option) => option.bidder_name}
                      renderInput={(params) => (
                        <TextField {...params} label="Search Company" />
                      )}
                    // loading={<LinerLoader />}
                    />
                  </div>
                  <CategoryState
                    setSelectedKeyWord={setSelectedKeyWord}
                    keywordId={keywordId}
                    setKeywordId={setKeywordId}
                    stateId={stateId}
                    setstatedId={setstatedId}
                    formData={formData}
                    setFormData={setFormData}
                    categoryValue={categoryValue}
                    setCategoryValue={setCategoryValue}
                    keywordValue={keywordValue}
                    setKeywordValue={setKeywordValue}
                    setSelectedState={setSelectedState}
                  />
                </div>
              </div>
            </div>
          )} */}
        </div>

        <div className="compare-now-btn">
          <LoadingButton
            style={{
              backgroundColor: theme.palette.primary.darker,
              color: theme.palette.common.white,
            }}
            // loading={apiLoader}
            loading={apiLoader}
            // type="submit"
            disabled={apiLoader}
            loadingPosition="start"
            onClick={handleCompareNow}
          >
            Compare Now
          </LoadingButton>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddCompany;
