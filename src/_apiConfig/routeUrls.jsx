import { URLType } from "./baseapi";

export const RouteUrls = {
  ip: "T247ApiAnalytics/api/get-ip",
  login: "T247ApiAnalytics/api/user-login",
  forgotpassword: "T247ApiAnalytics/api/get-user-forget-password",
  autoLogin: "T247ApiAnalytics/api/get-user-auto-login",
  tenderResult: "T247ApiAnalytics/api/get-result-analytics-search",
  tenderDetail: "T247ApiAnalytics/api/get-result-detail",
  insertFavourite: "/T247ApiAnalytics/api/insert-favorite-tender-result",
  getParticipatingBidder: "T247ApiAnalytics/api/get-participating-bidder",
  getDocList: "T247ApiAnalytics/api/get-document-list",
  disclaimrDetail: "T247ApiAnalytics/api/get-disclaimer",
  getBidderParticipatedResult:
    "T247ApiAnalytics/api/get-bidder-participated-result",
  relatedKeyword: "T247ApiAnalytics/api/get-related-keyword-from-result-id",
  similarResult: "T247ApiAnalytics/api/get-similar-result",
  topCompetitors: "T247ApiAnalytics/api/get-bidder-top-competitors-list",
  dashboardStatistic: "T247ApiAnalytics/api/get-dashboard-statistics",
  tenderStateVise: "T247ApiAnalytics/api/get-publish-tender-state-wise",
  compititorListChartVise:
    "T247ApiAnalytics/api/get-bidder-top-competitors-list-chart-month-wise",
  getShortlistCompetitorslistChartMonthWise:
    "T247ApiAnalytics/api/get-shortlist-competitors-list-chart-month-wise",
  getTopCompetitorslist: "T247ApiAnalytics/api/get-top-competitors-list",
  insert: "T247ApiAnalytics/api/watchlist-insert",
  delete: "T247ApiAnalytics/api/watchlist-delete",
  getnotification: "T247ApiAnalytics/api/get-watchlist",
  getShortlistCompetitorsUpdate:
    "T247ApiAnalytics/api/get-shortlist-competitors-update",
  updateNotification: "T247ApiAnalytics/api/watchlist-update-view-notification",

  getTopCompetitorsListChartMonthWise:
    "T247ApiAnalytics/api/get-top-competitors-list-chart-month-wise",
  getGeneralCompetitorList: "T247ApiAnalytics/api/get-general-competitor-list",
  getShortlistCompetitors: "T247ApiAnalytics/api/get-shortlist-competitors",
  getShortlistCompetitorsListChartMonthWise:
    "T247ApiAnalytics/api/get-shortlist-competitors-list-chart-month-wise",
  getTenderingOwnership: "T247ApiAnalytics/api/get-tendering-ownership",

  //Filter urls------------->
  tenderFilterCity: "T247ApiAnalytics/api/get-city",
  tenderFilterStates: "T247ApiAnalytics/api/get-state",
  tenderFilterDepartment: "T247ApiAnalytics/api/get-organization",
  tenderingOwnership: "T247ApiAnalytics/api/get-organization-type",
  tenderStage: "T247ApiAnalytics/api/get-result-stage",
  keywords: "T247ApiAnalytics/api/get-keyword",
  subIndustry: "T247ApiAnalytics/api/get-subindustry",

  // ---------------------------Company profile-----------------------------------------

  companyProfileDashboardCount:
    "T247ApiAnalytics/api/get-company-profile-statistics",
  getCompanyProfilePublishTenderStateWise:
    "T247ApiAnalytics/api/get-company-profile-publish-tender-state-wise",
  getCompanyProfileTenderingOwnership:
    "T247ApiAnalytics/api/get-company-profile-tendering-ownership",
  CompanyDepartment: "T247ApiAnalytics/api/get-company-profile-department",
  getCompanyMonthWiseTenderChart:
    "T247ApiAnalytics/api/get-company-month-wise-tender-chart",
  getCompanyProfileStage: "T247ApiAnalytics/api/get-company-profile-stage",

  // ---------------------------Company profile-----------------------------------------

  getUserProfileDetail: "T247ApiAnalytics/api/get-user-profile-detail",
  changePassword: "T247ApiAnalytics/api/change-password",
  planUpgrade: "T247ApiAnalytics/api/upgrade-plan-request",
  invoiceDetails: "T247ApiAnalytics/api/company/get-invoice-detail",
  keyManager: "T247ApiAnalytics/api/get-key-manager-detail",

  // ---------------------------Compare Competitors-----------------------------------------

  getCompareCompetitorCompanies:
    "T247ApiAnalytics/api/get-compare-competitor-companies",
  getCompareSameBidComparisionStateWise:
    "T247ApiAnalytics/api/get-compare-same-bid-comparision-state-wise",
  getSameBidOfCompetitorCompanies:
    "T247ApiAnalytics/api/get-same-bid-of-competitor-companies",
  getStrongPointsOfCompetitorCompanies:
    "T247ApiAnalytics/api/get-strong-points-of-competitor-companies",
  getCompanyNameForComparison:
    "T247ApiAnalytics/api/get-company-name-for-comparison",
  getKeyword: "T247ApiAnalytics/api/get-keyword",
  getKeywordByName: "/T247ApiAnalytics/api/get-keyword-by-name",
  getParticipatingBidder: "T247ApiAnalytics/api/get-participating-bidder",

  // -------------------------------Site-Location_________-----------------------------------------
  getSiteLocation:
    "T247ApiAnalytics/api/get-result-analytics-site-location-detail",

  //***********************Download Excel*********** */
  downloadkey: "T247ApiAnalytics/api/encrypt-data",
  downloadExcel: "T247ApiAnalytics/api/export-excel",

  // ***************************tender-result count*****************************/
  count: "T247ApiAnalytics/api/get-result-analytics-search-count",

  // **************************************competitor-count*********************/
  generalListCount: "T247ApiAnalytics/api/get-general-competitor-list-count",

  // **************************************mis-reports*********************/
  /************************************************************
   *                                                         *
   *                    Local                                *
   *                                                         *
   **************************************************************/
  misLocal: {
    // ------- StateWise Table
    misStateWise: URLType.misApi + "/misapi/T247Mis/api/state-report",
    misStateWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/state_wise_report_download",
    misStateWiseCompanyReport:
      URLType.misApi + "/misapi/T247Mis/api/state_wise_bidder_report_download",
    // -----DepartmentWise
    misDepartmentWise: URLType.misApi + "/misapi/T247Mis/api/department-report",
    misDepartmentWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/department_wise_report_download",
    misDepartmentWiseCompanyReport:
      URLType.misApi +
      "/misapi/T247Mis/api/department_wise_bidder_report_download",
    // ------BidderWise
    misBidderWise: URLType.misApi + "/misapi/T247Mis/api/bidderWise-report",
    misBidderWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/bidder-report-download",
    // -------OwnershipWise
    misOwnershipWise: URLType.misApi + "/misapi/T247Mis/api/ownership-report",
    misOwnershipWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/ownership_wise_report_download",
    misOwnershipWiseCompanyReport:
      URLType.misApi +
      "/misapi/T247Mis/api/ownership_wise_bidder_report_download",
    // ---------MonthWise
    misMonthWise: URLType.misApi + "/misapi/T247Mis/api/monthWise-report",
    misMonthWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/month_wise_report_download",
    misMonthWiseCompanyReport:
      URLType.misApi + "/misapi/T247Mis/api/month_wise_bidder_report_download",
    // ------- Category
    misCategoryWise: URLType.misApi + "/misapi/T247Mis/api/categoryWise-report",
    misCategoryWiseExcelDownload:
      URLType.misApi + "/misapi/T247Mis/api/categoryWise-report-download",
    // --------ValueWise
    misValueWise: URLType.misApi + "/misapi/T247Mis/api/valueWise-report",
    misValueWiseExcelDowload:
      URLType.misApi + "/misapi/T247Mis/api/valueWise-report-download",
    misValueWiseBidderReportDownload:
      URLType.misApi + "/misapi/T247Mis/api/valueWise-bidder-report-download",
    // --------Competitors Table
    misCompetitorsWiseTable:
      URLType.misApi + "/misapi/T247Mis/api/competitorWise-report",
    misCompetitorsWiseTableExcelDowload:
      URLType.misApi + "/misapi/T247Mis/api/competitorWise-report-download",
    pdfDownload: URLType.misApi + "/misapi/T247Mis/api/download-pdf",
    samplePdfDownload:
      URLType.misApi + "/misapi/T247Mis/api/download-sample-pdf",
  },
  /************************************************************
   *                                                         *
   *                     Live                                *
   *                                                         *
   **************************************************************/
  misLive: {
    // ------- StateWise Table
    misStateWise: URLType.live + "/misapi/T247Mis/api/state-report",
    misStateWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/state_wise_report_download",

    misStateWiseCompanyReport:
      URLType.live + "/misapi/T247Mis/api/state_wise_bidder_report_download",
    // -----DepartmentWise
    misDepartmentWise: URLType.live + "/misapi/T247Mis/api/department-report",
    misDepartmentWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/department_wise_report_download",
    misDepartmentWiseCompanyReport:
      URLType.live +
      "/misapi/T247Mis/api/department_wise_bidder_report_download",
    // ------BidderWise
    misBidderWise: URLType.live + "/misapi/T247Mis/api/bidderWise-report",
    misBidderWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/bidder-report-download",
    // -------OwnershipWise
    misOwnershipWise: URLType.live + "/misapi/T247Mis/api/ownership-report",
    misOwnershipWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/ownership_wise_report_download",
    misOwnershipWiseCompanyReport:
      URLType.live +
      "/misapi/T247Mis/api/ownership_wise_bidder_report_download",
    // ---------MonthWise
    misMonthWise: URLType.live + "/misapi/T247Mis/api/monthWise-report",
    misMonthWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/month_wise_report_download",
    misMonthWiseCompanyReport:
      URLType.live + "/misapi/T247Mis/api/month_wise_bidder_report_download",
    // ------- Category
    misCategoryWise: URLType.live + "/misapi/T247Mis/api/categoryWise-report",
    misCategoryWiseExcelDownload:
      URLType.live + "/misapi/T247Mis/api/categoryWise-report-download",
    // --------ValueWise
    misValueWise: URLType.live + "/misapi/T247Mis/api/valueWise-report",
    misValueWiseExcelDowload:
      URLType.live + "/misapi/T247Mis/api/valueWise-report-download",
    misValueWiseBidderReportDownload:
      URLType.live + "/misapi/T247Mis/api/valueWise-bidder-report-download",
    // --------Competitors Table
    misCompetitorsWiseTable:
      URLType.live + "/misapi/T247Mis/api/competitorWise-report",
    misCompetitorsWiseTableExcelDowload:
      URLType.live + "/misapi/T247Mis/api/competitorWise-report-download",
    pdfDownload: URLType.live + "/misapi/T247Mis/api/download-pdf",
    samplePdfDownload:
      URLType.misApi + "/misapi/T247Mis/api/download-sample-pdf",
  },
};
