import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useTheme } from "@mui/material/styles";
import { Alert, Box, MenuItem, Select, Typography } from "@mui/material";
import { FormControl } from "@material-ui/core";
import { userService } from "../../../_services/userControllerService";
import { LoadingButton } from "@mui/lab";

const PlanModal = (props) => {
  const theme = useTheme();
  const {
    setModalOpen,
    modalOpen,
    planOption,
    setPlanOption,
    modalComment,
    setModalComment,
    plan,
    setPlan
  } = props;

  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    setPlanOption("option1");
  };

  const handleSelectChange = (event) => {
    setPlanOption(event.target.value);
    switch (event.target.value) {
      case "option1":
        setPlan("State Upgrade");
        break;
      case "option2":
        setPlan("Pan India");
        break;
      case "option3":
        setPlan("Category");
        break;
      case "option4":
        setPlan("Duration");
        break;
      default:
        console.log("Unknown option selected");
    }
  };

  console.log(plan, "plan", planOption);

  const handleModalSubmmit = async () => {
    setLoading(true);
    if (planOption.length > 0) {
      const res = await userService.getUserPlan({
        comments: modalComment,
        plan: plan,
      });
      if (res.Success === true) {
        setLoading(false);
        setIsPlanSelected(true);
        setTimeout(() => {
          setLoading(false);
          setIsPlanSelected(false);
        }, 3000);
      } else if (res.error) {
        setIsPlanSelected(false);
      }
    }
    // setLoading(false);
  };

  const handleModalClear = () => {
    // setIsPlanSelected(false);
    // setPlanOption("");
    // setPlan("");
    setModalComment("");
  };

  return (
    <Modal
      open={modalOpen}
      onCancel={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      footer={null}
      className="participant-bidder-list"
      style={{ height: "300px", width: "500px" }}
    >
      <Box>
        <Typography
          className="plan-heading-area"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {`Plan`}
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="plan-select-box"
            value={planOption}
            onChange={handleSelectChange}
            required
          >
            <MenuItem value="option1">State Upgrade</MenuItem>
            <MenuItem value="option2">Pan India</MenuItem>
            <MenuItem value="option3">Category</MenuItem>
            <MenuItem value="option4">Duration</MenuItem>
          </Select>
          <div
            className="write-feedback-area"
            style={{ "padding-top": "10px" }}
          >
            <textarea
              placeholder="Comments..."
              value={modalComment}
              onChange={(e) => setModalComment(e.target.value)}
            ></textarea>
          </div>
        </FormControl>
        <div className="plan-btn-area">
          <LoadingButton
            className="plan-btn"
            onClick={handleModalSubmmit}
            loading={loading}
            //   loadingPosition="start"
            //   startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.darker,
              color: (theme) => theme.palette.primary.white,
              "&:hover": {
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            <span>Submit</span>
          </LoadingButton>
          <Button
            className="plan-btn clear-btn"
            onClick={handleModalClear}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </Button>
        </div>

        {isPlanSelected && (
          <Alert severity="success" className="alert-msg">
            We have Received your Request, Our Team will Contact you Shortly
          </Alert>
        )}
        {planOption.length === 0 && (
          <Alert severity="error">Please, Select Your Plan</Alert>
        )}
      </Box>
    </Modal>
  );
};

export default PlanModal;
