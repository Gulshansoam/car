import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import "../../../../assets/style/BS5_Grid.css";
import "../../../../assets/style/style.css";

import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSettingsContext } from "../../../../components/settings/SettingsContext";
import TenderResults from "./components/TenderResults";
import FreshResults from "./components/FreshResult";
import MyResults from "./components/MyResult";
import FavResult from "./components/FavResult";
import { valueConvert } from "../../../../_helpers/valueConvert";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SimilarTenderResult() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [value, setValue] = React.useState("2");
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState({});
  const [myResultCount, setMyResultCount] = React.useState({});
  const [freshResultCount, setFreshResultCount] = React.useState({});
  const [favResultCount, setFavResultCount] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
  };

  const StyledTab = styled(Tab)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
  }));

  return (
    <>
      <div className="tab-area">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid container spacing={3}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <StyledTab
                      className="listing-tabs"
                      label={`Fresh Results ${
                        freshResultCount.resultcount > 0 && value === "1"
                          ? `(${valueConvert(freshResultCount.resultcount)})`
                          : ""
                      }`}
                      value="1"
                    />
                    <StyledTab
                      className="listing-tabs"
                      label={`Tender Results ${
                        count.resultcount > 0 && value === "2"
                          ? `(${valueConvert(count.resultcount)})`
                          : ""
                      }`}
                      value="2"
                    />
                    <StyledTab
                      className="listing-tabs"
                      label={`My Results ${
                        myResultCount.resultcount > 0 && value === "3"
                          ? `(${valueConvert(myResultCount.resultcount)})`
                          : ""
                      }`}
                      value="3"
                    />
                    <StyledTab
                      className="listing-tabs"
                      label={`Fav. Results ${
                        favResultCount.resultcount > 0 && value === "4"
                          ? `(${valueConvert(favResultCount.resultcount)})`
                          : ""
                      }`}
                      value="4"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <FreshResults
                    freshResultCount={freshResultCount}
                    setFreshResultCount={setFreshResultCount}
                    setPage={setPage}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <TenderResults
                    count={count}
                    setCount={setCount}
                    setPage={setPage}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <MyResults
                    myResultCount={myResultCount}
                    setMyResultCount={setMyResultCount}
                    setPage={setPage}
                  />
                </TabPanel>
                <TabPanel value="4">
                  <FavResult
                    favResultCount={favResultCount}
                    setFavResultCount={setFavResultCount}
                    setPage={setPage}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Container>
      </div>
    </>
  );
}
