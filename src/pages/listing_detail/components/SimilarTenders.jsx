import React from "react";
import { useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BidderListModal from "../../../components/modal/BidderListModal";
import { tenderResultService } from "../../../_services/tenderResultPageServices";

import { alpha } from "@mui/material/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TenderArea from "../../../components/tender-area/TenderArea";
import { Skeleton } from "@mui/material";

const SimilarTenders = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [similarResult, setSimilarResult] = React.useState([]);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modelData, setModelData] = React.useState([]);
  const [modalStage, setModalStage] = React.useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const theme = useTheme();
  const params = useParams();
  const [loader, setLoader] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoader(true);
    tenderDetailServices
      .getSimilarResult({
        result_id: parseInt(params.id),
        user_id: parseInt(localStorage.getItem("user_id")),
        user_query_id: parseInt(
          localStorage.getItem("user_email_service_query_id")
        ),
      })
      .then((res) => {
        if (res.Success === true) {
          setLoader(false);
          setSimilarResult(res.Data);
        } else {
          setLoader(false);
          setSimilarResult([]);
        }
      })
      .catch((err) => {
        setLoader(true);
        console.log("Tender Detail Similar Result Error" + err);
      });
  }, []);

  const openParticipatedBidder = (e, fresh_result) => {
    setModelOpen(true);
    setModalStage(fresh_result.stage.toLowerCase());
    tenderResultService
      .getParticipatingBidder({ result_id: fresh_result.result_id })
      .then((res) => {
        if (res.Success) {
          setModelData(
            res.Data.map((obj) => {
              return { ...obj, result_id: fresh_result.result_id };
            })
          );
        } else {
          setModelData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4a-content"
        id="panel4a-header"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }}
      >
        <Typography>Similar Result</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <>
            {loader === true ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : similarResult.length === 0 ? (
              <h3>No Data Found</h3>
            ) : (
              <div className="FreshResult">
                <TenderArea
                  tenderResultData={similarResult}
                  openParticipatedBidder={openParticipatedBidder}
                />

                <BidderListModal
                  modelOpen={modelOpen}
                  setModelOpen={setModelOpen}
                  modelData={modelData}
                  modalStage={modalStage}
                />
              </div>
            )}
          </>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default SimilarTenders;
