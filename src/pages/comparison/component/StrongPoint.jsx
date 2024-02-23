import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { compareCompetitors } from "../../../_services/compareCompetitorsServices";
import { valueConvert } from "../../../_helpers/valueConvert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
const StrongPoint = ({ companyDetail, formData }) => {
  const theme = useTheme();
  const [StrongPointData, setStrongPointData] = useState([
    {
      departmentInfo: {
        organization_id: 0,
        organization_name: "",
        participated_tender_count: 0,
        participated_tender_value: 0,
        award_result_count: 0,
        award_result_value: 0,
      },
      stateInfo: {
        state_id: 0,
        state_name: "",
        participated_tender_count: 0,
        participated_tender_value: 0,
        award_result_count: 0,
        award_result_value: 0,
      },
      ownershipInfo: {
        organization_type_id: 0,
        organization_type_name: "",
        participated_tender_count: 0,
        participated_tender_value: 0,
        award_result_count: 0,
        award_result_value: 0,
      },
    },
  ]);

  useEffect(() => {
    if (formData) {
      compareCompetitors
        .getStrongPointsOfCompetitorCompanies({
          ...formData,
          winning_bidder_name: "",
        })
        .then((res) => {
          if (res.Success === true) {
            setStrongPointData(res.Data.strongPointInfo);
          } else {
            setStrongPointData({});
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    }
  }, [formData]);

  return (
    <Accordion className="compare-accordion" defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Strong Areas of company</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div
            className={
              companyDetail.length < 3
                ? "individual-comparison-area two-coluam-area"
                : "individual-comparison-area"
            }
            // className=""
          >
            <div className="individual-comparison-title-area">
              <div className="row">
                <div className="First-Compare-area">
                  <div className="title">Company</div>
                  <div className="text-area bg-dark department-wise-column">
                    Department
                  </div>
                  <div className="text-area department-wise-column">State</div>
                  <div className="text-area bg-dark department-wise-column">
                    Ownership
                  </div>
                </div>
                {formData !== undefined &&
                  formData !== null &&
                  [formData.bidder_name_1, formData.bidder_name_2].map(
                    (res, index) => {
                      return (
                        <div className="Second-Compare-area">
                          <div className="title text-center">{res}</div>
                          {/**************************************************/}
                          {StrongPointData !== undefined &&
                            StrongPointData !== null &&
                            StrongPointData.length > 0 &&
                            StrongPointData?.map((res, i) => {
                              return (
                                res !== null &&
                                index === i && (
                                  <>
                                    <div
                                      className="text-area text-center big-text bg-dark department-wise-column-text"
                                      // key={secondIndex}
                                    >
                                      <div className="department-wise-area">
                                        {res !== null &&
                                        res?.departmentInfo !== undefined &&
                                        res.departmentInfo !== null &&
                                        res.departmentInfo.organization_name !==
                                          null &&
                                        res.departmentInfo.organization_name
                                          .length > 0
                                          ? res.departmentInfo.organization_name
                                          : "-"}
                                      </div>
                                      {/* <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <CampaignOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {res.departmentInfo.award_result_count}
                                    </span>
                                    <span className="announcement-second-text">
                                      <CurrencyRupeeOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.departmentInfo.award_result_value
                                      )}
                                    </span>
                                  </div>
                                  <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <FlagOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {
                                        res.departmentInfo
                                          .participated_tender_count
                                      }
                                    </span>
                                    <span className="announcement-second-text">
                                      <EmojiEventsOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.departmentInfo
                                          .participated_tender_value
                                      )}
                                    </span>
                                  </div> */}
                                    </div>
                                    {/* ********************************************** */}
                                    <div
                                      className="text-area text-center big-text  department-wise-column-text"
                                      // key={thirdIndex}
                                    >
                                      <div className="department-wise-area">
                                        {res.stateInfo != null &&
                                        res.stateInfo?.state_name === ""
                                          ? "-"
                                          : res.stateInfo?.state_name}
                                      </div>
                                      {/* <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <CampaignOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {res.stateInfo?.award_result_count}
                                    </span>
                                    <span className="announcement-second-text">
                                      <CurrencyRupeeOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.stateInfo?.award_result_value
                                      )}
                                    </span>
                                  </div>
                                  <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <FlagOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {res.stateInfo?.participated_tender_count}
                                    </span>
                                    <span className="announcement-second-text">
                                      <EmojiEventsOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.stateInfo?.participated_tender_value
                                      )}
                                    </span>
                                  </div> */}
                                    </div>
                                    {/**************************************************/}
                                    <div
                                      className="text-area text-center big-text bg-dark department-wise-column-text"
                                      // key={fourthIndex}
                                    >
                                      <div className="department-wise-area">
                                        {res.ownershipInfo !== null &&
                                        res.ownershipInfo
                                          ?.organization_type_name === ""
                                          ? "-"
                                          : res.ownershipInfo
                                              ?.organization_type_name}
                                      </div>
                                      {/* <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <CampaignOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {res.ownershipInfo?.award_result_count}
                                    </span>
                                    <span className="announcement-second-text">
                                      <CurrencyRupeeOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.ownershipInfo?.award_result_value
                                      )}
                                    </span>
                                  </div>
                                  <div className="announcement-area">
                                    <span className="announcement-first-text">
                                      <FlagOutlinedIcon
                                        className="announcement-icon"
                                        style={{
                                          background: theme.palette.common.main,
                                        }}
                                      />
                                      {
                                        res.ownershipInfo
                                          ?.participated_tender_count
                                      }
                                    </span>
                                    <span className="announcement-second-text">
                                      <EmojiEventsOutlinedIcon
                                        className="rupees-icon"
                                        style={{
                                          color: theme.palette.common.main,
                                        }}
                                      />
                                      {valueConvert(
                                        res.ownershipInfo
                                          ?.participated_tender_value
                                      )}
                                    </span>
                                  </div> */}
                                    </div>
                                  </>
                                )
                              );
                            })}

                          {/**************************************************/}
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default StrongPoint;
