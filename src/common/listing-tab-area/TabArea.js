import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Grid, Tab } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useSettingsContext } from "../../components/settings/SettingsContext";
import DowloadExcelBtn from "../../components/download-tender-excel/DowloadExcelBtn";
import TenderSorting from "../../components/tenderSortSelect/TenderSorting";
import { valueConvert } from "../../_helpers/valueConvert";

const TabArea = (props) => {
  const StyledTab = styled(Tab)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  }));

  const {
    value,
    setValue,
    setDataFound,
    dataFound,
    FirstTabResults,
    SecondTabResults,
    ThirdTabResults,
    FourthTabResults,
    tenderForm,
    setTenderForm,
    setIsFilter,
    firstTabName,
    secondTabName,
    thirdTabName,
    fourthTabName,
    fromPage,
    stateNames,
    organizationType,
    department,
    stage,
    page,
    setPage,
    isSplitWord,
    setIsSplitWord,
    isSearchBy,
    setIsSearchBy,
    pageName,
    tenderResultTabChange,
    companyProfileResultTabChange,
  } = props;

  const { themeStretch } = useSettingsContext();
  //***************************count-states***************************************
  const [firstTabCount, setFirtsTabCount] = React.useState({});
  const [secondTabCount, setSecondTabCount] = React.useState({});
  const [thirdTabCount, setThirdTabCount] = React.useState({});
  const [fourthTabCount, setFourthTabCount] = React.useState({});

  // const [isSearchBy, setIsSearchBy] = React.useState(false);

  const handleChange = (event, newValue) => {
    pageName === "tenderListing"
      ? tenderResultTabChange(newValue)
      : companyProfileResultTabChange(newValue);
    setValue(newValue);
    setPage(1);
    setIsSplitWord(false);
    setDataFound(true);
    setIsSearchBy(false);
    setTenderForm((prev) => ({
      ...prev,
      search_by_split_word: false,
      search_by: 1,
      page_no: 1,
    }));
  };

  return (
    <div className="tab-area">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <StyledTab
                    className="listing-tabs"
                    label={`${firstTabName} ${
                      firstTabCount.resultcount > 0 && value === "1"
                        ? `(${valueConvert(firstTabCount.resultcount)})`
                        : ""
                    }`}
                    value="1"
                  />
                  <StyledTab
                    className="listing-tabs"
                    label={`${secondTabName} ${
                      secondTabCount.resultcount > 0 && value === "2"
                        ? `(${valueConvert(secondTabCount.resultcount)})`
                        : ""
                    }`}
                    value="2"
                  />
                  <StyledTab
                    className="listing-tabs"
                    label={`${thirdTabName} ${
                      thirdTabCount.resultcount > 0 && value === "3"
                        ? `(${valueConvert(thirdTabCount.resultcount)})`
                        : ""
                    }`}
                    value="3"
                  />
                  <StyledTab
                    className="listing-tabs"
                    label={`${fourthTabName} ${
                      fourthTabCount.resultcount > 0 && value === "4"
                        ? `(${valueConvert(fourthTabCount.resultcount)})`
                        : ""
                    }`}
                    value="4"
                  />
                </TabList>
                {fromPage === "companyProfile" ? (
                  <></>
                ) : (
                  <div className="sort-by-main-area">
                    <DowloadExcelBtn
                      tenderForm={tenderForm}
                      value={value}
                      pageName={pageName}
                      setPage={setPage}
                      setTenderForm={setTenderForm}
                    />
                    <TenderSorting
                      setDataFound={setDataFound}
                      setIsFilter={setIsFilter}
                      setTenderForm={setTenderForm}
                      setPage={setPage}
                    />
                  </div>
                )}
              </Box>
              <TabPanel value="1">
                {dataFound && (
                  <FirstTabResults
                    tenderForm={tenderForm}
                    setDataFound={setDataFound}
                    setFirtsTabCount={setFirtsTabCount}
                    setTenderForm={setTenderForm}
                    stateNames={stateNames}
                    organizationType={organizationType}
                    department={department}
                    stage={stage}
                    page={page}
                    setPage={setPage}
                    isSplitWord={isSplitWord}
                    setIsSplitWord={setIsSplitWord}
                    isSearchBy={isSearchBy}
                    setIsSearchBy={setIsSearchBy}
                  />
                )}
              </TabPanel>
              <TabPanel value="2">
                {dataFound && (
                  <SecondTabResults
                    tenderForm={tenderForm}
                    setDataFound={setDataFound}
                    setSecondTabCount={setSecondTabCount}
                    setTenderForm={setTenderForm}
                    stateNames={stateNames}
                    organizationType={organizationType}
                    department={department}
                    stage={stage}
                    page={page}
                    setPage={setPage}
                    isSplitWord={isSplitWord}
                    setIsSplitWord={setIsSplitWord}
                    isSearchBy={isSearchBy}
                    setIsSearchBy={setIsSearchBy}
                  />
                )}
              </TabPanel>
              <TabPanel value="3">
                {dataFound && (
                  <ThirdTabResults
                    tenderForm={tenderForm}
                    setDataFound={setDataFound}
                    setThirdTabCount={setThirdTabCount}
                    setTenderForm={setTenderForm}
                    stateNames={stateNames}
                    organizationType={organizationType}
                    department={department}
                    stage={stage}
                    page={page}
                    setPage={setPage}
                    isSplitWord={isSplitWord}
                    setIsSplitWord={setIsSplitWord}
                    isSearchBy={isSearchBy}
                    setIsSearchBy={setIsSearchBy}
                  />
                )}
              </TabPanel>
              <TabPanel value="4">
                {dataFound && (
                  <FourthTabResults
                    tenderForm={tenderForm}
                    setDataFound={setDataFound}
                    setFourthTabCount={setFourthTabCount}
                    setTenderForm={setTenderForm}
                    stateNames={stateNames}
                    organizationType={organizationType}
                    department={department}
                    stage={stage}
                    page={page}
                    setPage={setPage}
                    isSplitWord={isSplitWord}
                    setIsSplitWord={setIsSplitWord}
                    isSearchBy={isSearchBy}
                    setIsSearchBy={setIsSearchBy}
                  />
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

export default TabArea;
