import * as React from "react";
import "../../assets/style/BS5_Grid.css";
import "../../assets/style/style.css";
import { useTheme } from "@mui/material/styles";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ShareIcon from "@mui/icons-material/Share";
import Groups from "@mui/icons-material/Groups";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Popover from "@mui/material/Popover";
import { Tooltip } from "@mui/material";
import DownloadDoc from "../downloadDocument/DownloadDoc";
import AddToFavourite from "./AddToFavourite";
import { Link } from "react-router-dom";
import { marginDiff } from "../../_helpers/marginDiff";
import { valueConvert } from "../../_helpers/valueConvert";
import ShareOnwhatsappGmail from "../shareOnwhatsappGmail/ShareOnwhatsappGmail";
import {
  convertDateFormat,
  dateConvert,
  newDateConvert,
} from "../../_helpers/date-format";
import { wordHighLighter } from "../../_helpers/wordHighlighter";

const TenderArea = (props) => {
  const {
    tenderResultData,
    openParticipatedBidder,
    setDataFound,
    fromFavorite,
    tenderForm,
    setPage,
  } = props;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="listing-main-area">
        {tenderResultData.map((fresh_result, index) => {
          return (
            <div className="listing-area" key={index}>
              <a>
                <div className="container-fluid">
                  <div className="col-12">
                    <div className="listing-top-area">
                      <div className="row">
                        <div className="col-4">
                          {index + 1}) Result ID :
                          <span>{fresh_result.result_id}</span>
                        </div>
                        <div className="col-4 text-center">
                          Stage :
                          <span
                            style={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            {fresh_result.stage}
                          </span>
                          {
                            <span>
                              ({newDateConvert(fresh_result.status_update_date)}
                              )
                            </span>
                          }
                        </div>
                        <div className="col-4 f-right">
                          <Tooltip
                            title="Tender Submission Date"
                            placement="left"
                          >
                            <span style={{ cursor: "pointer" }}>
                              {dateConvert(fresh_result.submission_date)}
                            </span>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="listing-mid-area">
                      <div className="row">
                        <div className="col-10">
                          <div className="row">
                            <div className="col-12">
                              {tenderForm !== undefined ? (
                                <Link
                                  target={"_blank"}
                                  to={`/dashboard/listingdetails/${fresh_result.result_id}`}
                                >
                                  <p>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: wordHighLighter(
                                          fresh_result.result_brief,
                                          tenderForm?.search_text !==
                                            undefined &&
                                            tenderForm?.search_text !== ""
                                            ? tenderForm?.search_text
                                                .split("-")
                                                .join(" ")
                                                .toLowerCase()
                                            : ""
                                        ),
                                      }}
                                    />
                                  </p>
                                </Link>
                              ) : (
                                <Link
                                  target={"_blank"}
                                  to={`/dashboard/listingdetails/${fresh_result.result_id}`}
                                >
                                  <p>
                                    <span>{fresh_result.result_brief}</span>
                                  </p>
                                </Link>
                              )}
                            </div>
                            <div className="col-12">
                              <div className="loaction-area">
                                <PlaceIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                {fresh_result.location.replace(", India", "")}
                              </div>
                              <div className="authority-area">
                                <ApartmentIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                {fresh_result.organization_name}
                              </div>
                              <div className="government-area">
                                <AssuredWorkloadIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                {fresh_result.organization_type_name}
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="loaction-area participating-bidders-area">
                                <Groups
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                <span
                                  onClick={(e) =>
                                    openParticipatedBidder(e, fresh_result)
                                  }
                                >
                                  List of Bidders
                                </span>
                              </div>
                            </div>
                            <div className="col-12">
                              {fresh_result?.stage === "AOC" &&
                                fresh_result?.winner_bidder_name !== null &&
                                fresh_result?.winner_bidder_name.length > 0 && (
                                  <>
                                    <div
                                      className="location-area bidder-area"
                                      style={{
                                        borderColor:
                                          theme.palette.primary.darker,
                                        color: theme.palette.primary.darker,
                                      }}
                                    >
                                      <EmojiEventsIcon
                                        style={{
                                          color: theme.palette.primary.darker,
                                        }}
                                        variant="contained"
                                        size="large"
                                        className="listing-icon"
                                      />
                                      {fresh_result?.winner_bidder_name.includes(
                                        ","
                                      ) ? (
                                        <Tooltip
                                          title={
                                            fresh_result?.winner_bidder_name
                                          }
                                          placement="right"
                                        >
                                          <span style={{ cursor: "pointer" }}>
                                            {"Multiple Winner Bidders"}
                                          </span>
                                        </Tooltip>
                                      ) : (
                                        fresh_result?.winner_bidder_name
                                      )}
                                    </div>
                                  </>
                                )}
                              {fresh_result?.stage === "AOC" && (
                                <div className="loaction-area contract-value-area">
                                  <CurrencyRupeeIcon
                                    style={{
                                      color: theme.palette.primary.darker,
                                    }}
                                    className="listing-icon"
                                  />
                                  Contract Value :{" "}
                                  <span
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {fresh_result?.contract_value === 0
                                      ? "Refer To Documents"
                                      : `₹ ${valueConvert(
                                          fresh_result?.contract_value
                                        )}`}{" "}
                                    {fresh_result?.stage === "AOC" &&
                                    fresh_result?.contract_value !== 0 &&
                                    fresh_result?.tender_value !== 0
                                      ? `(${marginDiff(
                                          fresh_result?.tender_value,
                                          fresh_result?.contract_value
                                        )})`
                                      : ""}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 f-right">
                          <div className="value-area">
                            Estimated Value
                            <span
                              style={{
                                color: theme.palette.primary.main,
                              }}
                            >
                              {fresh_result?.tender_value === 0
                                ? "Refer to Documents"
                                : `₹ ${valueConvert(
                                    fresh_result?.tender_value
                                  )}`}
                            </span>
                          </div>
                          <div className="value-area-icon">
                            <AddToFavourite
                              result={fresh_result}
                              setDataFound={setDataFound}
                              fromFavorite={fromFavorite}
                              setPage={setPage}
                            />

                            <DownloadDoc resultId={fresh_result?.result_id} />
                            <ShareIcon
                              aria-describedby={id}
                              variant="contained"
                              onClick={handleClick}
                              style={{
                                color: theme.palette.primary.main,
                              }}
                              className="listing-icon share-btton"
                            />
                            <Popover
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              id={id}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                            >
                              <ShareOnwhatsappGmail
                                TenderId={fresh_result?.result_id}
                              />
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TenderArea;
