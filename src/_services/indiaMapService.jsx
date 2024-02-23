import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const indianMapServices = {
  getIndianMap,
};

function getIndianMap(data) {
  return http.post(RouteUrls.indiaMap, data, true);
}
