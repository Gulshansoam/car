import { Container, Grid, Switch } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSettingsContext } from "../../components/settings";
import TopCompetitorsTable from "./component/TopCompetitorsTable";
import TopCompititorsChart from "./component/TopCompititorsChart";
import DashboardCount from "./component/DashboardCount";
import SimilarTenderResult from "./component/similarTenderResult";
import { useState } from "react";
import { FormControlLabel } from "@material-ui/core";
import TenderOwnership from "./component/TenderOwnership";
import ShortlistCompetitorsList from "../competitors/component/ShortlistCompetitorsList";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { useContext } from "react";
import { fromDate } from "../../components/date-input/FromDateToDate";
import { toDate } from "../../components/date-input/FromDateToDate";
import StateWiseTable from "./component/StateWiseTable";
import GoProfile from "./component/goProfile";
import FullscreenImg from "../../assets/images/fullscreen.png";
import { Modal } from "antd";

const Dashboard = () => {
  const { themeStretch } = useSettingsContext();
  const { setSelectedFromDate, setSelectedToDate } =
    useContext(selectedDateRange);

  const [dataState, setDataState] = useState({ checked: true });
  const [shortlistedCompititor, setShortlistedCompititor] = useState([]);
  const [value, setValue] = useState({
    month: [],
  });
  const [showShortListSnackBar, setShortShowSnackBar] = useState(false);
  const [shortListloader, setShortListLoader] = useState(false);
  const [checkMainData, setCheckMainData] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [dataTableState, setDataTableState] = useState({ checked: true });
  const [count, setCount] = useState(0);
  const [competitorTableOpen, setCompetitorTableOpen] = useState(false);
  const [ownershiModalOpen, setOwnershiModalOpen] = useState(false);

  useEffect(() => {
    setSelectedFromDate(fromDate());
    setSelectedToDate(toDate());
  }, []);

  const handleChange = (event) => {
    setDataState({ checked: event.target.checked });
  };

  const handleTableChange = (event) => {
    setDataTableState({ checked: event.target.checked });
  };
// **********************************Modal click events*****************************************
  const handleClickOpen = () => {
    setCompetitorTableOpen(true);
  };

  const handleClose = () => {
    setCompetitorTableOpen(false);
    setDataTableState(false);
  };

  const handleClickOwnerShipOpen = () => {
    setOwnershiModalOpen(true);
  };

  const handleCloseOwnerShip = () => {
    setOwnershiModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="filter-main-area">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            <div className="dashboard-area">
              <div className="dashboard-box-first-area">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <GoProfile />
                  </Grid>
                  <Grid className="banner-area" item xs={12} md={6}>
                    <DashboardCount />
                  </Grid>
                </Grid>
              </div>

              <div className="middle-box">
                <div className="row">
                  <TopCompetitorsTable
                    handleTableChange={handleTableChange}
                    fromDashboard={true}
                    dataTableState={dataTableState}
                  />

                  <ShortlistCompetitorsList
                    shortlistedCompititor={shortlistedCompititor}
                    setShortlistedCompititor={setShortlistedCompititor}
                    setValue={setValue}
                    setShortShowSnackBar={setShortShowSnackBar}
                    shortListloader={shortListloader}
                    setShortListLoader={setShortListLoader}
                    setCheckMainData={setCheckMainData}
                    checkMainData={checkMainData}
                    setIsDelete={setIsDelete}
                    dataTableState={dataTableState}
                    fromDashboard={true}
                    handleTableChange={handleTableChange}
                  />

                  <div className="col-6">
                    <div className="bidder-participated-tenders">
                      <div className="top-competitors-chart-title-area">
                        <div className="top-competitors-area">
                          <h2>Top Competitors Chart</h2>
                          <div className="top-competitors-chart-on-off">
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={dataState.checked}
                                  onChange={handleChange}
                                  value="checked"
                                  color="primary"
                                />
                              }
                              labelPlacement="start"
                              label={
                                dataState.checked ? "Line Chart" : "Bar Chart"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/* {console.log(dataState)} */}
                      <TopCompititorsChart
                        dataState={dataState}
                        // handleChange={handleChange}
                      />
                      <div class="fullscreen-area-new">
                        <button
                          style={{
                            width: "100%",
                          }}
                          onClick={handleClickOpen}
                        >
                          <img title="Fullscreen" src={FullscreenImg}></img>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="india-map">
                      <h2>State wise Result</h2>
                      <StateWiseTable />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="india-map tendering-ownership-main-area">
                      <h2>Tendering Ownership </h2>

                      <TenderOwnership />
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

              <div className="dashboard-listing">
                <SimilarTenderResult />
              </div>
            </div>
          </Grid>
        </Container>
      </div>
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>Top Competitors Chart Modal............................................. */}
      <Modal
        open={competitorTableOpen}
        onCancel={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <h2>Top Competitors Chart</h2>
        <TopCompititorsChart dataState={dataState} />
      </Modal>
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>Tendering Ownership Chart Modal............................................. */}
      <Modal
        open={ownershiModalOpen}
        onCancel={handleCloseOwnerShip}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <h2>Tendering Ownership</h2>
        <TenderOwnership />
      </Modal>
    </>
  );
};

export default Dashboard;
