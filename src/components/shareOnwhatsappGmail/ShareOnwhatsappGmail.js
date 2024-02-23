import React from "react";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTheme } from "@mui/material/styles";

const ShareOnwhatsappGmail = (TenderId) => {
  const theme = useTheme();

  const shareOnGmail = (e, Tender247Id) => {
    // let GetDetailsPage = "TenderDetails";
    // let url = "https://www.tender247.com/" + GetDetailsPage + "/" + Tender247Id;
    // let Subject =
    //   "T247 ID:" +
    //   Tender247Id +
    //   " shared by " +
    //   localStorage.getItem("user_name");
    // let gmailUrl =
    //   "https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=" +
    //   Subject +
    //   "&body=" +
    //   url +
    //   "&ui=2&tf=1";
    // window.open(gmailUrl, "_blank");
  };

  const shareOnWhatsApp = (e, Tender247Id) => {
    // window.open(
    //   "https://api.whatsapp.com/send?text=https://tender247.com/" +
    //     "TenderDetails" +
    //     "/" +
    //     Tender247Id +
    //     "/",
    //   "_blank"
    // );
  };

  return (
    <Typography sx={{ p: 2 }} className="share-area">
      <div className="whatsapp-area">
        <a onClick={(e) => shareOnWhatsApp(e, TenderId.TenderId)}>
          <WhatsAppIcon
            style={{
              color: theme.palette.primary.darker,
            }}
            className="listing-icon"
          />
          Whatsapp
        </a>
      </div>
      <div className="whatsapp-area">
        <a onClick={(e) => shareOnGmail(e, TenderId.TenderId)}>
          <MailOutlineIcon
            style={{
              color: theme.palette.primary.darker,
            }}
            className="listing-icon"
          />
          Email
        </a>
      </div>
    </Typography>
  );
};

export default ShareOnwhatsappGmail;
