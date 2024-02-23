import { useState } from "react";
import * as Yup from "yup";
// form
import { Controller, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Modal,
  Box,
  Input,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import Iconify from "../../../components/iconify";
import FormProvider, { RHFTextField } from "../../../components/hook-form";
import {
  fromDefaulDate,
  toDefaultDate,
} from "../../../components/date-input/FromDateToDate";
import { useDispatch, useSelector } from "react-redux";
import { setListingModel, setResultListingModel } from "../../../redux/slice";
import { loginService } from "../../../_services/loginService";
import { userService } from "../../../_services/userControllerService";
import { useEffect } from "react";

// ----------------------------------------------------------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #0000001c",
  boxShadow: 24,
  p: 4,
};
export default function LoginForm() {
  const { login } = useAuthContext();

  const [modelOpen, setModelOpen] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const initialListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [showPassword, setShowPassword] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  // const defaultValues = {
  //   email: email,
  //   password: "",
  // };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    // defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const IpCheck = (ip) => {
    const companyIp = [
      "202.131.108.246",
      "182.76.214.22",
      "122.179.195.13",
      "122.179.195.13",
    ];
    const getIp = companyIp.find((res) => res === ip);
    return getIp;
  };

  useEffect(() => {
    userService.getIp().then((res) => {
      setIpAddress(res);
    });
  }, []);

  const onSubmit = async (data) => {
    // const ip = await userService.getIp();
    // if (data.email === "india@user.com") {
    //   if (IpCheck(ipAddress) !== undefined) {
    //     dispatch(
    //       setListingModel({
    //         ...initialListing,
    //         publication_date_from: fromDefaulDate(),
    //         publication_date_to: toDefaultDate(),
    //       })
    //     );
    //     try {
    //       const res = await login(data.email, data.password, ipAddress);
    //     } catch (error) {
    //       console.error(error);

    //       // reset();

    //       setError("afterSubmit", {
    //         ...error,
    //         message:
    //           "This user id does not exist or the password is incorrect. Kindly try again.",
    //       });
    //     }
    //   } else {
    //     alert(
    //       "This user id does not exist or the password is incorrect. Kindly try again."
    //     );
    //     reset();
    //   }
    // } else {
    dispatch(
      setListingModel({
        ...initialListing,
        publication_date_from: fromDefaulDate(),
        publication_date_to: toDefaultDate(),
      })
    );
    try {
      const res = await login(data.email, data.password, ipAddress);
    } catch (error) {
      console.error(error);

      // reset();

      setError("afterSubmit", {
        ...error,
        message:
          "This user id does not exist or the password is incorrect. Kindly try again.",
      });
    }
    // }
  };

  const handleForgotPasswordModel = () => {
    setModelOpen(true);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value)
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    loginService.forgotpassword(email).then((res) => {
      console.log(res);
    });
  };
  const handleClose = () => {
    setModelOpen(false);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack alignItems="flex-end" sx={{ my: 2 }}>
          <p
            className="forgotpassword"
            style={{
              cursor: "pointer",
              margin: "0",
              textDecoration: "underline",
            }}
            onClick={handleForgotPasswordModel}
          >
            Forgot password?
          </p>
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Login
        </LoadingButton>
      </FormProvider>
      <Modal
        open={modelOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <form onSubmit={handleForgotPassword}>
            <h2 id="parent-modal-title">Forgot your password?</h2>
            <p id="parent-modal-description">
              Enter your email and we'll send you a link to reset your password.
            </p>
            {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
            <Input
              onChange={emailChange}
              fullWidth
              type="email"
              required
              id="my-input"
              aria-describedby="my-helper-text"
            />

            <Stack alignItems="flex-end" sx={{ my: 2 }}>
              <p
                className="forgotpassword"
                style={{
                  cursor: "pointer",
                  margin: "0",
                  textDecoration: "underline",
                }}
                onClick={handleClose}
              >
                Return to Login
              </p>
            </Stack>
            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitSuccessful || isSubmitting}
              sx={{
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: "text.primary",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              Login
            </Button>
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </form>
        </Box>
      </Modal>
    </>
  );
}
