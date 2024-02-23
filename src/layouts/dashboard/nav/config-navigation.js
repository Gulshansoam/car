// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  dashboard: icon("ic_dashboard"),
  banking: icon("ic_banking"),
  user: icon("ic_user"),
  booking: icon("ic_booking"),
  analytics: icon("ic_analytics"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general v4.2.0',
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.dashboard,
      },
      {
        title: "Competitors",
        path: PATH_DASHBOARD.competitors,
        icon: ICONS.banking,
      },
      {
        title: "Company Profile",
        path: PATH_DASHBOARD.company_profile,
        icon: ICONS.user,
      },
      {
        title: "Tender Result",
        path: PATH_DASHBOARD.tender_result,
        icon: ICONS.booking,
      },
      {
        title: "MIS Reports",
        path: PATH_DASHBOARD.mis_reports,
        icon: ICONS.dashboard,
      },
      {
        title: "Compare Bidders",
        path: PATH_DASHBOARD.comparison,
        icon: ICONS.analytics,
      },
    ],
  },
];

export default navConfig;
