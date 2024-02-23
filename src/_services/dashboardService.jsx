import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const dashboardService = {
  getTopCompetitorsList,
  dashboardStatistics,
  getPublishTenderStateVise,
  getBidderTopCompititorsListChartMonthWise,
  getShortlistCompetitorslistChartMonthWise,
  getTenderingOwnership,
};

function getTopCompetitorsList(data) {
  return http.post(
    RouteUrls.topCompetitors,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

function dashboardStatistics(data) {
  return http.post(
    RouteUrls.dashboardStatistic,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

function getPublishTenderStateVise(data) {
  return http.post(
    RouteUrls.tenderStateVise,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

function getBidderTopCompititorsListChartMonthWise(data) {
  return http.post(
    RouteUrls.compititorListChartVise,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

function getShortlistCompetitorslistChartMonthWise(data) {
  return http.post(
    RouteUrls.getShortlistCompetitorslistChartMonthWise,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

function getTenderingOwnership(data) {
  return http.post(
    RouteUrls.getTenderingOwnership,
    {
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    },
    true
  );
}

