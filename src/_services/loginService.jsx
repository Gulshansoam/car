import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
export const loginService = {
  login,
  forgotpassword,
  autoLogin,
};

function login(data) {
  return http.post(RouteUrls.login, data, false);
}

function forgotpassword(email) {
  return http.post(RouteUrls.forgotpassword, email, false);
  // return http.post("http://115.124.124.31:9393/T247ApiAnalytics/api/get-user-forget-password", email, false)
}

function autoLogin(data) {
  return http.post(`${RouteUrls.autoLogin}/${data}`, data, false);
}
