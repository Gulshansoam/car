import React from "react";
import { useTheme } from "@mui/material/styles";
import GetAppIcon from "@mui/icons-material/GetApp";
import { dowloadExcel } from "../../_services/downloadExcel";
import api from "../../_apiConfig/baseapi";

const DowloadExcelBtn = (props) => {
  const { tenderForm, value, pageName, title, setPage } = props;
  const theme = useTheme();

  const handleExcelDownload = async () => {
    // setPage(1);
    if (pageName === "tenderListing") {
      if (value === "2") {
        await dowloadExcel.getDownloadExcelKey(tenderForm).then((res) => {
          if (res.Success) {
            console.log(
              `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`
            );
            window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
          } else alert("No Data found");
        });
      } else if (value === "1") {
        await dowloadExcel
          .getDownloadExcelKey({
            ...tenderForm,
            tender_status: 3,
            tab_id: 1,
          })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            } else alert("No Data found");
          });
      } else if (value === "3") {
        await dowloadExcel
          .getDownloadExcelKey({
            ...tenderForm,
            tender_status: 5,
            bidder_name: localStorage.getItem("user_name"),
          })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            } else alert("No Data found");
          });
      } else if (value === "4") {
        await dowloadExcel
          .getDownloadExcelKey({ ...tenderForm, tender_status: 4 })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            } else alert("No Data found");
          });
      }
    } else {
      if (value === "1") {
        await dowloadExcel
          .getDownloadExcelKey({ ...tenderForm, tender_status: 7 })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            }
          });
      } else if (value === "2") {
        await dowloadExcel
          .getDownloadExcelKey({ ...tenderForm, tender_status: 6 })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            }
          });
      } else if (value === "3") {
        await dowloadExcel
          .getDownloadExcelKey({
            ...tenderForm,
            tender_status: 1,
          })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            }
          });
      } else if (value === "4") {
        await dowloadExcel
          .getDownloadExcelKey({ ...tenderForm, tender_status: 2 })
          .then((res) => {
            if (res.Success) {
              window.location.href = `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${res?.Data}`;
            }
          });
      }
    }
  };

  return (
    <div
      className="location-area bidder-area"
      onClick={handleExcelDownload}
      style={{
        borderColor: theme.palette.primary.darker,
        color: theme.palette.primary.darker,
      }}
    >
      <GetAppIcon
        style={{
          color: theme.palette.primary.darker,
        }}
        variant="contained"
        size="large"
        className="listing-icon"
      />
      Download Excel
    </div>
  );
};

export default DowloadExcelBtn;
