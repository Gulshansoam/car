import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";

export const tenderDetailServices = {
  tenderDetail,
  getParticipatingBidder,
  getDocumentList,
  downloadSingleDocument,
  getDisclaimerDetail,
  downloadAllDocument,
  getBidderParticipatedResult,
  getRelatedWord,
  getSimilarResult,
};

function tenderDetail(data) {
  return http.post(RouteUrls.tenderDetail, data, true);
}

function getParticipatingBidder(data) {
  return http.post(RouteUrls.getParticipatingBidder, data, true);
}

function getDocumentList(data) {
  return http.post(RouteUrls.getDocList, data, true);
}

function downloadSingleDocument(download_document_path) {
  return http.get(
    `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/download-for-single?document_path=${download_document_path}`,
    false
  );
}

function downloadAllDocument(document_path) {
  return http.get(
    `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/download-for-zip?document_path=${document_path}`,
    false
  );
}

function getDisclaimerDetail() {
  return http.get(RouteUrls.disclaimrDetail, true);
}

function getBidderParticipatedResult(data) {
  return http.post(
    RouteUrls.getBidderParticipatedResult,
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

function getRelatedWord(data) {
  return http.post(RouteUrls.relatedKeyword, data, true);
}

function getSimilarResult(data) {
  return http.post(RouteUrls.similarResult, data, true);
}
