// i18n
import "./locales/i18n";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lazy image
// import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Router from "./routes";
import ThemeProvider from "./theme";
import ThemeLocalization from "./locales";
import SnackbarProvider from "./components/snackbar";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";
import ScrollToTop from "./components/scroll-to-top";
import { AuthProvider } from "./auth/JwtContext";
import { selectedDateRange } from "./layouts/dashboard/header/context-api/Context";
import { useState } from "react";
import { fromDate, toDate } from "./components/date-input/FromDateToDate";

export default function App() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(fromDate());
  const [selectedToDate, setSelectedToDate] = useState(toDate());

  return (
    <selectedDateRange.Provider
      value={{
        selectedFromDate,
        setSelectedFromDate,
        selectedToDate,
        setSelectedToDate,
        isDateSelected,
        setIsDateSelected,
      }}
    >
      <AuthProvider>
        <HelmetProvider>
          {/* <SettingsProvider> */}
          <BrowserRouter>
            <ScrollToTop />
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <SnackbarProvider>
                      <Router />
                    </SnackbarProvider>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </BrowserRouter>
          {/* </SettingsProvider> */}
        </HelmetProvider>
      </AuthProvider>
    </selectedDateRange.Provider>
  );
}
