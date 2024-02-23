import * as React from "react";
import { useTheme } from "@mui/material/styles";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import "../../../assets/style/BS5_Grid.css";
import "../../../assets/style/style.css";

import Popover from "@mui/material/Popover";
import Groups from "@mui/icons-material/Groups";
import Typography from "@mui/material/Typography";
import { tenderResultService } from "../../../_services/tenderResultPageServices";
// import { DrawerListingModel } from "../model/DrawerListingModel";
import {
  fromDate,
  toDate,
} from "../../../components/date-input/FromDateToDate";

const DrawerResultListing = ({ drawerData }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [freshResultData, setFreshResultData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Api call for tender result-------------------------------------//>
  const getfreshResult = async () => {
    const res = await tenderResultService.getTenderResult({
      ...DrawerListingModel,
      page_no: page,
      organization_type_name: drawerData,
      participant_name: localStorage.getItem("user_name"),
      publication_date_from: fromDate(),
      publication_date_to: toDate(),
    });
    if (res.Success && res.TotalRecord > 0) {
      setIsError(false);
      setFreshResultData(res.Data);
    } else {
      setIsError(true);
      setFreshResultData([]);
    }
  };

  React.useEffect(() => {
    getfreshResult();
  }, [drawerData]);

  return (
    <div className="FreshResult">
      <div className="listing-main-area">
        {freshResultData.map((result, index) => {
          return (
            <div className="listing-area" key={index}>
              <a>
                <div className="container-fluid">
                  <div className="col-12">
                    <div className="listing-top-area">
                      <div className="row">
                        <div className="col-4">
                          Stage :
                          <span
                            style={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            {result.stage}
                          </span>
                        </div>
                        <div className="col-4 text-center">
                          {index + 1}) Result ID :
                          <span
                            style={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            {result.result_id}
                          </span>
                        </div>
                        <div className="col-4 f-right">
                          {result.contract_date}
                        </div>
                      </div>
                    </div>
                    <div className="listing-mid-area">
                      <div className="row">
                        <div className="col-10">
                          <div className="row">
                            <div className="col-12">
                              <p>{result.result_brief}</p>
                            </div>
                            <div className="col-12">
                              <div className="loaction-area">
                                <PlaceIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                Saharanpur, Uttar Pradesh
                              </div>
                              <div className="authority-area">
                                <ApartmentIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                {result.organization_name}
                              </div>
                              <div className="government-area">
                                <AssuredWorkloadIcon
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                {result.organization_type_name}
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="loaction-area">
                                <Groups
                                  style={{
                                    color: theme.palette.primary.darker,
                                  }}
                                  className="listing-icon"
                                />
                                Participating Bidders
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2 f-right">
                          <div className="value-area">
                            Contract Value
                            <span
                              style={{
                                color: theme.palette.primary.main,
                              }}
                            >
                              INR 3,737.51 CR.
                            </span>
                          </div>
                          <div className="value-area-icon">
                            <a>
                              <FavoriteBorderIcon
                                style={{
                                  color: theme.palette.primary.main,
                                }}
                                className="listing-icon"
                              />
                            </a>
                            <a>
                              <SimCardDownloadIcon
                                style={{
                                  color: theme.palette.primary.main,
                                }}
                                className="listing-icon"
                              />
                            </a>

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
                              <Typography sx={{ p: 2 }} className="share-area">
                                <div className="whatsapp-area">
                                  <a>
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
                                  <a>
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
    </div>
  );
};

export default DrawerResultListing;
