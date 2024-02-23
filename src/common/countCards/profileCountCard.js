import React from "react";
import { valueConvert } from "../../_helpers/valueConvert";
import { Skeleton } from "@mui/material";

const ProfileCountCard = (props) => {
  const {
    handleMyParticipated,
    handleMyAwardedValue,
    handleLostTenders,
    handleResultTBA,
    loader,
    resultCount,
    resultValue,
    mapIcon,
    heading,
  } = props;
  const sessionData = sessionStorage.getItem("bidModel");

  const handleClickEvent = (e, key) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "Awarded Tenders":
        handleMyAwardedValue();
        break;
      case "Result TBA":
        handleResultTBA();
        break;
      case "Lost Tenders":
        handleLostTenders();
        break;
      case "Participated Tenders":
        handleMyParticipated();
        break;
      default:
        break;
    }
  };

  return (
    <div className="total-result-box" style={{ cursor: "pointer" }}>
      <div className="total-result-published-rgt-text">
        <img src={mapIcon} />
      </div>
      <h4>{heading}</h4>
      {loader ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : (
        <>
          {resultCount > 0 ? (
            <span onClick={(e) => handleClickEvent(e, heading)}>
              {valueConvert(resultCount)} Tender
            </span>
          ) : (
            <span>0 Tender</span>
          )}

          {resultValue > 0 ? (
            <h2 onClick={(e) => handleClickEvent(e, heading)}>
              ₹ {valueConvert(resultValue)}
            </h2>
          ) : (
            <h2>₹ 0</h2>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCountCard;
