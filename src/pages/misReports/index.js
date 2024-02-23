import React, { Suspense, lazy } from "react";
import { useState, useEffect, useContext } from "react";
import MisFilters from "./misFilters/MisFilters";
const StateWiseTableMIS = lazy(() => import("./components/StateWiseTableMIS"));
const DepartmentMisChart = lazy(() =>
  import("./components/DepartmentMisChart")
);
const ValueChart = lazy(() => import("./components/ValueChart"));
const CompetitorsTableMis = lazy(() =>
  import("./components/CompetitorsTableMis")
);
const BiddersChart = lazy(() => import("./components/BiddersChart"));
const OwnerShipChart = lazy(() => import("./components/OwnerShipChart"));
const CategoryChart = lazy(() => import("./components/CategoryChart"));
const MonthWiseChart = lazy(() => import("./components/MonthWiseChart"));
import { useTheme } from "@mui/material/styles";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { Button, Chip, Container, Grid } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useSettingsContext } from "../../components/settings";
import FullscreenImg from "../../assets/images/fullscreen.png";
import { Modal } from "antd";
import Loader from "../../components/loading-screen/Loader";

const MisReports = () => {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const { selectedFromDate, selectedToDate, isDateSelected } =
    useContext(selectedDateRange);
  const [misReportForm, setMisReportForm] = useState({
    state_id: 0,
    product_id: 0,
    tender_value_operator: 0,
    tender_value_from: 0,
    tender_value_to: 0,
    bidder_name: "",
    publication_date_from: selectedFromDate,
    publication_date_to: selectedToDate,
    organization_id: 0,
    organization_type_id: 0,
    search_text: "",
    keyword_id: 0,
    sub_industry_id: 0,
    is_exact_search: false,
    user_id: 0,
    user_query_id: 0,
    page_no: 1,
    record_per_page: 5,
  });

  const [isMisReportGenrate, setIsMisReportGenrate] = useState(false);
  const [wordSearch, setWordSearch] = useState("");
  const [stateTag, setStateTag] = useState(null);
  const [tenderOwnershipTag, setTenderOwnershipTag] = useState(null);
  const [departmentTag, setDepartmentTag] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [keywordTags, setKeyWordTags] = useState(null);
  const [productTags, setProductTags] = useState(null);
  const [bidderName, setBidderName] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [subIndustryTag, setSubIndustryTag] = useState(null);

  // ******************************pdf-button-loader***********************//
  const [pdfBtnLoader, setPdfBtnLoader] = useState(false);
  const [pdfBtnModalOpen, setPdfBtnModalOpen] = useState(false);

  const [stateTableModalOpen, setStateTableModalOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [bidderModalOpen, setBidderModalOpen] = useState(false);
  const [ownershipModalOpen, setOwnershiprModalOpen] = useState(false);
  const [monthWiseModalOpen, setMonthWiseModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [valueModalOpen, setValueModalOpen] = useState(false);
  const [competitorsModalOpen, setCompetitorsModalOpen] = useState(false);

  const allModalOpen = (category) => {
    switch (category) {
      case "stateTableMis":
        setStateTableModalOpen(true);
        break;
      case "misDepartmentChart":
        setDepartmentModalOpen(true);
        break;
      case "misBidderChart":
        setBidderModalOpen(true);
        break;
      case "misOwnerShipChart":
        setOwnershiprModalOpen(true);
        break;
      case "misMonthWiseChart":
        setMonthWiseModalOpen(true);
        break;
      case "misCategoryChart":
        setCategoryModalOpen(true);
        break;
      case "misValueChart":
        setValueModalOpen(true);
        break;
      case "misCompetitorsTable":
        setCompetitorsModalOpen(true);
        break;

      default:
        console.log("Something went wrong");
        break;
    }
  };

  const allModalClose = (category) => {
    switch (category) {
      case "stateTableMis":
        setStateTableModalOpen(false);
        break;
      case "misDepartmentChart":
        setDepartmentModalOpen(false);
        break;
      case "misBidderChart":
        setBidderModalOpen(false);
        break;
      case "misOwnerShipChart":
        setOwnershiprModalOpen(false);
        break;
      case "misMonthWiseChart":
        setMonthWiseModalOpen(false);
        break;
      case "misCategoryChart":
        setCategoryModalOpen(false);
        break;
      case "misValueChart":
        setValueModalOpen(false);
        break;
      case "misCompetitorsTable":
        setCompetitorsModalOpen(false);
        break;

      default:
        console.log("Something went wrong");
        break;
    }
  };

  useEffect(() => {
    if (isDateSelected) {
      setMisReportForm((prev) => ({
        ...prev,
        publication_date_from:
          selectedFromDate !== undefined &&
          selectedFromDate !== null &&
          selectedFromDate.length > 0
            ? selectedFromDate
            : null,
        publication_date_to:
          selectedToDate !== undefined &&
          selectedToDate !== null &&
          selectedToDate.length > 0
            ? selectedToDate
            : null,
      }));
    } else {
      setMisReportForm((prev) => ({
        ...prev,
        publication_date_from: selectedFromDate,
        publication_date_to: selectedToDate,
      }));
    }
  }, [selectedFromDate, selectedToDate, isDateSelected]);

  const handleDelete = (e, res) => {
    setAllTags(
      allTags !== null &&
        allTags.filter((prev) => JSON.stringify(prev) !== JSON.stringify(res))
    );
    switch (res.type) {
      case "Word Search":
        setWordSearch("");
        setMisReportForm((prev) => ({ ...prev, search_text: "" }));

        break;
      case "state":
        setStateTag(null);
        setMisReportForm((prev) => ({ ...prev, state_id: 0 }));

        break;
      case "Keyword":
        setKeyWordTags(null);
        setMisReportForm((prev) => ({ ...prev, keyword_id: 0 }));

        break;
      case "Ownership":
        setTenderOwnershipTag(null);
        setMisReportForm((prev) => ({ ...prev, organization_type_id: 0 }));

        break;
      case "Department":
        setDepartmentTag(null);
        setMisReportForm((prev) => ({ ...prev, organization_id: 0 }));

        break;
      case "Category":
        setProductTags(null);
        setMisReportForm((prev) => ({ ...prev, product_id: 0 }));

        break;
      case "Participated Bidders":
        setBidderName(null);
        setMisReportForm((prev) => ({ ...prev, bidder_name: "" }));

        break;
      case "Date":
        setFromDate("");
        setToDate("");
        setMisReportForm((prev) => ({
          ...prev,
          publication_date_from: selectedFromDate,
          publication_date_to: selectedToDate,
        }));

        break;
      case "SubIndustry":
        setSubIndustryTag(null);
        setMisReportForm((prev) => ({ ...prev, sub_industry_id: 0 }));

        break;
    }
  };

  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-GB", options);
  const generateAndDownloadPDF = async () => {
    try {
      setPdfBtnLoader(true);
      setPdfBtnModalOpen(true);
      const response = await fetch(
        "http://192.168.8.71:7247/misapi/T247Mis/api/download-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...misReportForm,
            user_id: 7,
            user_query_id: 231368,
            publication_date_from: selectedFromDate,
            publication_date_to: selectedToDate,
            user_name: localStorage.getItem("user_name"),
            state_name: stateTag !== null ? stateTag.state_name : "",
            organization_name:
              departmentTag !== null ? departmentTag.organization_name : "",
            organization_type_name:
              tenderOwnershipTag !== null
                ? tenderOwnershipTag.organization_type_name
                : "",
            sub_industry_name:
              subIndustryTag !== null ? subIndustryTag.sub_industry_name : "",
            product_name: productTags !== null ? productTags.keyword_name : "",
            keyword_name: keywordTags !== null ? keywordTags.keyword_name : "",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.blob();
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Mis_Report-${formattedDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setPdfBtnLoader(false);
      setPdfBtnModalOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfBtnLoader(false);
      setPdfBtnModalOpen(false);
    }
  };

  return (
    <>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <div className="mis-report-area-new">
            <div className="row">
              <div className="col-12">
                <MisFilters
                  className="MuiAccordion-gutters"
                  setIsMisReportGenrate={setIsMisReportGenrate}
                  wordSearch={wordSearch}
                  setWordSearch={setWordSearch}
                  stateTag={stateTag}
                  setStateTag={setStateTag}
                  tenderOwnershipTag={tenderOwnershipTag}
                  setTenderOwnershipTag={setTenderOwnershipTag}
                  departmentTag={departmentTag}
                  setDepartmentTag={setDepartmentTag}
                  fromDate={fromDate}
                  setFromDate={setFromDate}
                  toDate={toDate}
                  setToDate={setToDate}
                  productTags={productTags}
                  setProductTags={setProductTags}
                  keywordTags={keywordTags}
                  setKeyWordTags={setKeyWordTags}
                  bidderName={bidderName}
                  setBidderName={setBidderName}
                  setMisReportForm={setMisReportForm}
                  setAllTags={setAllTags}
                  subIndustryTag={subIndustryTag}
                  setSubIndustryTag={setSubIndustryTag}
                />
              </div>
              {isMisReportGenrate && (
                <>
                  <div className="tag-outside-area">
                    <div className="tag-outside-area-inner">
                      {allTags.map(
                        (res, i) =>
                          res !== null && (
                            <Chip
                              key={i}
                              label={res.type + "  :-  " + res?.title}
                              onDelete={(e) => handleDelete(e, res)}
                            />
                          )
                      )}
                    </div>
                  </div>
                  <div className="mis-pdfDownload-btn">
                    <button
                      className="download-pdf-btn"
                      variant="contained"
                      endIcon={<DescriptionIcon />}
                      onClick={generateAndDownloadPDF}
                      disabled={pdfBtnLoader}
                    >
                      {pdfBtnLoader ? "Please Wait..." : "Download Pdf"}
                      <DescriptionIcon className="download-pdf-icon" />
                    </button>
                  </div>
                  <div className="middle-box">
                    <div className="row">
                      <div className="col-6">
                        <div className="india-map company-profile-state-wise-result state-wise-result-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <StateWiseTableMIS misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => allModalOpen("stateTableMis")}
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="india-map tendering-ownership-main-area company-profile-state-wise-result department-reports-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <DepartmentMisChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() =>
                                  allModalOpen("misDepartmentChart")
                                }
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="middle-box">
                    <div className="row">
                      <div className="col-6">
                        <div
                          className={
                            "india-map company-profile-state-wise-result bidders-mis"
                          }
                        >
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <BiddersChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => allModalOpen("misBidderChart")}
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="india-map tendering-ownership-main-area company-profile-state-wise-result ownership-reports-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <OwnerShipChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() =>
                                  allModalOpen("misOwnerShipChart")
                                }
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="middle-box">
                    <div className="row">
                      <div className="col-6">
                        <div className="india-map company-profile-state-wise-result monthwise-reports-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <MonthWiseChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() =>
                                  allModalOpen("misMonthWiseChart")
                                }
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="india-map tendering-ownership-main-area company-profile-state-wise-result category-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <CategoryChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => allModalOpen("misCategoryChart")}
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="middle-box">
                    <div className="row">
                      <div className="col-6">
                        <div className="india-map company-profile-state-wise-result value-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <ValueChart misReportForm={misReportForm} />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => allModalOpen("misValueChart")}
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="india-map tendering-ownership-main-area company-profile-state-wise-result competitors-mis">
                          <Suspense fallback={<h2>Please Wait....</h2>}>
                            <CompetitorsTableMis
                              misReportForm={misReportForm}
                              bidderName={bidderName}
                            />
                            <div class="fullscreen-area-new">
                              <button
                                style={{
                                  width: "100%",
                                }}
                                onClick={() =>
                                  allModalOpen("misCompetitorsTable")
                                }
                              >
                                <img
                                  title="Fullscreen"
                                  src={FullscreenImg}
                                ></img>
                              </button>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Grid>
      </Container>
      {/* **********************************************pdf-loader-modal******************************************************* */}
      <Modal
        open={pdfBtnModalOpen}
        // onCancel={handleClosePDFModalLoader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        closable={false}
        className="popup-fullwidth"
      >
        {pdfBtnLoader ? (
          <>
            <Loader />
            <h3 className="mis-pdf-download-text">
              Please Wait We are Generating Your Report. It may take sometime...
            </h3>
          </>
        ) : (
          "Genrate Pdf Failed"
        )}
      </Modal>
      <Modal
        open={stateTableModalOpen}
        onCancel={() => allModalClose("stateTableMis")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <StateWiseTableMIS misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={departmentModalOpen}
        onCancel={() => allModalClose("misDepartmentChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <DepartmentMisChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={bidderModalOpen}
        onCancel={() => allModalClose("misBidderChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <BiddersChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={ownershipModalOpen}
        onCancel={() => allModalClose("misOwnerShipChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <OwnerShipChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={monthWiseModalOpen}
        onCancel={() => allModalClose("misMonthWiseChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <MonthWiseChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={categoryModalOpen}
        onCancel={() => allModalClose("misCategoryChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <CategoryChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={valueModalOpen}
        onCancel={() => allModalClose("misValueChart")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <ValueChart misReportForm={misReportForm} />
      </Modal>
      <Modal
        open={competitorsModalOpen}
        onCancel={() => allModalClose("misCompetitorsTable")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <CompetitorsTableMis misReportForm={misReportForm} />
      </Modal>
    </>
  );
};

export default MisReports;
