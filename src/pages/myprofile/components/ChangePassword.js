import React from "react";
import { Alert } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { userService } from "../../../_services/userControllerService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Modal } from "antd";
import { useAuthContext } from "../../../auth/useAuthContext";
import { PATH_AUTH } from "../../../routes/paths";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    old_password: { errors: "", valid: false },
    new_password: { errors: "", valid: false },
    ReEnter_password: {
      errors: "",
      valid: false,
    },
  });
  const [formData, setFormData] = useState({
    user_id: 0,
    old_password: "",
    new_password: "",
    ReEnter_password: "",
  });
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [passwordChangedSuccessFully, setPasswordChangedSuccessFully] =
    useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    border: "none",
    borderRadius: "10px",
  };

  function Required(val) {
    return val !== undefined && val.trim().length > 0
      ? { isValid: true, message: "" }
      : { isValid: false, message: "This field is Required!" };
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData["new_password"] === "" &&
      formData["old_password"] === "" &&
      formData["ReEnter_password"] === ""
    ) {
      setIsErrorMessage(true);
      setTimeout(() => {
        setIsErrorMessage(false);
      }, 3000);
    } else {
      if (formData["new_password"] === formData["ReEnter_password"]) {
        setIsErrorMessage(false);
        setIsError(false);
        userService
          .changePassword({
            user_id: localStorage.getItem("user_id"),
            old_password: formData.old_password,
            new_password: formData.new_password,
          })
          .then((res) => {
            if (res.Success === true) {
              setIsError(false);
              setPasswordChangedSuccessFully(true);
              setFormData((prev) => ({
                ...prev,
                old_password: "",
                new_password: "",
                ReEnter_password: "",
              }));
              setTimeout(() => {
                setPasswordChangedSuccessFully(false);
                logout();
                navigate(PATH_AUTH.login);
              }, [3000]);
            } else {
              setIsError(true);
              setTimeout(() => {
                setIsError(false);
              }, [5000]);
              setPasswordChangedSuccessFully(false);
            }
          })
          .catch((err) => {
            console.log("Change Password Error" + err);
          });
      } else {
        setError((prev) => ({
          ...prev,
          ReEnter_password: {
            errors: "Please Enter Same Password",
            valid: false,
          },
        }));
      }
    }
  };

  const handleChange = (e, IsValidate = false) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (IsValidate === true) {
      let validResp = Required(e.target.value);
      setError((prevState) => ({
        ...prevState,
        [name]: {
          valid: validResp.isValid,
          errors: validResp.message,
        },
      }));
    }
  };

  return (
    <div className="">
      <div className="row">
        {/* <div
          className="col-3 myprofile-title-area"
          style={{
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          }}
        >
          <h2>Change Password</h2>
        </div> */}
        <h3>Change Password</h3>
        <div className="dark-button">
          <Button
            style={{
              backgroundColor: theme.palette.primary.darker,
              color: theme.palette.common.white,
            }}
            onClick={handleClickOpen}
          >
            Change Password
          </Button>

          <Modal
            open={open}
            onCancel={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            footer={null}
            maskClosable={false}
            className="change-password-box"
          >
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Change Password
                </Typography>
                <div>
                  {passwordChangedSuccessFully === true ? (
                    <Alert
                      severity="success"
                      style={{
                        border: "none",
                        width: " 100%",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      Password Updated Successfully
                    </Alert>
                  ) : (
                    ""
                  )}
                  {isErrorMessage === true ? (
                    <Alert
                      severity="error"
                      style={{
                        border: "none",
                        width: " 100%",
                        textAlign: "center",
                      }}
                    >
                      Please Enter All Fields
                    </Alert>
                  ) : (
                    ""
                  )}
                  {isError === true ? (
                    <Alert
                      severity="error"
                      style={{
                        border: "none",
                        width: " 100%",
                        textAlign: "center",
                      }}
                    >
                      Old Password is Wrong
                    </Alert>
                  ) : (
                    ""
                  )}
                </div>
                <div className="modal-box">
                  <div className="col-12 input-filed">
                    <FormControl>
                      <InputLabel>Old Password</InputLabel>
                      <OutlinedInput
                        type={showPassword1 ? "text" : "password"}
                        className="text-field"
                        name="old_password"
                        onChange={(e) => handleChange(e, true)}
                        value={formData.old_password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setShowPassword1((show) => !show);
                              }}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                              edge="end"
                            >
                              {showPassword1 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Old Password"
                      />
                    </FormControl>
                  </div>
                  <div className="error">
                    {error.old_password && (
                      <span className="err">{error.old_password.errors}</span>
                    )}
                  </div>

                  <div className="col-12 input-filed">
                    <FormControl>
                      <InputLabel>New Password</InputLabel>
                      <OutlinedInput
                        type={showPassword2 ? "text" : "password"}
                        className="text-field"
                        name="new_password"
                        onChange={(e) => handleChange(e, true)}
                        value={formData.new_password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setShowPassword2((show) => !show);
                              }}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="New Password"
                      />
                    </FormControl>
                  </div>
                  <div className="error">
                    {error.new_password && (
                      <span className="err">{error.new_password.errors}</span>
                    )}
                  </div>

                  <div className="col-12 input-filed">
                    <FormControl>
                      <InputLabel>Re-enter Password</InputLabel>

                      <OutlinedInput
                        type={showPassword3 ? "text" : "password"}
                        className="text-field"
                        name="ReEnter_password"
                        onChange={(e) => handleChange(e, true)}
                        value={formData.ReEnter_password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setShowPassword3((show) => !show);
                              }}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                              edge="end"
                            >
                              {showPassword3 ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Re-enter Password"
                      />
                    </FormControl>
                  </div>
                  <div className="error">
                    {error.ReEnter_password && (
                      <span className="err">
                        {error.ReEnter_password.errors}
                      </span>
                    )}
                  </div>
                </div>
                <div className="myprofile-details-area-btn">
                  <Button
                    style={{
                      backgroundColor: theme.palette.primary.darker,
                      color: theme.palette.common.white,
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
