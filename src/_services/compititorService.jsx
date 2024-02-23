import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const compititorServices = {
  getTopCompetitorslist,
  getTopCompetitorsListChartMonthWise,
  getGeneralCompetitorList,
  getShortlistCompetitors,
  getShortlistCompetitorsListChartMonthWise,
  insert,
  deleteData,
  getShortlistCompetitorsUpdate,
  getGeneralCompetitorListCount,
  getUpdateNotification,
};

function getTopCompetitorslist(data) {
  return http.post(
    RouteUrls.getTopCompetitorslist,
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

function getTopCompetitorsListChartMonthWise(data) {
  return http.post(
    RouteUrls.getTopCompetitorsListChartMonthWise,
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

function getGeneralCompetitorList(data) {
  return http.post(
    RouteUrls.getGeneralCompetitorList,
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

function getShortlistCompetitors(data) {
  return http.post(
    RouteUrls.getShortlistCompetitors,
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

function getShortlistCompetitorsUpdate(data) {
  return http.post(
    RouteUrls.getShortlistCompetitors, 
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

function getShortlistCompetitorsListChartMonthWise(data) {
  return http.post(
    RouteUrls.getShortlistCompetitorsListChartMonthWise,
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

function insert(data) {
  // console.log(data);
  return http.post(RouteUrls.insert, data, true);
}

function deleteData(data) {
  return http.post(RouteUrls.delete, data, true);
}

function getGeneralCompetitorListCount(data) {
  return http.post(
    RouteUrls.generalListCount,
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

function getUpdateNotification(data) {
  return http.post(
    RouteUrls.updateNotification,
    data,
    true
  );
}
