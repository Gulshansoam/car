import { Chip, Container, TextField, Autocomplete, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import CompanyProfileDashboardCount from "./components/CompanyProfileDashboardCount";
import GetCompanyProfilePublishTenderStateWise from "./components/getCompanyProfilePublishTenderStateWise";
import MonthWiseTender from "./components/MonthWiseTender";
import ProfileDepartment from "./components/ProfileDepartment";
import ProfileTenderingOwnership from "./components/ProfileTenderingOwnership";
import ProfileTenderStages from "./components/ProfileTenderStages";
import { useState } from "react";
import { compareCompetitors } from "../../_services/compareCompetitorsServices";
import { dateConvert } from "../../_helpers/date-format";
import { useSelector } from "react-redux";
import { monthWiseConvertor } from "../../layouts/dashboard/header/components/DateConvertor";
import CompanyProfileResults from "./components/companyProfileTenderResult/Index";
import FullscreenImg from "../../assets/images/fullscreen.png";
import { Modal } from "antd";

const CompanyProfile = () => {
  const bidderName = useSelector((state) => state.listing_model.bidderName);
  const { themeStretch } = useSettingsContext();

  /* *********************************states for tags************************************** */
  const [stateNames, setStateNames] = useState([]);
  const [organizationType, setOrganizationType] = useState([]);
  const [department, setDepartment] = useState();
  const [publicationDateFrom, setPublicationDateFrom] = useState("");
  const [publicationDateTo, setPublicationDateTo] = useState("");
  const [stage, setStage] = useState([]);
  const [tabName, setTabName] = useState("");
  const [isParticipated, setIsParticipated] = useState(true);

  /* *************************states for autocomplete************************* */
  const [firstCompetitorList, setFirstCompetitorList] = useState([]);
  const [firstOptionOpen, setFirstOptionOpen] = useState(false);
  const [firstBidderSearch, setFirstBidderSearch] = useState("");

  //***********************ref for scroll*********************************** */
  const contentRef = useRef(null);

  // **************************************
  const [value, setValue] = useState([]);

  /*********************************states for bidderName***********************************/
  const [profileBidderName, setProfileBidderName] = useState(
    window.location.href.split("/")[4] === "company-profile"
      ? localStorage.getItem("user_name")
      : bidderName
  );
  const [ownershiModalOpen, setOwnershiModalOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);
  const [monthWiseModalOpen, setMonthWiseModalOpen] = useState(false);
  const [stageModalOpen, setStageModalOpen] = useState(false);

  const handleClickOwnerShipOpen = () => {
    setOwnershiModalOpen(true);
  };

  const handleCloseOwnerShip = () => {
    setOwnershiModalOpen(false);
  };

  const handleClickProfileDepartmentOpen = () => {
    setDepartmentModalOpen(true);
  };

  const handleProfileDepartmentClose = () => {
    setDepartmentModalOpen(false);
  };

  const handleClickMonthWiseOpen = () => {
    setMonthWiseModalOpen(true);
  };
  const handleCloseMonthWise = () => {
    setMonthWiseModalOpen(false);
  };

  const handleClickStageOpen = () => {
    setStageModalOpen(true);
  };
  const handleCloseStage = () => {
    setStageModalOpen(false);
  };

  useEffect(() => {
    window.location.href.split("/")[4] === "company-profile"
      ? setProfileBidderName(localStorage.getItem("user_name"))
      : setProfileBidderName(bidderName);
  }, []);

  useEffect(() => {
    if (firstBidderSearch !== undefined && firstBidderSearch.length >= 3) {
      setFirstOptionOpen(true);
      compareCompetitors
        .getCompanyNameForComparison({
          company_name: firstBidderSearch,
        })
        .then((res) => {
          if (res.Success === true) {
            setFirstCompetitorList(res.Data);
          } else {
            setFirstCompetitorList([]);
          }
        })
        .catch((err) => {
          console.log("State in compare page Error" + err);
        });
    } else {
      setFirstOptionOpen(false);
    }
  }, [firstBidderSearch]);

  const firstOptionData = firstCompetitorList.map((a) => {
    return a.bidder_name;
  });

  const handleFirstInputChange = (event, newInputValue) => {
    setFirstBidderSearch(newInputValue);
  };

  const handleFirstChange = (event, newInputValue) => {
    setFirstOptionOpen(false);

    if (newInputValue !== null) {
      setProfileBidderName((prev) => newInputValue);
      setIsParticipated(false);
    } else {
      setProfileBidderName((prev) => prev);
    }
  };

  //************************Scroll Down on Click events************************************* */

  const handleState = (e, competitor) => {
    setOrganizationType([]);
    setDepartment("");
    setPublicationDateFrom("");
    setPublicationDateTo("");
    setStage([]);
    setStateNames([competitor]);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setTabName("Participated Tenders");
  };

  const handleClickTenderOwnership = (event, chartContext, config) => {
    setDepartment("");
    setPublicationDateFrom("");
    setPublicationDateTo("");
    setStage([]);
    setStateNames([]);
    setOrganizationType([
      {
        organization_type_name: config.w.globals.labels[config.dataPointIndex],
        organization_type_id: value[config.dataPointIndex].organization_type_id,
      },
    ]);
    setTabName(
      config.w.globals.seriesNames[config.seriesIndex] === "Awarded"
        ? "Awarded Tender"
        : "Participated Tenders"
    );
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleClickMonthWise = (event, chartContext, config) => {
    setOrganizationType([]);
    setStage([]);
    setDepartment("");
    setStateNames([]);

    const { sDate, eDate } = monthWiseConvertor(
      config.w.globals.labels[config.dataPointIndex]
    );

    setPublicationDateFrom(sDate);
    setPublicationDateTo(eDate);

    setTabName(
      config.w.globals.seriesNames[config.seriesIndex] === "Participated Tender"
        ? "Participated Tender"
        : "Awarded Tender"
    );
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleClickStages = (event, chartContext, config) => {
    setDepartment("");
    setPublicationDateFrom("");
    setPublicationDateTo("");
    setStateNames([]);
    setOrganizationType([]);
    setStage([
      {
        stage: config.w.globals.labels[config.dataPointIndex],
        stage_id:
          config.w.globals.labels[config.dataPointIndex] === "aoc"
            ? 3
            : config.w.globals.labels[config.dataPointIndex] === "technical"
            ? 1
            : config.w.globals.labels[config.dataPointIndex] === "financial"
            ? 2
            : 0,
      },
    ]);
    setTabName(
      config.w.globals.labels[config.dataPointIndex] === "aoc"
        ? "Participated Tenders"
        : "Awarded Tenders"
    );
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleDepartmentClickEvent = () => {
    setStateNames([]);
    setOrganizationType([]);
    setPublicationDateFrom("");
    setPublicationDateTo("");
    setStage([]);
    setTabName("Participated Tenders");
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };
  //********************************************************************************* */

  return (
    <>
      <Helmet>
        <title> Company Profile </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <div className="company-profile-area">
            <div className="company-profile-title">
              <div className="row">
                <div className="col-8">
                  <h2>{profileBidderName}</h2>
                </div>
                <div className="col-4">
                  <div className="c-p-search-area">
                    <Autocomplete
                      freeSolo
                      placeholder="Search Company"
                      inputValue={firstBidderSearch}
                      onChange={(event, newValue) => {
                        handleFirstChange(event, newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        handleFirstInputChange(event, newInputValue);
                      }}
                      options={firstOptionData}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField {...params} label="Search Company" />
                      )}
                    />
                  </div>
                </div>

                {/* <CompanyName
                  companyName={profileBidderName}
                  setCompanyName={setProfileBidderName}
                /> */}
              </div>
            </div>

            <div className="row">
              <CompanyProfileDashboardCount
                profileBidderName={profileBidderName}
                setIsParticipated={setIsParticipated}
              />

              <div className="middle-box">
                <div className="row">
                  <div className="col-6">
                    <div className="india-map company-profile-state-wise-result">
                      <h2>State wise Result</h2>
                      <GetCompanyProfilePublishTenderStateWise
                        profileBidderName={profileBidderName}
                        handleState={handleState}
                        isParticipated={isParticipated}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="india-map tendering-ownership-main-area company-profile-state-wise-result">
                      <h2>Tendering Ownership </h2>
                      <ProfileTenderingOwnership
                        profileBidderName={profileBidderName}
                        handleClickTenderOwnership={handleClickTenderOwnership}
                        value={value}
                        setValue={setValue}
                        isParticipated={isParticipated}
                      />
                      <div class="fullscreen-area-new">
                        <button
                          style={{
                            width: "100%",
                          }}
                          onClick={handleClickOwnerShipOpen}
                        >
                          <img title="Fullscreen" src={FullscreenImg}></img>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="department-area">
                  <h2>Top Departments</h2>
                  <ProfileDepartment
                    handleDepartmentClickEvent={handleDepartmentClickEvent}
                    profileBidderName={profileBidderName}
                    isParticipated={isParticipated}
                    setDepartment={setDepartment}
                  />
                  <div class="fullscreen-area-new">
                    <button
                      style={{
                        width: "100%",
                      }}
                      onClick={handleClickProfileDepartmentOpen}
                    >
                      <img title="Fullscreen" src={FullscreenImg}></img>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="monthwise-tenders">
                  <h2>Month-wise Result</h2>
                  <MonthWiseTender
                    profileBidderName={profileBidderName}
                    handleClickMonthWise={handleClickMonthWise}
                    isParticipated={isParticipated}
                  />
                  <div class="fullscreen-area-new">
                    <button
                      style={{
                        width: "100%",
                      }}
                      onClick={handleClickMonthWiseOpen}
                    >
                      <img title="Fullscreen" src={FullscreenImg}></img>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="tender-stages">
                  <h2>Result Stages</h2>
                  <ProfileTenderStages
                    profileBidderName={profileBidderName}
                    handleClickStages={handleClickStages}
                    isParticipated={isParticipated}
                  />
                  <div class="fullscreen-area-new">
                    <button
                      style={{
                        width: "100%",
                      }}
                      onClick={handleClickStageOpen}
                    >
                      <img title="Fullscreen" src={FullscreenImg}></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="c-p-filter-main-area">
                <div className="row">
                  <div className="col-12">
                    <div className="c-p-filter-by">
                      <h2 className="">Filter By : </h2>
                      <div className="c-p-filter-area">
                        <div className="c-p-sub-filter-area" id="profileTag">
                          {stateNames.length > 0 &&
                            stateNames.map((res) => {
                              return (
                                <>
                                  <Chip
                                    label={" State:-" + res.state_name}
                                    onDelete={(e) => setStateNames([])}
                                  />
                                </>
                              );
                            })}
                          {organizationType.length > 0 &&
                            organizationType.map((res) => (
                              <Chip
                                label={
                                  "Tendering Ownership:-" +
                                  res?.organization_type_name
                                }
                                onDelete={() => {
                                  setOrganizationType([]);
                                }}
                              />
                            ))}
                          {department !== undefined &&
                            Object.keys(department).length > 0 && (
                              <Chip
                                label={
                                  "Department:-" + department.organization_name
                                }
                                onDelete={() => {
                                  setDepartment();
                                }}
                              />
                            )}
                          {publicationDateFrom.length > 0 &&
                            publicationDateTo.length > 0 &&
                            (tabName === "Awarded Tender" ? (
                              <Chip
                                label={`Awarded Tender From Date:-${dateConvert(
                                  publicationDateFrom
                                )}   ➡   Awarded Tender To Date:-${dateConvert(
                                  publicationDateTo
                                )}`}
                                onDelete={() => {
                                  setPublicationDateFrom("");
                                  setPublicationDateTo("");
                                  setTabName("Participated Tender");
                                }}
                              />
                            ) : (
                              <Chip
                                label={`Participated Tender From Date:-${dateConvert(
                                  publicationDateFrom
                                )}   ➡   Participated Tender To Date:-${dateConvert(
                                  publicationDateTo
                                )}`}
                                onDelete={() => {
                                  setPublicationDateFrom("");
                                  setPublicationDateTo("");
                                }}
                              />
                            ))}
                          {stage.length > 0 &&
                            stage.map((res) => {
                              return (
                                <Chip
                                  label={"Stage:- " + res.stage}
                                  onDelete={() => {
                                    setStage([]);
                                  }}
                                />
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-listing" ref={contentRef}>
                <CompanyProfileResults
                  stateNames={stateNames}
                  organizationType={organizationType}
                  department={department}
                  publicationDateFrom={publicationDateFrom}
                  publicationDateTo={publicationDateTo}
                  stage={stage}
                  tabName={tabName}
                  profileBidderName={profileBidderName}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Container>

      <Modal
        open={ownershiModalOpen}
        onCancel={handleCloseOwnerShip}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <h2>Tendering Ownership </h2>
        <ProfileTenderingOwnership
          profileBidderName={profileBidderName}
          handleClickTenderOwnership={handleClickTenderOwnership}
          value={value}
          setValue={setValue}
          isParticipated={isParticipated}
        />
      </Modal>

      <Modal
        open={departmentModalOpen}
        onCancel={handleProfileDepartmentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth"
      >
        <h2>Top Departments</h2>
        <ProfileDepartment
          handleDepartmentClickEvent={handleDepartmentClickEvent}
          profileBidderName={profileBidderName}
          isParticipated={isParticipated}
          setDepartment={setDepartment}
        />
      </Modal>

      <Modal
        open={monthWiseModalOpen}
        onCancel={handleCloseMonthWise}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area monthwise-result-popup-area"
      >
        <h2>Month-wise Result</h2>
        <MonthWiseTender
          profileBidderName={profileBidderName}
          handleClickMonthWise={handleClickMonthWise}
          isParticipated={isParticipated}
        />
      </Modal>
      <Modal
        open={stageModalOpen}
        onCancel={handleCloseStage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area result-stages-popup-area"
      >
        <h2>Result Stages</h2>
        <ProfileTenderStages
          profileBidderName={profileBidderName}
          handleClickStages={handleClickStages}
          isParticipated={isParticipated}
        />
      </Modal>
    </>
  );
};

export default CompanyProfile;
