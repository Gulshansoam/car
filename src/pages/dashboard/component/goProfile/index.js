import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { setBidderName } from "../../../../redux/slice";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import MotivationIllustration from "./components/MotivationIllustration";

export function bgGradient(props) {
  const direction = props?.direction || "to bottom";
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

const GoProfile = () => {
  const dispatch = useDispatch();

  const redirectCompanyProfile = () => {
    dispatch(setBidderName(localStorage.getItem("user_name")));
    window.open("/dashboard/company-profile");
  };

  //***************************************mui styled divs*********************************************** */
  const StyledRoot = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    color: theme.palette.primary.darker,
    borderRadius: Number(theme.shape.borderRadius) * 2,
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  }));

  const StyledBg = styled("div")(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: theme.palette.common.white,
    "&:before": {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: -2,
      content: '""',
      opacity: 0.2,
      ...bgGradient({
        direction: "135deg",
        startColor: theme.palette.primary.light,
        endColor: theme.palette.primary.main,
      }),
    },
  }));
  return (
    <>
      <StyledRoot className="dashboard-first-banner">
        <Stack
          flexGrow={1}
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
          sx={{
            pl: 5,
            py: { xs: 5, md: 0 },
            pr: { xs: 5, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography paragraph variant="h4" sx={{ whiteSpace: "pre-line" }}>
            Welcome !<span>{localStorage.user_name}</span>
          </Typography>

          <Button variant="contained" onClick={redirectCompanyProfile}>
            Go Profile
          </Button>
        </Stack>

        <MotivationIllustration
          sx={{
            p: 3,
            width: 360,
            margin: { xs: "auto", md: "inherit" },
          }}
        />

        <StyledBg />
      </StyledRoot>
    </>
  );
};

export default GoProfile;
