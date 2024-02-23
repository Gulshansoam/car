import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const tenderResultService = {
  getTenderResult,
  getParticipatingBidder,
  insertFavouriteResult,
  getCountService,
};

function getTenderResult(data) {
  return http.post(RouteUrls.tenderResult, data, true);
}

function getParticipatingBidder(data) {
  return http.post(RouteUrls.getParticipatingBidder, data, true);
}
function insertFavouriteResult(data) {
  return http.post(RouteUrls.insertFavourite, data, true);
}

function getCountService(data) {
  return http.post(RouteUrls.count, data, true);
}
