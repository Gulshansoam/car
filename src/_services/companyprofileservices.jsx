import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const tenderResultService = {
  getTenderResult,
  companyProfileDashboardCount,
  getCompanyProfilePublishTenderStateWise,
  getCompanyProfileTenderingOwnership,
  CompanyDepartment,
  getCompanyMonthWiseTenderChart,
  getCompanyProfileStage,
};

function getTenderResult(data) {
  return http.post(
    RouteUrls.tenderResult,
    {
      ...data,
      user_id: localStorage.getItem("user_id"),
      user_query_id: localStorage.getItem("user_email_service_query_id"),
    },
    true
  );
}

function companyProfileDashboardCount(data) {
  return http.post(
    RouteUrls.companyProfileDashboardCount,
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

function getCompanyProfilePublishTenderStateWise(data) {
  return http.post(
    RouteUrls.getCompanyProfilePublishTenderStateWise,
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

function getCompanyProfileTenderingOwnership(data) {
  return http.post(
    RouteUrls.getCompanyProfileTenderingOwnership,
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

function CompanyDepartment(data) {
  return http.post(
    RouteUrls.CompanyDepartment,
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

function getCompanyMonthWiseTenderChart(data) {
  return http.post(
    RouteUrls.getCompanyMonthWiseTenderChart,
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

function getCompanyProfileStage(data) {
  return http.post(
    RouteUrls.getCompanyProfileStage,
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
