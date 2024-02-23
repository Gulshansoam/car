import React from "react";
import { valueConvert } from "../../_helpers/valueConvert";
import { Skeleton } from "@mui/material";

const CountCard = (props) => {
  const {
    handleClickEvent,
    tenderClickEvent,
    loader,
    resultValue,
    bidderCount,
    heading,
    subHeading,
    mapIcon,
  } = props;
  const sessionData = sessionStorage.getItem("bidModel");

  const handleClick = (e, key) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    switch (key) {
      case "Result Published":
        tenderClickEvent();
        break;
      case "Company's Particiapted Results":
        handleClickEvent();
        break;
      case "Awarded Contracts":
        tenderClickEvent();
        break;
      case "Competitors":
        handleClickEvent();
        break;
      case "Result TBA":
        tenderClickEvent();
        break;
      case "Company Result":
        handleClickEvent();
        break;

      case "Company's Contract":
        handleClickEvent();
        break;

      default:
        break;
    }
  };

  function displayCount(value, count) {
    if (value !== undefined && count !== undefined) {
      return (
        <>
          <span onClick={(e) => handleClick(e, heading)}>{` ${value}`}</span>
          <span>|</span>
          <span onClick={(e) => handleClick(e, subHeading)}>{count}</span>
        </>
      );
    } else if (!value && count !== undefined) {
      return (
        <>
          <span onClick={(e) => handleClick(e, heading)}>{`${count}`}</span>
        </>
      );
    }
  }

  return (
    <div className="total-result-box">
      <div className="result-published-text">
        <h4>{heading}</h4>
        <p>{subHeading}</p>
      </div>
      <div className="total-result-published-rgt-text">
        <img src={mapIcon} />
      </div>
      {loader ? (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      ) : (
        <>
          <h2>{displayCount(resultValue, bidderCount)}</h2>
        </>
      )}
    </div>
  );
};

export default CountCard;
