import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const tenderingOwnershipService = {
  getTenderingOwnership,
};

function getTenderingOwnership(data) {
  return http.post(RouteUrls.tenderingOwnership, data, true);
}
