import {
  Tab,
  Card,
  Tabs,
  Container,
  Box,
  Typography,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useSettingsContext } from "../../../components/settings";
import UserIcon from "../../../assets/images/user-img.png";
import Image from "../../../components/image";

function bgBlur(props) {
  const color = props?.color || "#000000";
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: "relative",
      backgroundImage: `url(${imgUrl})`,
      "&:before": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: "100%",
        height: "100%",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

const StyledRoot = styled("div")(({ theme }) => ({
  "&:before": {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

export default function ProfileCover({ cover }) {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container className="cover-area" maxWidth={themeStretch ? false : ""}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <StyledRoot>
            <StyledInfo>
              <Box
                className="profile-area"
                sx={{
                  ml: { md: 3 },
                  mt: { xs: 1, md: 0 },
                  color: "common.white",
                  textAlign: { xs: "center", md: "left" },
                }}
              ></Box>
            </StyledInfo>
            <Image
              src={cover}
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "absolute",
              }}
            />
          </StyledRoot>
        </Card>
      </Container>
    </>
  );
}
