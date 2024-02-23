import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import Iconify from "../../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { setListingModel } from "../../../redux/slice";

// ----------------------------------------------------------------------

export default function LoginAuthForm() {
  const { login } = useAuthContext();
  const dispatch = useDispatch();
  const initialListing = useSelector(
    (state) => state.listing_model.initialListing
  );
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "demo@minimals.cc",
    password: "demo1234",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    dispatch(
      setListingModel({
        ...initialListing,
        publication_date_from: fromDefaulDate(),
        publication_date_to: toDefaultDate(),
      })
    );
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormControl methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <TextField name="email" label="Email address" />

        <TextField
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

      {/* <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link variant="body2" color="inherit" underline="always">
          Forgot password?
        </Link>
      </Stack> */}

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
    </FormControl>
  );
}
