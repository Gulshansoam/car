import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useSettingsContext } from "../../components/settings/SettingsContext";
import TenderDetail from "./components/TenderDetail";
import DateAndValues from "./components/DateAndValues";
import ParticipatingBidderDetail from "./components/ParticipatingBidderDetail";
import ResultDownloadDoc from "./components/ResultDownloadDoc";
import Disclaimer from "./components/Disclaimer";
import GetBidderResult from "./components/GetBidderResult";
import SimilarTenders from "./components/SimilarTenders";
import RelatedKeyword from "./components/RelatedKeyword";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

export default function ResultDetailPage() {
  const { themeStretch } = useSettingsContext();
  const [winnerBidder, setWinnerBidder] = React.useState([]);
  const [firstStoreData, setFirstStoreData] = useState("");
  const [bidders, setbidders] = useState("");
  const [resultDetail, setResultDetail] = useState([]);

  return (
    <div className="details-area">
      <Helmet>
        <title>Detail</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <div className="row">
            <div className="col-xs-12 col-lg-9">
              {/************************************************************ */}
              <TenderDetail
                setWinnerBidder={setWinnerBidder}
                resultDetail={resultDetail}
                setResultDetail={setResultDetail}
              />
              {/************************************************************ */}
              <DateAndValues />
              {/************************************************************ */}
              <ParticipatingBidderDetail
                setbidders={setbidders}
                stage={
                  resultDetail[0]?.stage !== undefined &&
                  resultDetail[0]?.stage !== null &&
                  resultDetail[0]?.stage.length > 0 &&
                  resultDetail[0]?.stage.toLowerCase()
                }
              />
              {/************************************************************ */}
              <ResultDownloadDoc />
              {/************************************************************ */}

              {/************************************************************ */}
              <GetBidderResult
                bidders={bidders}
                // winnerBidder={winnerBidder}
                // setWinnerBidder={setWinnerBidder}
                // firstStoreData={firstStoreData}
                // setFirstStoreData={setFirstStoreData}
              />
              {/************************************************************ */}
              <SimilarTenders />
              {/************************************************************ */}
              <Disclaimer />
            </div>
            {/************************************************************ */}
            <RelatedKeyword
              winnerBidder={winnerBidder}
              setWinnerBidder={setWinnerBidder}
            />
            {/************************************************************ */}
          </div>
        </Grid>
      </Container>
    </div>
  );
}
