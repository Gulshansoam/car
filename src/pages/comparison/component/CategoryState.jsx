import { compareCompetitors } from "../../../_services/compareCompetitorsServices";
import { tenderResultFilterService } from "../../../_services/tenderResultFilterServices";
import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Skeleton } from "@mui/material";
import KeyWord from "../../../common/filterInputs/KeyWord";
// import LinerLoader from "../../../components/loading-screen/LinerLoader";

const CategoryState = ({
  setFormData,
  categoryValue,
  setCategoryValue,
  keywordValue,
  setKeywordValue,
  keywordId,
  setKeywordId,
  stateId,
  setstatedId,
  setSelectedState,
  setSelectedKeyWord,
}) => {
  const [stateList, setStateLists] = useState([]);
  const [keywordList, setKeywordList] = useState([]);

  useEffect(() => {
    getState();
    getKeyword();
  }, []);

  const getState = () => {
    tenderResultFilterService
      .getState({
        id: 0,
        pageNo: 0,
        noofrecords: 0,
        parentids: "",
        name: "",
      })
      .then((res) => {
        if (res.Success === true) {
          setStateLists(res.Data);
        } else {
          setStateLists([]);
        }
      })
      .catch((err) => {
        console.log("State in compare page Error" + err);
      });
  };

  const getKeyword = () => {
    compareCompetitors
      .getKeyword()
      .then((res) => {
        if (res.Success === true) {
          setKeywordList(res.Data);
        } else {
          setKeywordList([]);
        }
      })
      .catch((err) => {
        console.log("State in compare page Error" + err);
      });
  };

  const handleCategory = (e, value) => {
    setCategoryValue(value);
    // setFormData((prev) => ({
    //   ...prev,
    //   keyword_id:
    //     value && value.keyword_id.toString(),
    // }));
    value !== null
      ? setKeywordId(value.sub_industry_id.toString())
      : setKeywordId("");
    value !== null ? setSelectedKeyWord(value) : setSelectedKeyWord();
    // value ? setSelectedState(value) : setSelectedState()
  };

  const handleStates = (e, value) => {
    setKeywordValue(value);
    value !== null ? setstatedId(value.state_id.toString()) : setstatedId("");
    value !== null ? setSelectedState(value) : setSelectedState();
    // setFormData((prev) => ({
    //   ...prev,
    //   state_id: value && value?.state_id.toString(),
    // }));
  };

  return (
    <div>
      <div className="compare-box-area">
        {/* <Autocomplete
          disablePortal
          value={categoryValue}
          options={keywordList}
          onChange={handleCategory}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" />
          )}
          getOptionLabel={(option) =>
            option.keyword_name ? option.keyword_name : ""
          }
          loading={<Skeleton />}
        /> */}

        <KeyWord
          isProduct={true}
          keywordTags={categoryValue}
          setKeyWordTags={setCategoryValue}
          fromPage={"comparePage"}
        />
      </div>
      <div className="compare-box-area">
        <Autocomplete
          disablePortal
          value={keywordValue}
          onChange={handleStates}
          options={stateList}
          renderInput={(params) => (
            <TextField {...params} label="Select State" />
          )}
          getOptionLabel={(option) =>
            option.state_name ? option.state_name : ""
          }
          loading={<Skeleton />}
        />
      </div>
    </div>
  );
};

export default CategoryState;
