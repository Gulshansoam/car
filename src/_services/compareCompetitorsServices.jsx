import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const compareCompetitors = {
  getCompareCompetitorCompanies,
  getCompareSameBidComparisionStateWise,
  getSameBidOfCompetitorCompanies,
  getStrongPointsOfCompetitorCompanies,
  getCompanyNameForComparison,
  getKeyword,
  getKeywordByName,
};

function getCompareCompetitorCompanies(data) {
  return http.post(
    RouteUrls.getCompareCompetitorCompanies,
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

function getCompareSameBidComparisionStateWise(data) {
  return http.post(
    RouteUrls.getCompareSameBidComparisionStateWise,
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

function getSameBidOfCompetitorCompanies(data) {
  return http.post(
    RouteUrls.getSameBidOfCompetitorCompanies,
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

function getStrongPointsOfCompetitorCompanies(data) {
  return http.post(
    RouteUrls.getStrongPointsOfCompetitorCompanies,
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

function getCompanyNameForComparison(data) {
  return http.post(
    RouteUrls.getCompanyNameForComparison,
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

function getKeyword() {
  return http.get(RouteUrls.getKeyword, true);
}
function getKeywordByName(data) {
  return http.post(
    `${RouteUrls.getKeywordByName}?keywordName=${data.keywordName}&pageNo=${data.pageNo}&noOfRecords=${data.noOfRecords}`,
    data,
    true
  );
}
