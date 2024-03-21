import { http } from "../_apiConfig/http";
import { RouteUrls } from "../_apiConfig/routeUrls";
// const MisUrls = RouteUrls.misLive;
const MisUrls = RouteUrls.misLocal;

export const genrateMISService = {
  statewiseMis,
  statewiseMisReportDownload,
  statewiseBidderMisReportDownload,
  departmentwiseMis,
  departmentWiseMisReportDownload,
  departmentWiseMisBidderReportDownload,
  valuewiseMis,
  valueWiseMisExcelDownload,
  valueWiseCompanyReportDownload,
  competitorMis,
  competitorMisReportDowload,
  BidderWiseMis,
  BidderWiseMisReportDownload,
  ownershipWiseMis,
  ownershipWisMisBidderReportDownload,
  ownershipWisMisReportDownload,
  monthWiseMis,
  categoryWiseMis,
  categoryWisMisReportDownload,
  monthwiseMisReport,
  monthwiseBidderMisReportDownload,
  MisPdfDownload,
  misSamplePdfDownload,
};

// month wise services...........................
function monthWiseMis(data) {
  return http.post(
    MisUrls.misMonthWise,
    // MisUrls.misMonthWise,
    {
      ...data,
      user_id: localStorage.getItem("user_id"),
      user_query_id: localStorage.getItem("user_email_service_query_id"),
    },
    true
  );
}

function monthwiseMisReport(data) {
  return http.downloadExcel(
    MisUrls.misMonthWiseExcelDownload,
    // MisUrls.misMonthWiseExcelDownload,
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

function monthwiseBidderMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misMonthWiseCompanyReport,
    // MisUrls.misMonthWiseCompanyReport,
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

// statewise services................................
function statewiseMis(data) {
  return http.post(
    MisUrls.misStateWise,
    // MisUrls.misStateWise,
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

function statewiseMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misStateWiseExcelDownload,
    // MisUrls.misStateWiseExcelDownload,
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

function statewiseBidderMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misStateWiseCompanyReport,
    // MisUrls.misStateWiseCompanyReport,
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

// departmentwise services................................

function departmentwiseMis(data) {
  return http.post(
    MisUrls.misDepartmentWise,
    // MisUrls.misDepartmentWise,
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

function departmentWiseMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misDepartmentWiseExcelDownload,
    // MisUrls.misDepartmentWiseExcelDownload,
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

function departmentWiseMisBidderReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misDepartmentWiseCompanyReport,
    // MisUrls.misDepartmentWiseCompanyReport,
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

// valueWise services.........................................

function valuewiseMis(data) {
  return http.post(
    MisUrls.misValueWise,
    // MisUrls.misValueWise,
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

function valueWiseMisExcelDownload(data) {
  return http.downloadExcel(
    MisUrls.misValueWiseExcelDowload,
    // MisUrls.misValueWiseExcelDowload,
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

function valueWiseCompanyReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misValueWiseBidderReportDownload,
    // MisUrls.misValueWiseBidderReportDownload,
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

// competitorsWise services.............................

function competitorMis(data) {
  return http.post(
    MisUrls.misCompetitorsWiseTable,
    // MisUrls.misCompetitorsWiseTable,
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

function competitorMisReportDowload(data) {
  return http.downloadExcel(
    MisUrls.misCompetitorsWiseTableExcelDowload,
    // MisUrls.misCompetitorsWiseTableExcelDowload,
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

// bidderwise services...............................

function BidderWiseMis(data) {
  return http.post(
    MisUrls.misBidderWise,
    // MisUrls.misBidderWise,
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

function BidderWiseMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misBidderWiseExcelDownload,
    // MisUrls.misBidderWiseExcelDownload,
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

// ownership services........................................

function ownershipWiseMis(data) {
  return http.post(
    MisUrls.misOwnershipWise,
    // MisUrls.misOwnershipWise,
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

function ownershipWisMisBidderReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misOwnershipWiseCompanyReport,
    // MisUrls.misOwnershipWiseCompanyReport,
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

function ownershipWisMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misOwnershipWiseExcelDownload,
    // MisUrls.misOwnershipWiseExcelDownload,
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

// categorywise services..................................

function categoryWiseMis(data) {
  return http.post(
    MisUrls.misCategoryWise,
    // MisUrls.misCategoryWise,
    {
      ...data,
      user_id: localStorage.getItem("user_id"),
      user_query_id: localStorage.getItem("user_email_service_query_id"),
    },
    true
  );
}

function categoryWisMisReportDownload(data) {
  return http.downloadExcel(
    MisUrls.misCategoryWiseExcelDownload,
    // "http://192.168.7.179:7247/misapi/T247Mis/api/categoryWise-report-download",
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

async function MisPdfDownload(data) {
  const response = await fetch(MisUrls.pdfDownload, {
    method: "POST", // Specify the HTTP method, assuming it's a POST request
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      ...data,
      user_id: parseInt(localStorage.getItem("user_id")),
      user_query_id: parseInt(
        localStorage.getItem("user_email_service_query_id")
      ),
    }),
  });
  return response;
}

async function misSamplePdfDownload(data) {
  const response = await fetch(MisUrls.samplePdfDownload, {
    method: "GET", // Specify the HTTP method, assuming it's a POST request
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response;
}
