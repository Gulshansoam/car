import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { valueConvert } from "../../../_helpers/valueConvert";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { useEffect } from "react";

const IndividualComparison = ({
  companyDetail,
  formData,
  selectedState,
  selectedKeyWord,
  wordSearch,
  subIndustryTag,
}) => {
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const theme = useTheme();
  const dispatch = useDispatch();
  const comparisionListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [tenderForm, setTenderForm] = useState({ ...comparisionListing });

  useEffect(() => {
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

  //**************************************************************************************************************** */
  const handleMyParticipated = (i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name:
            bidderName !== undefined &&
            bidderName !== null &&
            bidderName.length > 0
              ? bidderName
              : "",
          state_ids:
            selectedState !== undefined &&
            selectedState !== null &&
            [selectedState].length > 0
              ? [selectedState]
              : "",
          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
          tender_status: 7,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleLostTenders = (i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name:
            bidderName !== undefined &&
            bidderName !== null &&
            bidderName.length > 0
              ? bidderName
              : "",
          state_ids:
            selectedState !== undefined &&
            selectedState !== null &&
            [selectedState].length > 0
              ? [selectedState]
              : "",
          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
          tender_status: 1,
          // stage: 3,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleMyAwardedValue = (i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name:
            bidderName !== undefined &&
            bidderName !== null &&
            bidderName.length > 0
              ? bidderName
              : "",
          state_ids:
            selectedState !== undefined &&
            selectedState !== null &&
            [selectedState].length > 0
              ? [selectedState]
              : "",
          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
          tender_status: 6,
          // stage: 3,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleResultTBA = (i, bidderName) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name:
            bidderName !== undefined &&
            bidderName !== null &&
            bidderName.length > 0
              ? bidderName
              : "",
          state_ids:
            selectedState !== undefined &&
            selectedState !== null &&
            [selectedState].length > 0
              ? [selectedState]
              : "",
          keyword_ids:
            selectedKeyWord !== undefined && selectedKeyWord !== null
              ? selectedKeyWord
              : "",
          search_text:
            wordSearch !== undefined &&
            wordSearch !== null &&
            wordSearch.length > 0
              ? wordSearch
              : "",
          sub_industry_id:
            subIndustryTag !== undefined &&
            subIndustryTag !== null &&
            [subIndustryTag].length > 0
              ? subIndustryTag
              : 0,
          tender_status: 2,
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };
  const sessionData = sessionStorage.getItem("bidModel");

  const handleClickEvent = (e, i, key, bidderName) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleMyAwardedValue(i, bidderName);
        break;
      case "participated":
        handleMyParticipated(i, bidderName);
        break;
      case "rtba":
        handleResultTBA(i, bidderName);
        break;
      case "losttender":
        handleLostTenders(i, bidderName);
        break;
      default:
        break;
    }
  };

  return (
    <div className="col-12">
      <div className="Individual-comparison-first-area">
        <div className="row">
          <div className="First-Compare-area">
            <div className="col-12">
              <div className="title">Individual Comparison</div>
              <div className="text-area bg-dark">Tenders Participated</div>
              <div className="text-area">Tenders Awarded</div>
              <div className="text-area bg-dark">Tenders Lost</div>
              <div className="text-area">Result TBA</div>
            </div>
          </div>
          {companyDetail !== undefined &&
          companyDetail !== null &&
          companyDetail.length > 0 ? (
            companyDetail?.map((detail, i) => {
              return (
                <div className="Second-Compare-area">
                  <div className="col-12">
                    <div className="title text-center">
                      {detail.tenderInfo !== undefined &&
                      detail.tenderInfo !== null &&
                      detail.tenderInfo?.length > 0
                        ? detail.tenderInfo[0]?.bidder_name
                        : formData.bidder_name?.split(",")[i]}
                    </div>
                    <div className="text-area text-center big-text bg-dark">
                      <div className="announcement-area">
                        {/* *********************Participated-count**************************** */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.participated_tender_count !==
                          undefined &&
                        detail.tenderInfo[0]?.participated_tender_count > 0 ? (
                          <span
                            className="announcement-first-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "participated",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CampaignOutlinedIcon
                              style={{
                                color: theme.palette.common.primary,
                              }}
                              className="announcement-icon"
                            />
                            {detail.tenderInfo[0]?.participated_tender_count}
                          </span>
                        ) : (
                          <span className="announcement-first-text">
                            <CampaignOutlinedIcon
                              style={{
                                color: theme.palette.common.primary,
                              }}
                              className="announcement-icon"
                            />
                            0
                          </span>
                        )}
                        {/* *************************************************************************** */}

                        {/* ***************************participated-value********************************* */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.participated_tender_value !==
                          undefined &&
                        detail.tenderInfo[0]?.participated_tender_value > 0 ? (
                          <span
                            className="announcement-second-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "participated",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />

                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              valueConvert(
                                detail.tenderInfo[0]?.participated_tender_value
                              )}
                          </span>
                        ) : (
                          <span className="announcement-second-text">
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* *************************************************************************** */}
                      </div>
                    </div>
                    <div className="text-area text-center big-text">
                      <div className="announcement-area">
                        {/* ********************************awrded-count******************************************* */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.award_result_count !==
                          undefined &&
                        detail.tenderInfo[0]?.award_result_count > "0" ? (
                          <span
                            className="announcement-first-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "awardvalue",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              detail.tenderInfo[0]?.award_result_count}
                          </span>
                        ) : (
                          <span className="announcement-first-text">
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* *************************************************************************** */}
                        {/* ********************************awrded-value******************************* */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.award_result_count !==
                          undefined &&
                        detail.tenderInfo[0]?.award_result_value > "0" ? (
                          <span
                            className="announcement-second-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "awardvalue",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              valueConvert(
                                detail.tenderInfo[0]?.award_result_value
                              )}
                          </span>
                        ) : (
                          <span className="announcement-second-text">
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* ************************************************************************* */}
                      </div>
                    </div>
                    <div className="text-area text-center big-text bg-dark">
                      <div className="announcement-area">
                        {/* ******************************lost-tender-count************************** */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.lost_tender !== undefined &&
                        detail.tenderInfo[0]?.lost_tender > "0" ? (
                          <span
                            className="announcement-first-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "losttender",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              detail.tenderInfo[0]?.lost_tender}
                          </span>
                        ) : (
                          <span className="announcement-first-text">
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* ************************************************************************* */}
                        {/* **********************************lost_value***************************** */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.lost_value !== undefined &&
                        detail.tenderInfo[0]?.lost_value > 0 ? (
                          <span
                            className="announcement-second-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "losttender",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo[0] !== undefined &&
                              detail.tenderInfo !== null &&
                              valueConvert(detail.tenderInfo[0]?.lost_value)}
                          </span>
                        ) : (
                          <span className="announcement-second-text">
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* ************************************************************************* */}
                      </div>
                    </div>
                    <div className="text-area text-center big-text">
                      <div className="announcement-area">
                        {/* **********************************rtba-count***************************** */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.to_be_announced_tender !==
                          undefined &&
                        detail.tenderInfo[0]?.to_be_announced_tender > "0" ? (
                          <span
                            className="announcement-first-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "rtba",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              detail.tenderInfo[0]?.to_be_announced_tender}
                          </span>
                        ) : (
                          <span className="announcement-first-text">
                            <CampaignOutlinedIcon
                              className="announcement-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                        {/* ************************************************************************* */}
                        {/* **********************************rtba-value***************************** */}
                        {detail.tenderInfo !== undefined &&
                        detail.tenderInfo !== null &&
                        detail.tenderInfo[0]?.to_be_announced_value !==
                          undefined &&
                        detail.tenderInfo[0]?.to_be_announced_value > "0" ? (
                          <span
                            className="announcement-second-text"
                            onClick={(e) =>
                              handleClickEvent(
                                e,
                                i,
                                "rtba",
                                detail.tenderInfo[0]?.bidder_name
                              )
                            }
                          >
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            {detail.tenderInfo !== undefined &&
                              detail.tenderInfo !== null &&
                              valueConvert(
                                detail.tenderInfo[0]?.to_be_announced_value
                              )}
                          </span>
                        ) : (
                          <span className="announcement-second-text">
                            <CurrencyRupeeOutlinedIcon
                              className="rupees-icon"
                              style={{
                                color: theme.palette.common.main,
                              }}
                            />
                            0
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualComparison;
