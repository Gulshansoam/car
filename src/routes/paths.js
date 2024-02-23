// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, "/home"),
  competitors: path(ROOTS_DASHBOARD, "/competitors"),
  competitorsBidders: path(ROOTS_DASHBOARD, "/competitors-bidders"),
  company_profile: path(ROOTS_DASHBOARD, "/company-profile"),
  tender_result: path(ROOTS_DASHBOARD, "/tender-result"),
  mis_reports: path(ROOTS_DASHBOARD, "/misreport"),
  comparison: path(ROOTS_DASHBOARD, "/comparision"),
};
