import { Container, Typography, Grid, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useSettingsContext } from "../../components/settings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FreshResults from "../dashboard/component/similarTenderResult/components/FreshResult";
import AddCompany from "./component/AddCompany";
import CompanyDetailData from "./component/CompanyDetailData";
import StrongPoint from "./component/StrongPoint";
import SameBidComparisons from "./component/SameBidComparisons";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerResultListing from "./component/DrawerResultListing";
import { Helmet } from "react-helmet-async";
import { fromDate, toDate } from "../../components/date-input/FromDateToDate";
import { selectedDateRange } from "../../layouts/dashboard/header/context-api/Context";
import { converterDefaultValue } from "../../layouts/dashboard/header/components/DateConvertor";
import Loading from "../../assets/images/loading-gif.gif";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CompareArea from "./component/CompareArea";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Comparison = () => {
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [formData, setFormData] = useState({
    from_date: selectedFromDate,
    to_date: selectedToDate,
    state_id: "",
    keyword_id: "",
    is_publication_date_change: true,
  });
  ////////////////////////////////////////////////////////////
  const [firstCompetitorList, setFirstCompetitorList] = useState([]);
  const [firstOptionOpen, setFirstOptionOpen] = useState(false);
  const [firstBidderSearch, setFirstBidderSearch] = useState("");
  ////////////////////////////////////////////////////////////
  const [secondCompetitorList, setSecondCompetitorList] = useState([]);
  const [secondOptionOpen, setSecondOptionOpen] = useState(false);
  const [secondBidderSearch, setSecondBidderSearch] = useState("");
  ////////////////////////////////////////////////////////////
  const [thirdCompetitorList, setThirdCompetitorList] = useState([]);
  const [thirdOptionOpen, setThirdOptionOpen] = useState(false);
  const [thirdBidderSearch, setThirdBidderSearch] = useState("");
  ////////////////////////////////////////////////////////////
  const [categoryValue, setCategoryValue] = useState(null);
  const [keywordValue, setKeywordValue] = useState([]);
  const [selectedKeyWord, setSelectedKeyWord] = useState(null);
  const [addCompany, setAddCompany] = useState(false);
  const [companyDetail, setCompanyDetail] = useState({
    tenderInfo: {
      bidder_name: "",
      participated_tender_count: 0,
      participated_tender_value: 0,
      award_result_count: "",
      award_result_value: "",
      lost_tender: "",
      lost_value: 0,
      to_be_announced_tender: "",
      to_be_announced_value: "",
      state_id: 0,
    },
    tenderOwnerShip: [
      {
        organization_type_name: "",
        participate_result_count: 0,
        participated_result_value: 0,
      },
    ],
    tenderState: [
      {
        state_id: 0,
        state_name: "",
        participated_tender_count: 0,
        participated_tender_value: 0,
        award_result_count: 0,
        award_result_value: 0,
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const [apiLoader, setApiLoader] = useState(false);
  // const [compareForm, setCompareForm] = useState();
  // const [compareDetail, setCompareDetail] = useState({
  //   user_id: 0,
  //   user_query_id: 0,
  //   is_publication_date_change: true,
  //   from_date: selectedFromDate,
  //   to_date: selectedToDate,
  //   keyword_id: 0,
  //   state_id: 0,
  //   bidder_name: "",
  // });
  const [wordSearch, setWordSearch] = useState("");
  const [subIndustryTag, setSubIndustryTag] = useState(null);

  return (
    <>
      <Helmet>
        <title>Comparision</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          {/* <Drawer
            sx={{
              width: 1000,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 1000,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <DrawerResultListing drawerData={drawerData} />
          </Drawer> */}

          <div className="companies-compare-area">
            {/* <h1>Companies Compare</h1> */}
            <AddCompany
              wordSearch={wordSearch}
              setWordSearch={setWordSearch}
              subIndustryTag={subIndustryTag}
              setSubIndustryTag={setSubIndustryTag}
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              formData={formData}
              setFormData={setFormData}
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
              keywordValue={keywordValue}
              setKeywordValue={setKeywordValue}
              addCompany={addCompany}
              setAddCompany={setAddCompany}
              setCompanyDetail={setCompanyDetail}
              companyDetail={companyDetail}
              setSelectedState={setSelectedState}
              setSelectedKeyWord={setSelectedKeyWord}
              // ---------------------------------
              firstCompetitorList={firstCompetitorList}
              setFirstCompetitorList={setFirstCompetitorList}
              firstOptionOpen={firstOptionOpen}
              setFirstOptionOpen={setFirstOptionOpen}
              firstBidderSearch={firstBidderSearch}
              setFirstBidderSearch={setFirstBidderSearch}
              // ---------------------------------
              secondOptionOpen={secondOptionOpen}
              setSecondOptionOpen={setSecondOptionOpen}
              secondBidderSearch={secondBidderSearch}
              setSecondBidderSearch={setSecondBidderSearch}
              secondCompetitorList={secondCompetitorList}
              setSecondCompetitorList={setSecondCompetitorList}
              // ---------------------------------
              // ---------------------------------
              thirdOptionOpen={thirdOptionOpen}
              setThirdOptionOpen={setThirdOptionOpen}
              thirdBidderSearch={thirdBidderSearch}
              setThirdBidderSearch={setThirdBidderSearch}
              thirdCompetitorList={thirdCompetitorList}
              setThirdCompetitorList={setThirdCompetitorList}
              // ---------------------------------
              apiLoader={apiLoader}
              setApiLoader={setApiLoader}
            />
            {/* <CompareArea compareDetail={compareDetail} /> */}

            {apiLoader ? (
              <>
                <div className="loading-img">
                  <img src={Loading} />
                </div>
              </>
            ) : companyDetail.length > 0 ? (
              <>
                <CompanyDetailData
                  companyDetail={companyDetail}
                  formData={formData}
                  open={open}
                  setOpen={setOpen}
                  drawerData={drawerData}
                  setDrawerData={setDrawerData}
                  selectedState={selectedState}
                  selectedKeyWord={categoryValue}
                  wordSearch={wordSearch}
                  subIndustryTag={subIndustryTag}
                />

                {/* <div className="tender-result-compare">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="tender-result-compare-title-area">
                        Tender Result
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="">
                        <FreshResults />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div> */}

                <StrongPoint
                  formData={formData}
                  companyDetail={companyDetail}
                />

                {/* <div className="tender-result-compare">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="tender-result-compare-title-area">
                        Tender Result
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="">
                        <FreshResults />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div> */}

                <SameBidComparisons
                  formData={formData}
                  companyDetail={companyDetail}
                  selectedState={selectedState}
                  selectedKeyWord={categoryValue}
                  wordSearch={wordSearch}
                  subIndustryTag={subIndustryTag}
                />

                {/* <div className="tender-result-compare">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="tender-result-compare-title-area">
                        Tender Result
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="">
                        <FreshResults />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div> */}
              </>
            ) : (
              <></>
            )}
          </div>
        </Grid>
      </Container>
      <Snackbar
        autoHideDuration={1000}
        // message="Minimum Enter 2 Competitor Name"
        onClose={handleAlertClose}
        open={alertOpen}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Enter Minimum 2 Competitor Name
        </Alert>
      </Snackbar>
    </>
  );
};

export default Comparison;
