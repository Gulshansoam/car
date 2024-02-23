import React from "react";
import { alpha } from "@mui/material/styles";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  convertToIndianCurrency,
  valueConvert,
} from "../../../_helpers/valueConvert";
import { encodeString } from "../../../_helpers/encodeDecode";
import { useSelector, useDispatch } from "react-redux";
import {
  setListingModel,
  setSelectedListing,
  setBidderName,
  setResultListingModel,
} from "../../../redux/slice";

const RelatedKeyword = ({ winnerBidder }) => {
  const dispatch = useDispatch();
  const detailListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const theme = useTheme();
  const [relatedWord, setRelatedWord] = useState([]);
  const params = useParams();

  useEffect(() => {
    tenderDetailServices
      .getRelatedWord({ result_id: params.id })
      .then((res) => {
        if (res.Success === true) {
          setRelatedWord(res.Data);
        } else {
          setRelatedWord([]);
        }
      })
      .catch((err) => {
        console.log("Tender Detail Related Keyword Error" + err);
      });
  }, []);

  const sessionData = sessionStorage.getItem("bidModel");

  const handleKeyword = (res, i) => {
    if (sessionData !== null) {
      sessionStorage.removeItem("bidModel");
    }
    if (detailListing.keyword_ids !== null && winnerBidder !== undefined) {
      dispatch(
        setResultListingModel({
          ...detailListing,
          keyword_ids: res,
          tender_status: 0,
        })
      );
      window.open("/dashboard/tender-result");
    }
  };

  return (
    <div className="col-3">
      {winnerBidder.length > 0 &&
        winnerBidder.map((res) => {
          return (
            <>
              {res.stage === "AOC" ? (
                <>
                  <div
                    className="contractor-details-area"
                    style={{
                      color: theme.palette.primary.main,
                      backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                      ),
                    }}
                  >
                    <EmojiEventsOutlinedIcon className="contractor-icon" />
                    <h4>Contractor Details</h4>
                    <p>{res?.winner_bidder_name}</p>
                    <h6>₹ {convertToIndianCurrency(res?.contract_value)}</h6>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}

      <div className="related-keyword-area">
        <h4
          style={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          }}
        >
          Related Keyword
        </h4>
        <div className="related-keyword-text">
          <ul>
            {relatedWord.length > 0 &&
              relatedWord.map((res, index) => {
                return (
                  <div key={index}>
                    <li onClick={() => handleKeyword(res, index)}>
                      {res?.keyword_name}
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RelatedKeyword;
