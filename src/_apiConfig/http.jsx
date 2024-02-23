import api from "../../src/_apiConfig/baseapi";
import { ApiResponse } from "../../src/_apiConfig/api.response";
import axios from "axios";

export const http = {
  get,
  post,
  logout,
  update,
  remove,
  download,
  downloadBob,
  downloadExcel,
};

function get(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .get(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function post(routeUrl, formdata, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .post(routeUrl, formdata, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
             logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}
function update(routeUrl, formdata, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .put(routeUrl, formdata, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}
function remove(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .delete(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.data);
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function download(routeUrl, isToken, customHeader = "") {
  return new Promise((resolve) => {
    return api
      .get(routeUrl, { headers: getHeaders(isToken, customHeader) })
      .then((res) => {
        resolve(res.blob());
      })
      .catch(function (err) {
        try {
          if (err.response.status === 401) {
            logout();
          }
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        } catch (commonerror) {
          resolve(ApiResponse(false, err.message, false, err.code, 0));
        }
      });
  });
}

function downloadBob(routeUrl, DownloadFileName, isToken, customHeader = "") {
  axios({
    url: routeUrl,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", DownloadFileName);
    document.body.appendChild(link);
    link.click();
  });
}

async function downloadExcel(url, requestData, isToken, customHeader = "") {
  try {
    const requestOptions = {
      method: "POST",
      headers: getHeaders(isToken, customHeader),
      body: JSON.stringify(requestData),
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }
    if (response.status === 204) {
      return alert("No Record Found");
    }
    return response;
  } catch (error) {
    console.error("Error while fetching the document:", error);
    throw error;
  }
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("dashboardStatics");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_email_service_query_id");
  window.location = "/";
}

function getHeaders(boolToken, custheader) {
  if (boolToken) {
    var userdata = localStorage.getItem("accessToken");
    if (userdata) {
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userdata}`,
      };
    } else {
      logout();
      window.location = "/";
    }
  } else {
    return custheader === ""
      ? { Accept: "application/json", "Content-Type": "application/json" }
      : custheader;
  }
}
