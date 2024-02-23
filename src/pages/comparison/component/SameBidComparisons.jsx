import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { compareCompetitors } from "../../../_services/compareCompetitorsServices";
import { valueConvert } from "../../../_helpers/valueConvert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { selectedDateRange } from "../../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "../../../redux/slice";

const SameBidComparisons = ({
  formData,
  companyDetail,
  selectedState,
  selectedKeyWord,
  wordSearch,
  subIndustryTag,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const comparisionListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const [tenderForm, setTenderForm] = useState({ ...comparisionListing });
  const [sameBidData, setSameBidData] = useState({
    search_company: "",
    participated_count: 0,
    participated_value: 0,
    result_to_be_announced_count: 0,
    result_to_be_announced_value: 0,
    awarded_count_company1: 0,
    awarded_value_company1: 0,
    awarded_count_company2: 0,
    awarded_value_company2: 0,
    awarded_count_company3: 0,
    awarded_value_company3: 0,
    others_count: 0,
    others_value: 0,
  });
  const [stateData, setStateData] = useState([]);
  const bidderName = formData.bidder_name.split(",");

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

  useEffect(() => {
    if (formData) {
      compareCompetitors
        .getSameBidOfCompetitorCompanies({
          ...formData,
          from_date: selectedFromDate,
          to_date: selectedToDate,
          // bidder1: bidderName[0],
          // bidder2: bidderName[1],
          winning_bidder_name: "",
          // bidder_name: "",
        })
        .then((res) => {
          if (res.Success === true) {
            setSameBidData(res.Data[0]);
          } else {
            setSameBidData([]);
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    }
  }, [formData]);

  // useEffect(() => {
  //   compareCompetitors
  //     .getCompareSameBidComparisionStateWise({
  //       from_date: selectedFromDate,
  //       to_date: selectedToDate,
  //       bidder1: bidderName[0],
  //       bidder2: bidderName[1],
  //       bidder3: bidderName[2],
  //     })
  //     .then((res) => {
  //       if (res.Success === true) {
  //         setStateData(res.Data);
  //       } else {
  //         setStateData([]);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("State in compare page Error" + err);
  //     });
  // }, [formData, selectedFromDate, selectedToDate]);

  const searchCopany =
    sameBidData.search_company !== undefined &&
    sameBidData.search_company !== null &&
    sameBidData.search_company.length > 0
      ? sameBidData.search_company.split(",")
      : bidderName;

  const handleMyParticipated = (i) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: formData.bidder_name_1,
          participant_name: formData.bidder_name_2,
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

  const handleMyAwardedValue = (i) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name:
            i === 0 ? formData.bidder_name_1 : formData.bidder_name_2,
          participant_name:
            i === 0 ? formData.bidder_name_2 : formData.bidder_name_1,
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
        })
      );
      window.open(
        `/dashboard/companyprofile-tenders?datefrom=${tenderForm.publication_date_from}&dateto=${tenderForm.publication_date_to}`
      );
    }
  };

  const handleResultTBA = (i) => {
    if (
      comparisionListing.bidder_name !== null &&
      comparisionListing.tender_status !== null
    ) {
      dispatch(
        setSelectedListing({
          ...tenderForm,
          bidder_name: formData.bidder_name_1,
          participant_name: formData.bidder_name_2,
          state_ids:
            selectedState !== undefined && selectedKeyWord !== null
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

  const handleClickEvent = (e, i, key) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "awardvalue":
        handleMyAwardedValue(i);
        break;
      case "participated":
        handleMyParticipated(i);
        break;
      case "rtba":
        handleResultTBA(i);
        break;

      default:
        break;
    }
  };

  return (
    <Accordion className="compare-accordion" defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Same Bid Comparisons</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div
            className={
              companyDetail.length < 3
                ? "individual-comparison-area two-coluam-area"
                : "individual-comparison-area"
            }
          >
            <div className="individual-comparison-title-area">
              <div className="row">
                <div className="First-Compare-area">
                  <div className="title">Company Name</div>
                  <div className="text-area bg-dark bg-gray total-tenders-participated">
                    Participated Tenders
                  </div>
                  <div className="text-area bg-gray total-tenders-participated">
                    Result TBA
                  </div>
                  <div className="text-area bg-dark">Awarded Tender</div>
                </div>
                <>
                  <div className="Second-Compare-area">
                    <div className="title text-center">
                      {formData.bidder_name_1}
                    </div>
                    <div className="text-area text-center big-text bg-dark bg-gray"></div>
                    <div className="text-area text-center big-text bg-gray"></div>
                    <div className="text-area text-center big-text bg-dark">
                      <div className="announcement-area">
                        {searchCopany.length > 0 ? (
                          searchCopany.filter((res) => res.length > 1).length <=
                          2 ? (
                            <>
                              {sameBidData?.awarded_count_company1 == 0 ? (
                                <span
                                  className="announcement-first-text"
                                  //  onClick={(e) =>
                                  //    handleClickEvent(e, 0, "awardvalue")
                                  //  }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.awarded_count_company1}
                                </span>
                              ) : (
                                <span
                                  className="announcement-first-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 0, "awardvalue")
                                  }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.awarded_count_company1}
                                </span>
                              )}
                              {sameBidData?.awarded_value_company1 == 0 ? (
                                <span
                                  className="announcement-second-text"
                                  //  onClick={(e) =>
                                  //    handleClickEvent(e, 0, "awardvalue")
                                  //  }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.awarded_value_company1
                                  )}
                                </span>
                              ) : (
                                <span
                                  className="announcement-second-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 0, "awardvalue")
                                  }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.awarded_value_company1
                                  )}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="announcement-first-text">
                                <CampaignOutlinedIcon
                                  className="announcement-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {sameBidData?.awarded_count_company1}
                              </span>

                              <span className="announcement-second-text">
                                <CurrencyRupeeOutlinedIcon
                                  className="rupees-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {valueConvert(
                                  sameBidData?.awarded_value_company1
                                )}
                              </span>
                            </>
                          )
                        ) : (
                          <span className="announcement-first-text">
                            No Data
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="Second-Compare-area">
                    <div className="title text-center">
                      {formData.bidder_name_2}
                    </div>
                    <div className="text-area text-center big-text bg-dark bg-gray full-row">
                      {/* <div className="announcement-area announcement-txt-area">
                        (
                        {sameBidData.search_company !== null &&
                          sameBidData.search_company.length > 0
                          ? sameBidData.search_company
                            .split(",")
                            .filter((res) => res.length > 0)
                            .join(",")
                          : bidderName
                            .filter((res) => res.length > 0)
                            .join(",")}
                        )
                      </div> */}
                      <div className="announcement-area same-bid-comparisons-announcement-area">
                        {searchCopany.length > 0 ? (
                          searchCopany.filter((res) => res.length > 1).length <=
                          2 ? (
                            <>
                              {sameBidData?.participated_count == 0 ? (
                                <span
                                  className="announcement-first-text"
                                  //  onClick={(e) =>
                                  //    handleClickEvent(e, 0, "participated")
                                  //  }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.participated_count}
                                </span>
                              ) : (
                                <span
                                  className="announcement-first-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 0, "participated")
                                  }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.participated_count}
                                </span>
                              )}
                              {sameBidData?.participated_value == 0 ? (
                                <span
                                  className="announcement-second-text"
                                  //  onClick={(e) =>
                                  //    handleClickEvent(e, 0, "participated")
                                  //  }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.participated_value
                                  )}
                                </span>
                              ) : (
                                <span
                                  className="announcement-second-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 0, "participated")
                                  }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.participated_value
                                  )}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="announcement-first-text">
                                <CampaignOutlinedIcon
                                  className="announcement-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {sameBidData?.participated_count}
                              </span>

                              <span className="announcement-second-text">
                                <CurrencyRupeeOutlinedIcon
                                  className="rupees-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {valueConvert(sameBidData?.participated_value)}
                              </span>
                            </>
                          )
                        ) : (
                          <span className="announcement-first-text">
                            No Data
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-area text-center big-text bg-gray full-row">
                      {/* <div className="announcement-area announcement-txt-area">
                        (
                        {sameBidData.search_company !== null &&
                        sameBidData.search_company.length > 0
                          ? sameBidData.search_company
                              .split(",")
                              .filter((res) => res.length > 0)
                              .join(",")
                          : bidderName
                              .filter((res) => res.length > 0)
                              .join(",")}
                        )
                      </div> */}
                      <div className="announcement-area same-bid-comparisons-announcement-area">
                        {searchCopany.length > 0 ? (
                          searchCopany.filter((res) => res.length > 1).length <=
                          2 ? (
                            <>
                              {sameBidData?.result_to_be_announced_count ==
                              0 ? (
                                <>
                                  <span className="announcement-first-text">
                                    <CampaignOutlinedIcon
                                      className="announcement-icon"
                                      style={{
                                        color: theme.palette.common.main,
                                      }}
                                    />
                                    {sameBidData?.result_to_be_announced_count}
                                  </span>
                                  <span className="announcement-second-text">
                                    <CurrencyRupeeOutlinedIcon
                                      className="rupees-icon"
                                      style={{
                                        color: theme.palette.common.main,
                                      }}
                                    />
                                    {valueConvert(
                                      sameBidData?.result_to_be_announced_value
                                    )}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span
                                    className="announcement-first-text"
                                    onClick={(e) =>
                                      handleClickEvent(e, 0, "rtba")
                                    }
                                  >
                                    <CampaignOutlinedIcon
                                      className="announcement-icon"
                                      style={{
                                        color: theme.palette.common.main,
                                      }}
                                    />
                                    {sameBidData?.result_to_be_announced_count}
                                  </span>
                                  <span
                                    className="announcement-second-text"
                                    onClick={(e) =>
                                      handleClickEvent(e, 0, "rtba")
                                    }
                                  >
                                    <CurrencyRupeeOutlinedIcon
                                      className="rupees-icon"
                                      style={{
                                        color: theme.palette.common.main,
                                      }}
                                    />
                                    {valueConvert(
                                      sameBidData?.result_to_be_announced_value
                                    )}
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="announcement-first-text">
                                <CampaignOutlinedIcon
                                  className="announcement-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {sameBidData?.result_to_be_announced_count}
                              </span>

                              <span className="announcement-second-text">
                                <CurrencyRupeeOutlinedIcon
                                  className="rupees-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {valueConvert(
                                  sameBidData?.result_to_be_announced_value
                                )}
                              </span>
                            </>
                          )
                        ) : (
                          <span className="announcement-first-text">
                            No Data
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-area text-center big-text bg-dark">
                      <div className="announcement-area">
                        {searchCopany.length > 0 ? (
                          searchCopany.filter((res) => res.length > 1).length <=
                          2 ? (
                            <>
                              {sameBidData?.awarded_count_company2 == 0 ? (
                                <span
                                  className="announcement-first-text"
                                  // onClick={(e) =>
                                  //   handleClickEvent(e, 1, "awardvalue")
                                  // }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.awarded_count_company2}
                                </span>
                              ) : (
                                <span
                                  className="announcement-first-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 1, "awardvalue")
                                  }
                                >
                                  <CampaignOutlinedIcon
                                    className="announcement-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {sameBidData?.awarded_count_company2}
                                </span>
                              )}
                              {sameBidData?.awarded_value_company2 == 0 ? (
                                <span
                                  className="announcement-second-text"
                                  // onClick={(e) =>
                                  //   handleClickEvent(e, 1, "awardvalue")
                                  // }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.awarded_value_company2
                                  )}
                                </span>
                              ) : (
                                <span
                                  className="announcement-second-text"
                                  onClick={(e) =>
                                    handleClickEvent(e, 1, "awardvalue")
                                  }
                                >
                                  <CurrencyRupeeOutlinedIcon
                                    className="rupees-icon"
                                    style={{
                                      color: theme.palette.common.main,
                                    }}
                                  />
                                  {valueConvert(
                                    sameBidData?.awarded_value_company2
                                  )}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="announcement-first-text">
                                <CampaignOutlinedIcon
                                  className="announcement-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {sameBidData?.awarded_count_company2}
                              </span>

                              <span className="announcement-second-text">
                                <CurrencyRupeeOutlinedIcon
                                  className="rupees-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {valueConvert(
                                  sameBidData?.awarded_value_company2
                                )}
                              </span>
                            </>
                          )
                        ) : (
                          <span className="announcement-first-text">
                            No Data
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ******************* NOt in use till now *************also 0 vali condition nhi lagi hai****************************/}
                  <div className="Second-Compare-area">
                    {searchCopany.filter((res) => res.length > 1).length >
                      2 && (
                      <>
                        <div className="title text-center">
                          {searchCopany[2]}
                        </div>
                        <div className="text-area text-center big-text bg-dark bg-gray"></div>
                        <div className="text-area text-center big-text bg-gray"></div>
                        <div className="text-area text-center big-text bg-dark">
                          <div className="announcement-area">
                            <>
                              <span
                                className="announcement-first-text"
                                onClick={handleMyAwardedValue}
                              >
                                <CampaignOutlinedIcon
                                  className="announcement-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {sameBidData?.awarded_count_company3}
                              </span>
                              <span
                                className="announcement-second-text"
                                onClick={handleMyAwardedValue}
                              >
                                <CurrencyRupeeOutlinedIcon
                                  className="rupees-icon"
                                  style={{
                                    color: theme.palette.common.main,
                                  }}
                                />
                                {valueConvert(
                                  sameBidData?.awarded_value_company3
                                )}
                              </span>
                            </>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              </div>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default SameBidComparisons;
