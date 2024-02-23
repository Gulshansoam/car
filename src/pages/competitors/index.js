import { Chip, Container, FormControlLabel, Grid, Switch } from "@mui/material";
import React from "react";
import { useSettingsContext } from "../../components/settings";
import CompititorFilter from "./component/CompititorFilter";
import GeneralCompetitors from "./component/GeneralCompetitors";
import ShortlistCompetitorsList from "./component/ShortlistCompetitorsList";
import { useState } from "react";
import { CompetitorModel } from "./component/model/departmentModel";
import { Helmet } from "react-helmet-async";
import TopCompititorsChart from "../dashboard/component/TopCompititorsChart";
import TopCompetitorsTable from "../dashboard/component/TopCompetitorsTable";
import ShortCompititorChart from "./component/ShortCompititorChart";
import { useContext } from "react";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";

import { useSelector } from "react-redux";
import TopCompetitorsList from "./component/TopCompetitorsList";
import FullscreenImg from "../../assets/images/fullscreen.png";
import { Modal } from "antd";

const Competitors = () => {
  const generalCompetitorListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [tenderForm, setTenderForm] = useState({ ...generalCompetitorListing });
  const { themeStretch } = useSettingsContext();
  const { selectedFromDate, selectedToDate } = useContext(selectedDateRange);
  const [dataState, setDataState] = useState({ checked: true });
  const [generalCompetitorList, setGeneralCompetitorList] = useState([]);
  const [generalCount, setGeneralCount] = useState({});
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [GeneralCompetitorLoader, setGeneralCompetitorLoader] = useState(true);
  const [shortlistedCompititor, setShortlistedCompititor] = useState([]);
  const [value, setValue] = useState({
    month: [],
  });
  const [shortListBidderInfo, setShortListBidderInfo] = useState([]);
  const [shortListDataState, setShortListDataState] = useState({
    checked: true,
  });
  const [showShortListSnackBar, setShortShowSnackBar] = useState(false);
  const [shortListloader, setShortListLoader] = useState(false);
  const [secondShortListLoader, setShortListSecondLoader] = useState(false);

  // competitor filter states......

  const [bidderSearch, setBidderSearch] = useState("");
  const [stateTags, setStateTags] = useState([]);
  const [keywordTags, setKeyWordTags] = useState(null);
  const [tenderOwnershipTag, setTenderOwnershipTag] = useState([]);
  const [departmentTag, setDepartmentTag] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [tenderValueOperator, setTenderValueOperator] = useState(2);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [wordSearch, setWordSearch] = useState("");
  const [subIndustryTag, setSubIndustryTag] = useState(null);

  //competitors form state and model......
  const [firstCompetitorList, setFirstCompetitorList] = useState([]);
  const [competitorForm, setCompetitorForm] = useState({
    is_publication_date_change: true,
    search_text: "",
    sub_industry_id: 0,
    from_date: selectedFromDate,
    to_date: selectedToDate,
    bidder_name: localStorage.getItem("user_name"),
    participate_bidder_name: "",
    state_ids: "",
    product_id: 0,
    organization_id: 0,
    organization_type_name: "",
    page_no: 0,
    record_per_page: 0,
    sort_by: 0,
    sort_type: 0,
    keyword_id: 0,
  });

  const [compititorReqBody, setCompititorReqBody] = useState({
    is_publication_date_change: false,
    from_date: selectedFromDate,
    to_date: selectedToDate,
    bidder_name: localStorage.getItem("user_name"),
    participate_bidder_name: "",
    state_ids: "",
    product_id: 0,
    organization_id: 0,
    organization_type_name: "",
    search_text: "",
    sub_industry_id: 0,
    page_no: 1,
    record_per_page: 20,
    sort_by: 2,
    sort_type: 2,
    tender_value_operator: 0,
    tender_value_from: 0,
    tender_value_to: 0,
    is_search_param: false,
  });

  const [checkMainData, setCheckMainData] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [companyInput, setCompanyInput] = useState("");
  const [keywordInput, setKeyWordInput] = useState("");
  const [shortListOpen, setShortListOpen] = useState(false);
  const [competitorTableOpen, setCompetitorTableOpen] = useState(false);

  const handleShortlistChartOpen = () => {
    setShortListOpen(true);
  };

  const handleShortlistChartClose = () => {
    setShortListOpen(false);
  };

  const handleClickOpen = () => {
    setCompetitorTableOpen(true);
  };

  const handleClose = () => {
    setCompetitorTableOpen(false);
  };

  const handleChange = (event) => {
    setDataState({ checked: event.target.checked });
  };
  const handleShortListChartChange = (event) => {
    setShortListDataState({ checked: event.target.checked });
  };
  const handleDelete = (e, res, category) => {
    if (category === "State") {
      setStateTags(stateTags.filter((e) => res.state_id !== e.state_id));
      setCompetitorForm((prev) => ({
        ...prev,
        // is_search_param: false,
        state_ids: stateTags
          .filter((e) => res.state_id !== e.state_id)
          .map((data) => data.state_id)
          .join(","),
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        // is_search_param: false,
        state_ids: stateTags
          .filter((e) => res.state_id !== e.state_id)
          .map((data) => data.state_id)
          .join(","),
      }));
      setTenderForm((prev) => ({
        ...prev,

        state_ids: stateTags
          .filter((e) => res.state_id !== e.state_id)
          .map((data) => data.state_id)
          .join(","),
      }));
      // if (category==="State") {
      //   console.log(category==="State");
      //   setCompititorReqBody((prev) => ({
      //     ...prev,
      //     is_search_param: false,
      //   }));
      // }
    } else if (category === "Ownership") {
      setTenderOwnershipTag(
        tenderOwnershipTag.filter(
          (e) => res.organization_type_id !== e.organization_type_id
        )
      );
      setCompetitorForm((prev) => ({
        ...prev,
        // is_search_param: false,
        organization_type_name: tenderOwnershipTag
          .filter((e) => res.organization_type_id !== e.organization_type_id)
          .map((data) => data.organization_type_id)
          .join(","),
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        // is_search_param: false,
        organization_type_name: tenderOwnershipTag
          .filter((e) => res.organization_type_id !== e.organization_type_id)
          .map((data) => data.organization_type_id)
          .join(","),
      }));
      setTenderForm((prev) => ({
        ...prev,
        organization_type_name: tenderOwnershipTag
          .filter((e) => res.organization_type_id !== e.organization_type_id)
          .map((data) => data.organization_type_id)
          .join(","),
      }));
    } else if (category === "Department") {
      setDepartmentTag(null);
      setDepartmentName("");
      setDepartmentList([]);
      setCompetitorForm((prev) => ({
        ...prev,
        organization_id: 0,
        // is_search_param: false,
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        organization_id: 0,
        // is_search_param: false,
      }));
      setTenderForm((prev) => ({
        ...prev,
        organization_id: 0,
      }));
    } else if (category === "keywordTags") {
      setKeyWordInput({});
      setKeyWordTags(null);
      setCompetitorForm((prev) => ({
        ...prev,
        product_id: 0,
        // is_search_param: false,
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        product_id: 0,
        // is_search_param: false,
      }));
      setTenderForm((prev) => ({
        ...prev,
        keyword_ids: 0,
      }));
    } else if (category === "bidderSearch") {
      setBidderSearch("");
      setCompanyInput("");
      setFirstCompetitorList([]);
      setCompetitorForm((prev) => ({
        ...prev,
        bidder_name: localStorage.getItem("user_name"),
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        bidder_name: "",
        // is_search_param: false,
        participate_bidder_name: "",
      }));
      setTenderForm((prev) => ({
        ...prev,
        participate_bidder_name: "",
      }));
    } else if (category === "value") {
      setFromValue(0);
      setToValue(0);
      setTenderValueOperator(2);
      setTenderForm((prev) => ({
        ...prev,
        tender_value_operator: 0,
        contract_value_operator: 0,
        contract_value_from: 0,
        contract_value_to: 0,
        tender_value_from: 0,
        tender_value_to: 0,
      }));
      setCompititorReqBody((prev) => ({
        ...prev,
        tender_value_operator: 0,
        contract_value_operator: 0,
        contract_value_from: 0,
        contract_value_to: 0,
        tender_value_from: 0,
        tender_value_to: 0,
        // is_search_param: false,
      }));
      setCompetitorForm((prev) => ({
        ...prev,
        tender_value_operator: 0,
        contract_value_operator: 0,
        contract_value_from: 0,
        contract_value_to: 0,
        tender_value_from: 0,
        tender_value_to: 0,
      }));
    } else if (category === "wordSearch") {
      setWordSearch("");
      setCompititorReqBody((prev) => ({
        ...prev,
        // is_search_param: false,
        search_text: "",
      }));
      setTenderForm((prev) => ({ ...prev, search_text: "" }));
      setCompetitorForm((prev) => ({
        ...prev,
        // is_search_param: false,
        search_text: "",
      }));
    } else if (category === "subIndustryTag") {
      setSubIndustryTag(null);
      setCompititorReqBody((prev) => ({
        ...prev,
        // is_search_param: false,
        sub_industry_id: 0,
      }));
      setTenderForm((prev) => ({ ...prev, sub_industry_id: 0 }));
      setCompetitorForm((prev) => ({
        ...prev,
        // is_search_param: false,
        sub_industry_id: 0,
      }));
    } else {
      setCompetitorForm((prev) => ({
        ...prev,
        is_search_param: false,
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Competitor</title>
      </Helmet>
      <div className="filter-main-area">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            {/*************************************************************/}
            <CompititorFilter
              bidderSearch={bidderSearch}
              setBidderSearch={setBidderSearch}
              stateTags={stateTags}
              setStateTags={setStateTags}
              keywordTags={keywordTags}
              setKeyWordTags={setKeyWordTags}
              tenderOwnershipTag={tenderOwnershipTag}
              setTenderOwnershipTag={setTenderOwnershipTag}
              departmentTag={departmentTag}
              setDepartmentTag={setDepartmentTag}
              setCompetitorForm={setCompetitorForm}
              competitorForm={competitorForm}
              setCheckMainData={setCheckMainData}
              departmentName={departmentName}
              setDepartmentName={setDepartmentName}
              departmentList={departmentList}
              setDepartmentList={setDepartmentList}
              compititorReqBody={compititorReqBody}
              setCompititorReqBody={setCompititorReqBody}
              firstCompetitorList={firstCompetitorList}
              setFirstCompetitorList={setFirstCompetitorList}
              companyInput={companyInput}
              setCompanyInput={setCompanyInput}
              keywordInput={keywordInput}
              setKeyWordInput={setKeyWordInput}
              tenderForm={tenderForm}
              setTenderForm={setTenderForm}
              tenderValueOperator={tenderValueOperator}
              setTenderValueOperator={setTenderValueOperator}
              fromValue={fromValue}
              setFromValue={setFromValue}
              toValue={toValue}
              setToValue={setToValue}
              setGeneralCount={setGeneralCount}
              wordSearch={wordSearch}
              setWordSearch={setWordSearch}
              subIndustryTag={subIndustryTag}
              setSubIndustryTag={setSubIndustryTag}
            />
            {/* *************************Tags of filters*************************************** */}
            <div className="tag-outside-area">
              <div className="tag-outside-area-inner">
                {bidderSearch && (
                  <Chip
                    label={"Comapany Name : " + bidderSearch}
                    onDelete={(e) =>
                      handleDelete(e, bidderSearch, "bidderSearch")
                    }
                  />
                )}
                {wordSearch.length > 0 && wordSearch && (
                  <Chip
                    label={"Word Search : " + wordSearch}
                    onDelete={(e) => handleDelete(e, wordSearch, "wordSearch")}
                  />
                )}
                {stateTags.map((res) => {
                  return (
                    <Chip
                      label={"State : " + res.state_name}
                      onDelete={(e) => handleDelete(e, res, "State")}
                    />
                  );
                })}
                {keywordTags !== undefined &&
                  keywordTags !== null &&
                  Object.keys(keywordTags).length > 0 && (
                    <Chip
                      label={"Select Category : " + keywordTags.keyword_name}
                      onDelete={(e) =>
                        handleDelete(e, keywordTags, "keywordTags")
                      }
                    />
                  )}
                {subIndustryTag != null &&
                  Object.keys(subIndustryTag).length > 0 && (
                    <Chip
                      label={
                        "SubIndustry : " + subIndustryTag.sub_industry_name
                      }
                      onDelete={(e) =>
                        handleDelete(e, keywordTags, "subIndustryTag")
                      }
                    />
                  )}
                {tenderOwnershipTag.map((res) => {
                  return (
                    <Chip
                      label={"Ownership : " + res.organization_type_name}
                      onDelete={(e) => handleDelete(e, res, "Ownership")}
                    />
                  );
                })}
                {departmentTag != null &&
                  Object.keys(departmentTag).length > 0 && (
                    <Chip
                      label={"Department : " + departmentTag.organization_name}
                      onDelete={(e) =>
                        handleDelete(e, departmentTag, "Department")
                      }
                    />
                  )}
                {tenderValueOperator > 0 &&
                  (tenderValueOperator === 4
                    ? (fromValue > 0 || toValue > 0) && (
                        <Chip
                          label={"Value : " + fromValue + " to " + toValue}
                          onDelete={(e) => handleDelete(e, fromValue, "value")}
                        />
                      )
                    : tenderValueOperator === 3
                    ? fromValue > 0 && (
                        <Chip
                          label={"Value :  <=" + fromValue}
                          onDelete={(e) => handleDelete(e, fromValue, "value")}
                        ></Chip>
                      )
                    : fromValue > 0 &&
                      (tenderValueOperator === 1 ? (
                        <Chip
                          label={"Value :  Equal To " + fromValue}
                          onDelete={(e) => handleDelete(e, fromValue, "value")}
                        ></Chip>
                      ) : (
                        tenderValueOperator === 2 && (
                          <Chip
                            label={"Value :  >=" + fromValue}
                            onDelete={(e) =>
                              handleDelete(e, fromValue, "value")
                            }
                          ></Chip>
                        )
                      )))}
              </div>
            </div>
            {/***************************** tags end ********************************/}
            <GeneralCompetitors
              keywordTags={keywordTags}
              generalCompetitorList={generalCompetitorList}
              showSnackBar={showSnackBar}
              GeneralCompetitorLoader={GeneralCompetitorLoader}
              setGeneralCompetitorList={setGeneralCompetitorList}
              setShowSnackBar={setShowSnackBar}
              setGeneralCompetitorLoader={setGeneralCompetitorLoader}
              setCompetitorForm={setCompetitorForm}
              competitorForm={competitorForm}
              setCheckMainData={setCheckMainData}
              checkMainData={checkMainData}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              compititorReqBody={compititorReqBody}
              setCompititorReqBody={setCompititorReqBody}
              tenderForm={tenderForm}
              setTenderForm={setTenderForm}
              generalCount={generalCount}
              setGeneralCount={setGeneralCount}
            />
            {/************************************************************ */}

            {/************************* tables *********************************** */}
            <div className="col-12">
              <div className="row">
                <TopCompetitorsTable
                  dataTableState={{ checked: true }}
                  bidderSearch={bidderSearch}
                  fromDashboard={false}
                  tenderForm={tenderForm}
                  setTenderForm={setTenderForm}
                  competitorForm={competitorForm}
                />
                {/* <TopCompetitorsList
                  dataTableState={{ checked: true }}
                  bidderSearch={bidderSearch}
                  fromDashboard={false}
                  tenderForm={tenderForm}
                  setTenderForm={setTenderForm}
                /> */}

                <ShortlistCompetitorsList
                  keywordTags={keywordTags}
                  shortlistedCompititor={shortlistedCompititor}
                  setShortlistedCompititor={setShortlistedCompititor}
                  value={value}
                  setValue={setValue}
                  shortListBidderInfo={shortListBidderInfo}
                  setShortListBidderInfo={setShortListBidderInfo}
                  shortListDataState={shortListDataState}
                  setShortListDataState={setShortListDataState}
                  showShortListSnackBar={showShortListSnackBar}
                  setShortShowSnackBar={setShortShowSnackBar}
                  shortListloader={shortListloader}
                  setShortListLoader={setShortListLoader}
                  secondShortListLoader={secondShortListLoader}
                  setShortListSecondLoader={setShortListSecondLoader}
                  setCompetitorForm={setCompetitorForm}
                  competitorForm={competitorForm}
                  setCheckMainData={setCheckMainData}
                  checkMainData={checkMainData}
                  isDelete={isDelete}
                  setIsDelete={setIsDelete}
                  fromDashboard={false}
                  dataTableState={{ checked: false }}
                  tenderForm={tenderForm}
                  setTenderForm={setTenderForm}
                />
              </div>
            </div>
            {/* <TopCompetitorsList
              keywordTags={keywordTags}
              compititorDetailzzzzzzzzz={compititorDetail}
              setCompititorDetail={setCompititorDetail}
              bidderInfo={bidderInfo}
              setBidderInfo={setBidderInfo}
              chartValue={chartValue}
              setChartValue={setChartValue}
              dataState={dataState}
              setDataState={setDataState}
              topCompetitorLoader={topCompetitorLoader}
              setCompetitorLoader={setCompetitorLoader}
              secondLoader={secondLoader}
              setSecondLoader={setSecondLoader}
              setCompetitorForm={setCompetitorForm}
              competitorForm={competitorForm}
              setCheckMainData={setCheckMainData}
            /> */}
            {/**************************** graphs ******************************** */}
            <div className="col-12">
              <div className="row">
                <div className="col-5">
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

                    <TopCompititorsChart
                      competitorPage={true}
                      dataState={dataState}
                      bidderSearch={bidderSearch}
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

                <div className="col-7">
                  <div className="filter-area top-competitors-chart shortlist-competitors-chart">
                    <h2>Shortlist Competitors - Chart</h2>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={shortListDataState?.checked}
                          onChange={handleShortListChartChange}
                          value="checked"
                          color="primary"
                        />
                      }
                      labelPlacement="start"
                      label={
                        shortListDataState.checked === true
                          ? "Line Chart"
                          : "Bar Chart"
                      }
                    />

                    <ShortCompititorChart
                      // keywordTags={keywordTags}
                      // shortlistedCompititor={shortlistedCompititor}
                      // setShortlistedCompititor={setShortlistedCompititor}
                      value={value}
                      setValue={setValue}
                      shortListBidderInfo={shortListBidderInfo}
                      setShortListBidderInfo={setShortListBidderInfo}
                      shortListDataState={shortListDataState}
                      setShortListDataState={setShortListDataState}
                      showShortListSnackBar={showShortListSnackBar}
                      setShortShowSnackBar={setShortShowSnackBar}
                      shortListloader={shortListloader}
                      setShortListLoader={setShortListLoader}
                      secondShortListLoader={secondShortListLoader}
                      setShortListSecondLoader={setShortListSecondLoader}
                      setCompetitorForm={setCompetitorForm}
                      // competitorForm={competitorForm}
                      setCheckMainData={setCheckMainData}
                      checkMainData={checkMainData}
                      isDelete={isDelete}
                      setIsDelete={setIsDelete}
                      handleChange={handleShortListChartChange}
                    />
                    <div class="fullscreen-area-new">
                      <button
                        style={{
                          width: "100%",
                        }}
                        onClick={handleShortlistChartOpen}
                      >
                        <img title="Fullscreen" src={FullscreenImg}></img>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <ShortCompititorChart
                  // keywordTags={keywordTags}
                  // shortlistedCompititor={shortlistedCompititor}
                  // setShortlistedCompititor={setShortlistedCompititor}
                  value={value}
                  setValue={setValue}
                  shortListBidderInfo={shortListBidderInfo}
                  setShortListBidderInfo={setShortListBidderInfo}
                  shortListDataState={shortListDataState}
                  setShortListDataState={setShortListDataState}
                  showShortListSnackBar={showShortListSnackBar}
                  setShortShowSnackBar={setShortShowSnackBar}
                  shortListloader={shortListloader}
                  setShortListLoader={setShortListLoader}
                  secondShortListLoader={secondShortListLoader}
                  setShortListSecondLoader={setShortListSecondLoader}
                  setCompetitorForm={setCompetitorForm}
                  // competitorForm={competitorForm}
                  setCheckMainData={setCheckMainData}
                  checkMainData={checkMainData}
                  isDelete={isDelete}
                  setIsDelete={setIsDelete}
                /> */}
              </div>
            </div>
          </Grid>
        </Container>
      </div>
      <Modal
        open={shortListOpen}
        onCancel={handleShortlistChartClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        <h2>Shortlist Competitors - Chart</h2>
        <ShortCompititorChart
          // keywordTags={keywordTags}
          // shortlistedCompititor={shortlistedCompititor}
          // setShortlistedCompititor={setShortlistedCompititor}
          value={value}
          setValue={setValue}
          shortListBidderInfo={shortListBidderInfo}
          setShortListBidderInfo={setShortListBidderInfo}
          shortListDataState={shortListDataState}
          setShortListDataState={setShortListDataState}
          showShortListSnackBar={showShortListSnackBar}
          setShortShowSnackBar={setShortShowSnackBar}
          shortListloader={shortListloader}
          setShortListLoader={setShortListLoader}
          secondShortListLoader={secondShortListLoader}
          setShortListSecondLoader={setShortListSecondLoader}
          setCompetitorForm={setCompetitorForm}
          // competitorForm={competitorForm}
          setCheckMainData={setCheckMainData}
          checkMainData={checkMainData}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          handleChange={handleShortListChartChange}
        />
      </Modal>
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
        <TopCompititorsChart
          competitorPage={true}
          dataState={dataState}
          bidderSearch={bidderSearch}
        />
      </Modal>
    </>
  );
};

export default Competitors;
