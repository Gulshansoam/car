import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Box, Link } from "@mui/material";
// config
import { HEADER } from "../../config-global";
// utils
import { bgBlur } from "../../utils/cssStyles";
// components
import Logo from "../../components/logo";

// ----------------------------------------------------------------------

Header.propTypes = {
  isOffset: PropTypes.bool,
};

export default function Header({ isOffset }) {
  const theme = useTheme();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(["height", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <div className="page-not-found">
          <Logo />
          <div className="MuiContainer-root MuiContainer-maxWidthXl css-19r6kue-MuiContainer-root">
            <h2>404 | Page Not Found</h2>
            <div className="page-not-found-link">
              <a href="/dashboard/home">Back to Home</a>
            </div>
          </div>
        </div>

        {/* <Link variant="subtitle2" color="inherit">
          Need Help?
        </Link> */}
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
