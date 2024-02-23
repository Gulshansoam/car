import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";

export const resultLocationService = {
  siteLocation,
};

function siteLocation(data) {
  return http.post(RouteUrls.getSiteLocation, data, true);
}
