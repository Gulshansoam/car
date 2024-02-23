import { genrateMISService } from "../../_services/misReportService";

export async function downloadBlob(response, name) {
  console.log(response);

  if (!response?.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }
  const filename = (() => {
    const filenameHeader = response.headers.get("content-disposition");
    const filenameMatch =
      filenameHeader && filenameHeader.match(/filename="(.+?)"/);
    // return filenameMatch ? filenameMatch[1] : `IndianTenderdata_${0}.xlsx`;
    return `${name}.xlsx`;
    // ? filenameMatch[1] : `IndianTenderdata_${0}.xlsx`;
  })();

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  a.click();
}

// **************************StateWise-ClickEvent************************************

export const handleDownloadExcelStateWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.statewiseMisReportDownload(
      requestData
    );
    downloadBlob(response, "State wise excel");
  } catch (error) {
    alert("No Data Found");
  }
};

export const handleDownloadExcelComapanyReportStateWise = async (
  stateWiseForm
) => {
  try {
    let requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response = await genrateMISService.statewiseBidderMisReportDownload(
      requestData
    );
    downloadBlob(response, "State wise company report");
  } catch (error) {
    alert("No Data Found");
  }
};

// ***************************DepartMentWise-ClickEvent*************************************

export const handleDownloadExcelDepartmentWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.departmentWiseMisReportDownload(
      requestData
    );
    downloadBlob(response, "DepartmentWise excel");
  } catch (error) {
    alert("No Data Found");
  }
};

export const handleDownloadExcelCompanyReportDepartmentWise = async (
  stateWiseForm
) => {
  try {
    let requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response =
      await genrateMISService.departmentWiseMisBidderReportDownload(
        requestData
      );
    downloadBlob(response, "DepartmentWise company report");
  } catch (error) {
    alert("No Data Found");
  }
};

// *******************************ValueWise-ClickEvent**********************************

export const handleDownloadExcelValueWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.valueWiseMisExcelDownload(
      requestData
    );
    downloadBlob(response, "ValueWise excel");
  } catch (error) {
    alert("No Data Found");
  }
};

export const handleDownloadExcelCompanyReportValueWise = async (
  stateWiseForm
) => {
  try {
    let requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response = await genrateMISService.valueWiseCompanyReportDownload(
      requestData
    );
    downloadBlob(response, "Ownership Wise Company Report");
  } catch (error) {
    alert("No Data Found");
  }
};

// ****************************CompetitorsTableWise-ClickEvents***************************************

export const handleDownloadExcelCompetitorsTableWise = async (
  stateWiseForm
) => {
  try {
    const requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response = await genrateMISService.competitorMisReportDowload(
      requestData
    );
    downloadBlob(response, "Competitors Excel");
  } catch (error) {
    alert("No Data Found");
  }
};

// *************************BidderWiseReports-ClickEvents************************************

export const handleDownloadExcelBidderReports = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.BidderWiseMisReportDownload(
      requestData
    );
    downloadBlob(response, "Bidders-Report Excel");
  } catch (error) {
    alert("No Data Found");
  }
};

// ******************************Ownership-ClickEvent**********************************//

export const handleDownloadExcelCompanyReportOwnershipReportWise = async (
  stateWiseForm
) => {
  try {
    let requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response = await genrateMISService.ownershipWisMisBidderReportDownload(
      requestData
    );
    downloadBlob(response, "Ownership Wise Company Report");
  } catch (error) {
    alert("No Data Found");
  }
};

export const handleDownloadExcelOwnershipReportWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.ownershipWisMisReportDownload(
      requestData
    );
    downloadBlob(response, "Ownership Wise Excel");
  } catch (error) {
    alert("No Data Found");
  }
};

// *************************MonthWise-ClickEvent********************************************

export const handleDownloadExcelMonthWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.monthwiseMisReport(requestData);
    downloadBlob(response, "Month Wise Excel");
  } catch (error) {
    alert("No Data Found");
  }
};

export const handleDownloadExcelComapnyReportMonthWise = async (
  stateWiseForm
) => {
  try {
    let requestData = {
      ...stateWiseForm,
      bidder_name: stateWiseForm.bidder_name
        ? stateWiseForm.bidder_name
        : localStorage.getItem("user_name"),
    };
    let response = await genrateMISService.monthwiseBidderMisReportDownload(
      requestData
    );
    downloadBlob(response, "Month Wise Company Report");
  } catch (error) {
    alert("No Data Found");
  }
};

// *****************************CategoryWise-ClickEvent*****************************

export const handleDownloadExcelCategoryWise = async (stateWiseForm) => {
  try {
    const requestData = {
      ...stateWiseForm,
      record_per_page: 6,
    };
    let response = await genrateMISService.categoryWisMisReportDownload(
      requestData
    );
    downloadBlob(response, "Category Wise Excel");
  } catch (error) {
    alert("No Data Found");
  }
};
