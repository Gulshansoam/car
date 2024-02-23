import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
import api from "../_apiConfig/baseapi";
export const dowloadExcel = {
  getDownloadExcelKey,
  getDownloadExcelSheet,
};

function getDownloadExcelKey(data) {
  return http.post(
    RouteUrls.downloadkey,
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

function getDownloadExcelSheet(data) {
  return http.get(
    `${api.defaults.DonwloadDoc}/T247ApiAnalytics/api/export-excel/${data}`,
    data,
    false
  );
}
