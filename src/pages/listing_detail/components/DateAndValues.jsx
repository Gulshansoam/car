import * as React from "react";
import { alpha } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { useParams } from "react-router-dom";
import { convertToIndianCurrency } from "../../../_helpers/valueConvert";
import { dateConvert, newDateConvert } from "../../../_helpers/date-format";

const DateAndValues = () => {
  const [resultDetail, setResultDetail] = React.useState([]);
  const theme = useTheme();
  const params = useParams();

  React.useEffect(() => {
    tenderDetailServices
      .tenderDetail({
        result_id: params.id,
      })
      .then((res) => {
        if (res.Success === true) {
          setResultDetail(res.Data);
        } else {
          setResultDetail([]);
        }
      })
      .catch((err) => {
        console.log("Tender Detail Date Error" + err);
      });
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }}
      >
        <Typography>Dates & Value</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {resultDetail.length > 0 &&
            resultDetail.map((detail, index) => {
              return (
                <div className="tender-two-area" key={index}>
                  <div className="key-dates-area">
                    <h3>Key Dates</h3>
                    <ul>
                      <li>
                        <span>Submission Date : </span>
                        {(detail.submission_date !== null &&
                          detail.submission_date !== undefined &&
                          detail.submission_date.length > 0) ||
                        detail.submission_date === "1752-12-31" ||
                        detail.submission_date === "1753-01-01"
                          ? dateConvert(detail.submission_date)
                          : "Refer To Document"}
                      </li>

                      <li>
                        <span>Update Date : </span>

                        {detail.stage === "AOC"
                          ? newDateConvert(detail.aoc_update_time)
                          : detail.stage === "Technical"
                          ? newDateConvert(detail.technical_bid_update_time)
                          : detail.stage === "Financial"
                          ? newDateConvert(detail.financial_bid_update_time)
                          : "Refer To Document"}
                      </li>
                    </ul>
                  </div>
                  <div className="key-dates-area">
                    <h3>Values</h3>
                    <ul>
                      <li>
                        <span>Tender Value : </span>{" "}
                        {`${convertToIndianCurrency(
                          detail.tender_value === null
                            ? "Refer Document"
                            : detail.tender_value
                        )}` === "0.00"
                          ? "Refer Documents"
                          : `₹ ${convertToIndianCurrency(
                              detail.tender_value === null
                                ? "Refer Document"
                                : detail.tender_value
                            )}`}
                      </li>
                      <li>
                        <span>Contract Value : </span>{" "}
                        {detail.contract_value === null ||
                        detail.contract_value == "0"
                          ? "Refer Document"
                          : `₹ ${convertToIndianCurrency(
                              detail.contract_value
                            )}`}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default DateAndValues;
