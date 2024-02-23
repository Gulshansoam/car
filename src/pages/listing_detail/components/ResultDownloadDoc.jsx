import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import { useEffect } from "react";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { useParams } from "react-router-dom";
import api from "../../../_apiConfig/baseapi";

const ResultDownloadDoc = () => {
  const [documentList, setDocumentList] = useState([]);
  const [resultDetail, setResultDetail] = useState([]);
  const theme = useTheme();
  const params = useParams();

  useEffect(() => {
    tenderDetailServices
      .getDocumentList({
        result_id: params.id,
      })
      .then((res) => {
        if (res.Success === true) {
          setDocumentList(res.Data);
        } else {
          setDocumentList([]);
        }
      })
      .catch((err) => {
        console.log("Tender Detail Result Document List Error" + err);
      });
  }, []);

  useEffect(() => {
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
        console.log("Tender Detail Error" + err);
      });
  }, []);

  const handleDownloadDocument = (e, document) => {
    tenderDetailServices
      .downloadSingleDocument(document?.document_path)
      .then((res) => {
        if (res.Success === false) {
          alert("No Document Found");
          return;
        }
        window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/download-for-single?document_path=${document?.document_path}`;
      });
  };

  const handleDownloadAllDocuments = (e, document_path) => {
    tenderDetailServices.downloadAllDocument(document_path).then((res) => {
      if (res.Success === false) {
        alert("No Document Found");
        return;
      }
      window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/download-for-zip?document_path=${document_path}`;
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
        <Typography>Result Document Download</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="download-main-area">
            {/* <div className="download-area">
              <div className="aoc-document">
                {documentList.length > 0 &&
                  documentList.map((document, index) => {
                    return (
                      <div className="aoc-document-area" key={index}>
                        {document?.document_type_name} :
                        <a
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: theme.palette.primary.darker,
                              color: theme.palette.common.white,
                            }}
                            onClick={(e) => handleDownloadDocument(e, document)}
                          >
                            <FileDownloadOutlinedIcon
                              style={{
                                color: theme.palette.primary.darker,
                              }}
                              className="listing-icon"
                            />
                            Download
                          </span>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div> */}
            <div className="download-all-area">
              {resultDetail.length > 0 &&
                resultDetail.map((res, index) => {
                  return (
                    <a
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: theme.palette.primary.darker,
                          color: theme.palette.common.white,
                        }}
                        onClick={(e) =>
                          handleDownloadAllDocuments(e, res.document_path)
                        }
                      >
                        <FileDownloadOutlinedIcon
                          style={{
                            color: theme.palette.primary.darker,
                          }}
                          className="listing-icon"
                        />
                        Download All Documents
                      </span>
                    </a>
                  );
                })}
              (Click here to Download all the Documents in a Zip file)
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ResultDownloadDoc;
