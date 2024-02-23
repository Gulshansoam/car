import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, IconButton } from "@mui/material";
import { bgBlur } from "../../../utils/cssStyles";
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
import { HEADER, NAV } from "../../../config-global";
import Logo from "../../../components/logo";
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";
import AccountPopover from "./AccountPopover";
import ResultDateInput from "./components/ResultDateInput";
import { useDispatch, useSelector } from "react-redux";
import { selectedDateRange } from "./context-api/Context";
import { useContext } from "react";

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const dispatch = useDispatch();
  const {
    selectedFromDate,
    selectedToDate,
    isDateSelected,
    setIsDateSelected,
  } = useContext(selectedDateRange);
  // const [fromDashboard, setFromDashoard] = useState(true)
  const initialListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === "horizontal";

  const isNavMini = themeLayout === "mini";

  const isDesktop = useResponsive("up", "lg");

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  // useEffect(() => {
  //   dispatch(
  //     setSelectedListing({
  //       ...initialListing,
  //       publication_date_from: selectedFromDate,
  //       publication_date_to: selectedToDate
  //     })
  //   );
  //   setFromDashoard(false)
  // }, [window.location.href])

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}
      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <div className="header-title">
        <h2 style={{ color: "black" }}>
          {window.location.href.split("/")[4] === "home"
            ? "Dashboard"
            : window.location.href.split("/")[4] === "competitors"
              ? "Competitors"
              : window.location.href.split("/")[4] === "company-profile"
                ? "Company Profile"
                : window.location.href.split("#")[0].split("/")[4] ===
                  "company-profile"
                  ? "Company Profile"
                  : window.location.href.split("/")[4] === "tender-result"
                    ? "Tender Result"
                    : window.location.href.split("/")[4] === "comparision"
                      ? "Companies Compare"
                      : window.location.href.split("/")[4] === "Tender Result"
                        ? "Company Profile Tenders"
                        : window.location.href.split("/")[4] === "listingdetails"
                          ? "Tender Detail"
                          : window.location.href.split("/")[4] === "profile"
                            ? "Profile"
                            : window.location.href.split("/")[4] === "profile"
                              ? "Profile"
                              : window.location.href.split("?")[0].split("/")[4] ===
                                "tender-result"
                                ? "tender-result"
                                : window.location.href.split("?")[0].split("/")[4] ===
                                  "companyprofile-tenders"
                                  ? "Tender Result"
                                  : ""}
        </h2>
      </div>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <div className="rangepicker-area">
          <ResultDateInput
            // fromDashboard={
            //   window.location.href.split("/")[4] === "home" ||
            //     window.location.href.split("/")[4] === "competitors" ||
            //     window.location.href.split("/")[4] === "listingdetails"
            //     ? true
            //     : false
            // }
            fromDashboard={
              window.location.href.split("/")[4] === "home" ? true : false
            }
          />
        </div>
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: "background.default",
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
