import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import CompareImg from "../../../assets/images/compare.png";
import { useContext } from "react";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { LoadingButton } from "@mui/lab";
import CompanyName from "../../../common/filterInputs/CompanyName";
import KeyWord from "../../../common/filterInputs/KeyWord";
import StateSingleSelect from "../../../common/filterInputs/StateSingleSelect";
import { compareCompetitors } from "../../../_services/compareCompetitorsServices";

const CompareArea = (props) => {
  const { compareDetail, apiLoader } = props;
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const theme = useTheme();
  const [firstCompanyInput, setFirstCompanyInput] = useState(null);
  const [secondCompanyInput, setSecondCompanyInput] = useState(null);
  const [keywordTags, setKeyWordTags] = useState(null);
  const [stateTag, setStateTag] = useState(null);

  console.log(typeof firstCompanyInput, "firstCompanyInput", firstCompanyInput);
  console.log(secondCompanyInput, "secondCompanyInput");
  console.log(typeof keywordTags, "keywordTags", keywordTags);
  console.log(typeof stateTag, "stateTag", stateTag);

  const handleCompareNow = async () => {
    if (firstCompanyInput !== null && secondCompanyInput !== null) {
      const res = compareCompetitors.getCompareCompetitorCompanies({
        ...compareDetail,
        bidder_name: `${firstCompanyInput.bidder_name},${secondCompanyInput.bidder_name}`,
      });
    }
  };

  return (
    <div className="compare-first-box">
      <div className="compare-first-white-box">
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
                  <CompanyName
                    companyName={firstCompanyInput}
                    setCompanyName={setFirstCompanyInput}
                    titleLabel={"Search Company"}
                  />
                </div>
                <div className="compare-box-area">
                  <KeyWord
                    keywordTags={keywordTags}
                    setKeyWordTags={setKeyWordTags}
                    fromPage={"comparision"}
                  />
                </div>
                <div className="compare-box-area">
                  <StateSingleSelect
                    stateTag={stateTag}
                    setStateTag={setStateTag}
                    fromPage={"comparision"}
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
                  <CompanyName
                    companyName={secondCompanyInput}
                    setCompanyName={setSecondCompanyInput}
                    titleLabel={"Search Company"}
                  />
                </div>
                <div className="compare-box-area">
                  <KeyWord
                    keywordTags={keywordTags}
                    setKeyWordTags={setKeyWordTags}
                    fromPage={"comparision"}
                  />
                </div>
                <div className="compare-box-area">
                  <StateSingleSelect
                    stateTag={stateTag}
                    setStateTag={setStateTag}
                    fromPage={"comparision"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="compare-now-btn">
          <LoadingButton
            style={{
              backgroundColor: theme.palette.primary.darker,
              color: theme.palette.common.white,
            }}
            loading={apiLoader}
            disabled={apiLoader}
            loadingPosition="start"
            onClick={handleCompareNow}
          >
            Compare Now
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CompareArea;
