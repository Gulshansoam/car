import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tenderDetailServices } from "../../../_services/tenderDetailServices";

const Disclaimer = () => {
  const theme = useTheme();
  const [disclaimer, setDisclaimer] = React.useState([]);

  React.useEffect(() => {
    tenderDetailServices.getDisclaimerDetail().then((res) => {
      setDisclaimer(res.Data);
    });
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4a-content"
        id="panel4a-header"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        }}
      >
        <Typography>Disclaimer</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{disclaimer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Disclaimer;
