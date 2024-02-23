import PropTypes from "prop-types";
// @mui
import { Typography, Stack } from "@mui/material";

// components
import Logo from "../../../components/logo";
import Image from "../../../components/image";
//
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";

import LoginFrontImg from "../../../assets/images/login-front-img.png";

// ----------------------------------------------------------------------

LoginPageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginPageLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <div className="login-main-area">
        <h2>Competitors Analytics Report</h2>
        <p>
          Participating in and winning government tenders largely depends on how
          well do you understand your competition.
        </p>
        <p>
          Competitor Analytics Reports is an advanced platform integrated with
          powerful BI tools to empower you with insights and intelligence that
          give you an edge to accurately predict your competitor's moves.
        </p>
        <div className="LoginFrontImg">
          <img src={LoginFrontImg}></img>
        </div>
      </div>

      <div className="login-rgt-area">
        <StyledSection>
          <StyledContent>
            <Stack sx={{ width: 1 }}> {children} </Stack>
          </StyledContent>
          <StyledSectionBg />
        </StyledSection>
      </div>
    </StyledRoot>
  );
}
