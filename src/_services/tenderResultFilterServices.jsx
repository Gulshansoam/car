import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const tenderResultFilterService = {
  getState,
  getCity,
  getDepartment,
  getTenderingOwnership,
  getTenderStage,
  getKeywords,
  getSubIndustrySevice,
};

function getState(data) {
  return http.post(
    `${RouteUrls.tenderFilterStates}?id=${data.id}&pageNo=${data.pageNo}&noofrecords=${data.noofrecords}&parentids=${data.parentids}&name=${data.name}`,
    data,
    true
  );
}

function getCity(data) {
  return http.post(
    `${RouteUrls.tenderFilterCity}?id=${data.id}&pageNo=${data.pageNo}&noofrecords=${data.noofrecords}&parentids=${data.parentids}&name=${data.name}`,
    data,
    true
  );
}

function getDepartment(data) {
  return http.post(
    `${RouteUrls.tenderFilterDepartment}?id=${data.id}&noOfRecords=${data.noOfRecords}&pageNo=${data.pageNo}&parentids=${data.parentids}&name=${data.name}`,
    data,
    true
  );
}

function getTenderingOwnership() {
  return http.get(RouteUrls.tenderingOwnership, true);
}

function getTenderStage() {
  return http.get(RouteUrls.tenderStage, true);
}
function getKeywords() {
  return http.get(RouteUrls.keywords, true);
}
function getSubIndustrySevice() {
  return http.get(RouteUrls.subIndustry, true);
}
