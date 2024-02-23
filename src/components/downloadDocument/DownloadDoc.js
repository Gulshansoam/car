import React from "react";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { tenderDetailServices } from "../../_services/tenderDetailServices";
import { useTheme } from "@mui/material/styles";
import api from "../../_apiConfig/baseapi";

const DownloadDoc = (resultId) => {
  const theme = useTheme();

  const handleDownloadAllDocuments = (e, result_Id) => {
    tenderDetailServices
      .tenderDetail({
        result_id: result_Id,
      })
      .then((res) => {
        if (res.Success === true) {
          const docPath = res?.Data[0]?.document_path;
          tenderDetailServices.downloadAllDocument(docPath).then((res) => {
            if (res.Success === false) {
              alert("No Document Found");
              return;
            }
            window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/download-for-zip?document_path=${docPath}`;
          });
        }
      })
      .catch((err) => {
        console.log("Tender Detail Error" + err);
      });
  };

  return (
    <a
      style={{ cursor: "pointer" }}
      onClick={(e) => handleDownloadAllDocuments(e, resultId.resultId)}
    >
      <SimCardDownloadIcon
        style={{
          color: theme.palette.primary.main,
        }}
        className="listing-icon"
      />
    </a>
  );
};

export default DownloadDoc;
