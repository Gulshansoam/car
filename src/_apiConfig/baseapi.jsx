import axios from "axios";

export const environment = {
  Local: "Local",
  Test: "Test",
};

export const URLType = {
  // Local: "http://localhost:15370/",
  live: "https://analyticsapi.tender247.com",
  Local: "http://192.168.7.78:9393",
  // Local: "http://192.168.8.72:9090",
  Test: "http://192.168.7.179:7247/api",
  misApi:"http://192.168.8.71:7247",
  // misApi: "https://analyticsapi.tender247.com",
};

export default axios.create({
  //const customInstance = axios.create ({
  baseURL: URLType.live,
  environment: environment.live,
  // baseURL: URLType.Local,
  // environment: environment.live,
  // DonwloadDoc: "http://192.168.7.78:9393",
  DonwloadDoc: "https://analyticsapi.tender247.com",
  //'http://localhost:26491/',
  //headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
});

//   axios.defaults.baseURL = 'https://api.example.com';npm
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
