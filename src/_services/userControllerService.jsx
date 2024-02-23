import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const userService = {
  getUserProfileDetail,
  changePassword,
  getUserPlan,
  getKeyManager,
  getInvoiceDetails,
  getIp,
  // getInvoiceDownload,
};

function getUserProfileDetail(data) {
  return http.post(RouteUrls.getUserProfileDetail, data, true);
}

function getUserPlan(data) {
  return http.post(
    RouteUrls.planUpgrade,
    // "http://192.168.7.78:9393/T247ApiAnalytics/api/upgrade-plan-request",
    // "http://192.168.7.180:8080/api/upgrade-plan-request",
    data,
    true
  );
}
function getKeyManager(data) {
  return http.post(
    RouteUrls.keyManager,
    // "http://192.168.7.78:9393/T247ApiAnalytics/api/upgrade-plan-request",
    // "http://192.168.7.78:9393/T247ApiAnalytics/api/get-key-manager-detail",
    data,
    true
  );
}

function changePassword(data) {
  return http.post(RouteUrls.changePassword, data, true);
}
function getInvoiceDetails(data) {
  return http.post(RouteUrls.changePassword, data, true);
}

function getIp(data) {
  return http.get(RouteUrls.ip, false);
}
