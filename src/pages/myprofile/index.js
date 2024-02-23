import React from "react";
import { Alert, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { userService } from "../../_services/userControllerService";
import { useState } from "react";
import ChangePassword from "./components/ChangePassword";
import ProfileCover from "./components/ProfileCover";
import UserIcon from "../../assets/images/user-img.png";
import { Helmet } from "react-helmet-async";
import { dateConvert } from "../../_helpers/date-format";
import { convertToIndianCurrency } from "../../_helpers/valueConvert";
import api from "../../_apiConfig/baseapi";
import PlanModal from "./components/PlanModal";
import { LoadingButton } from "@mui/lab";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const MyProfile = () => {
  const theme = useTheme();
  // const { themeStretch } = useSettingsContext();

  const [userData, setUserData] = useState([]);
  const [managerDetails, setManagerDetails] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceLoader, setInvoiceLoader] = useState(false);

  const [feedBack, setFeedBack] = useState("");
  const [isFeedbackSent, setIsFeedBackSent] = useState(false);
  const [feedBackClickCheck, setFeedBackClickCheck] = useState(false);
  // const [loading, setLoading] = useState(false);

  //************************************************************/
  const [modalOpen, setModalOpen] = React.useState(false);
  const [planOption, setPlanOption] = useState("option1");
  const [modalComment, setModalComment] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    userService
      .getUserProfileDetail({
        user_id: localStorage.getItem("user_id"),
      })
      .then((res) => {
        if (res.Success === true) {
          setUserData(res.Data);
        } else {
          setUserData([]);
        }
      })
      .catch((err) => {
        console.log("Myprofile Error :-" + err);
      });
    keyManagerDetail();
    getInvoiceDetails();
  }, []);

  const keyManagerDetail = async () => {
    const res = await userService.getKeyManager();
    res.Success && setManagerDetails(res.Data);
  };

  const getInvoiceDetails = async () => {
    const res = await userService.getInvoiceDetails(
      localStorage.getItem("user_id")
      // 337195
    );
    res.Success && setInvoiceDetails(res.Data);
  };

  const handleSubmitFeedback = async () => {
    setIsFeedBackSent(true);
    if (feedBack.trim() === "") {
      setFeedBackClickCheck(true);
      setIsFeedBackSent(false);
      setTimeout(() => {
        setFeedBackClickCheck(false);
      }, 2000);
    }
    if (feedBack.length > 0) {
      const res = await userService.getUserPlan({
        comments: feedBack,
        plan: "feedback",
      });
      if (res.Success === true) {
        setIsFeedBackSent(true);
        setTimeout(() => {
          setIsFeedBackSent(false);
        }, 3000);
      } else alert("Something! Went Wrong Please Try Again After Sometime");
    }
  };

  const handleClearFeedback = () => {
    setIsFeedBackSent(false);
    setFeedBackClickCheck(false);
    setFeedBack("");
  };

  const handleDownload = () => {
    if (invoiceDetails.length > 0) {
      window.location.href = `${
        api.defaults.DonwloadDoc
      }/T247ApiAnalytics/api/company/download-invoice-file?invoiceId=${
        invoiceDetails[0].ConfirmInvoiceID
      }&invoiceType=${2}`;
      setInvoiceLoader(true);
      setTimeout(() => {
        setInvoiceLoader(false);
      }, 2000);
    } else alert("No Invoice Found please Contact To Your Key Manager");
  };

  const handleModalOpen = (plantype) => {
    setModalComment("");
    switch (plantype) {
      case "stateUpgrade":
        setPlanOption("option1");
        setModalOpen(true);
        setPlan("State Upgrade");
        break;
      case "panIndia":
        setPlan("Pan India");
        setModalOpen(true);
        setPlanOption("option2");
        break;
      case "Category":
        setPlanOption("option3");
        setPlan("Category");
        setModalOpen(true);
        break;
      case "Duration":
        setPlanOption("option4");
        setPlan("Duration");
        setModalOpen(true);
        break;
      default:
        setPlanOption("option1");
        setModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <ProfileCover />

      <div className="profile-main-area">
        <div className="profile-pic">
          <img src={UserIcon}></img>
        </div>
        <div className="profile-content">
          <Typography variant="h4">
            {localStorage.getItem("user_name")}
          </Typography>
        </div>
      </div>

      <div className="profile-content-main-area">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <div className="profile-lft-content">
                {userData.length > 0 &&
                  userData.map((res, index) => {
                    return (
                      <>
                        <div className="subscription-area">
                          <h4>Last date of Subscription</h4>
                          <h3>
                            {res?.last_date_of_subscription === undefined &&
                            res?.last_date_of_subscription === null
                              ? "Contact to Key Manager"
                              : dateConvert(res?.last_date_of_subscription)}
                          </h3>
                        </div>
                        <div className="subscription-area">
                          <h4>Subscription Date</h4>
                          <h3>
                            {dateConvert(res?.subscription_date) ??
                              "Contact to Key Manager"}
                          </h3>
                        </div>
                        <div className="subscription-area">
                          <h4>Subscription Amount</h4>
                          <h3>
                            {res?.subscription_amount === parseInt(0)
                              ? "Free"
                              : `₹ ${convertToIndianCurrency(
                                  res?.subscription_amount
                                )}`}
                          </h3>
                        </div>
                      </>
                    );
                  })}

                <div className="profile-about-us">
                  <h3>Key Manager Details</h3>
                  <div className="profile-about-us-text">
                    <h4>{managerDetails.name}</h4>
                    <p>
                      <span>Email:</span>
                      <a
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {managerDetails?.email}
                      </a>
                    </p>
                    <p>
                      <span>Mobile:</span>
                      <a
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        {managerDetails?.mobile}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="profile-lft-content">
                <div className="tax-invoice-area">
                  <h3>Tax Invoice</h3>
                  <div className="dark-button">
                    <LoadingButton
                      color="secondary"
                      onClick={handleDownload}
                      loading={invoiceLoader}
                      loadingPosition="start"
                      variant="contained"
                      style={{
                        backgroundColor: theme.palette.primary.darker,
                        color: theme.palette.common.white,
                      }}
                    >
                      <FileDownloadOutlinedIcon className="download-icon" />
                      Download
                    </LoadingButton>
                  </div>
                  {invoiceLoader && (
                    <Alert severity="success">Please Wait...</Alert>
                  )}
                </div>
              </div>
            </div>
            <div className="col-9">
              {/* *********************************key manager details******************** */}
              <div className="profile-rgt-content">
                <div className="subscribe-category">
                  <h3>Upgrade Plan Request</h3>
                  <div className="upgrade-plan-request-area">
                    <div className="myprofile-details-area-btn">
                      <a
                        style={{
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            theme.palette.action.selectedOpacity
                          ),
                        }}
                        onClick={() => handleModalOpen("stateUpgrade")}
                      >
                        State Upgrade
                      </a>
                      <a
                        style={{
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            theme.palette.action.selectedOpacity
                          ),
                        }}
                        onClick={() => handleModalOpen("panIndia")}
                      >
                        Pan India
                      </a>
                      <a
                        style={{
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            theme.palette.action.selectedOpacity
                          ),
                        }}
                        onClick={() => handleModalOpen("Category")}
                      >
                        Category
                      </a>
                      <a
                        style={{
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            theme.palette.action.selectedOpacity
                          ),
                        }}
                        onClick={() => handleModalOpen("Duration")}
                      >
                        Duration
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* ********************************************************************/}

              {/* ******************Subscribe-Category********************* */}
              {userData.length > 0 && (
                <div className="profile-rgt-content">
                  <div className="subscribe-category">
                    <h3>Subscribe Category</h3>
                    {/* {userData.length > 0 &&
                      userData.map((res) =>
                        res?.subscribe_category.map((resp) => (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: resp,
                            }}
                          />
                        ))
                      )} */}
                      <span
                            dangerouslySetInnerHTML={{
                              __html: userData[0].subscribe_category,
                            }}
                          />
                  </div>
                </div>
              )}
              {/* ******************************************** */}

              <div className="profile-rgt-content">
                <div className="write-feedback">
                  <h3>Write Feedback</h3>
                  <div className="write-feedback-text">
                    <div className="myprofile-details-area">
                      <div className="subscribe-category-text-area">
                        <div className="write-feedback-area">
                          <textarea
                            placeholder="Comments..."
                            value={feedBack}
                            onChange={(e) => setFeedBack(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="myprofile-details-area-btn">
                          <LoadingButton
                            className="plan-btn"
                            onClick={handleSubmitFeedback}
                            loading={isFeedbackSent}
                            variant="contained"
                            sx={{
                              bgcolor: theme.palette.primary.darker,
                              color: (theme) => theme.palette.primary.white,
                              "&:hover": {
                                bgcolor: "text.primary",
                                color: (theme) =>
                                  theme.palette.mode === "light"
                                    ? "common.white"
                                    : "grey.800",
                              },
                            }}
                          >
                            <span>Submit</span>
                          </LoadingButton>
                          <a
                            onClick={() => handleClearFeedback()}
                            style={{
                              color: theme.palette.primary.main,
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                theme.palette.action.selectedOpacity
                              ),
                            }}
                          >
                            Clear
                          </a>
                        </div>
                      </div>
                    </div>
                    {isFeedbackSent && (
                      <Alert severity="success" style={{ width: "100%" }}>
                        We have Received your Feedback, Our Team will Contact
                        you Shortly.
                      </Alert>
                    )}
                    {feedBackClickCheck && feedBack.length === 0 && (
                      <Alert severity="error" style={{ width: "100%" }}>
                        Please! Give us Your valueable Feedback first.
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-rgt-content">
                <ChangePassword />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlanModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        planOption={planOption}
        setPlanOption={setPlanOption}
        modalComment={modalComment}
        setModalComment={setModalComment}
        plan={plan}
        setPlan={setPlan}
      />
    </>
  );
};

export default MyProfile;
