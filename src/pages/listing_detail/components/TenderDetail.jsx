import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { useParams } from "react-router-dom";
import { resultLocationService } from "../../../_services/resultSiteLocationservice";

const TenderDetail = ({ setWinnerBidder, resultDetail, setResultDetail }) => {
  const params = useParams();
  const [siteLocation, setSiteLocation] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    tenderDetailServices
      .tenderDetail({
        result_id: params.id,
      })
      .then((res) => {
        if (res.Success === true) {
          setResultDetail(res.Data);
          setWinnerBidder(res.Data);
        } else {
          setResultDetail([]);
        }
      })
      .catch((err) => {
        console.log("Tender Detail Error" + err);
      });
    //---------------------------------site -location -api -call-----------------------------//
    resultLocationService
      .siteLocation({ result_id: params.id })
      .then((res) =>
        res.Success === true ? setSiteLocation(res.Data) : setSiteLocation([])
      );
    //--------------------------------------------------------------------------------------//
  }, []);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }}
      >
        <Typography>Tender Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {resultDetail.length > 0 &&
            resultDetail.map((detail, index) => {
              return (
                <div className="tender-details-area" key={index}>
                  <p>{detail?.result_brief}</p>
                  <span></span>
                  <ul className="tender-one-area">
                    <li>
                      <span>Result ID :</span> {detail?.result_id}
                    </li>
                    <li>
                      <span>Reference ID : </span> {detail?.tender_number}
                    </li>
                    {detail.name_of_website.length > 0 && (
                      <li>
                        <span>Website : </span>{" "}
                        <a
                          href={detail?.name_of_website}
                          target="_blank"
                          title={detail?.name_of_website}
                        >
                          Click Here
                        </a>
                      </li>
                    )}
                    <li>
                      <span>Department Name : </span>
                      {detail?.organization_name}
                    </li>
                    <li>
                      <span>Ownership : </span> {detail?.organization_type_name}
                    </li>
                    <li>
                      <span>Result Stage : </span> {detail?.stage}
                    </li>
                    {/* ---------------------------for site location------------------------------ */}
                    {siteLocation.map((location, i) => {
                      return (
                        <li key={i}>
                          <span>Location : </span>{" "}
                          {location?.city_name !== undefined &&
                          location?.city_name.length > 0
                            ? location?.city_name
                            : "Refer To Documents"}
                          ,{" "}
                          {location?.state_name !== undefined &&
                          location?.state_name.length > 0
                            ? location?.state_name
                            : "Refer To Documents"}
                        </li>
                      );
                    })}
                    {/* --------------------------------------------------------------------------- */}
                  </ul>
                </div>
              );
            })}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default TenderDetail;
