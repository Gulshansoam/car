// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// layouts
import LoginPageLayout from "../../pages/login/components/LoginPageLayout";
//
import LoginAuthForm from "./components/LoginAuthForm";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginPageLayout>
      <Helmet>
        <title>login</title>
      </Helmet>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" sx={{ margin: "auto" }}>
          Sign in
        </Typography>
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :
        <strong> demo1234</strong>
      </Alert> */}

      <LoginAuthForm />
    </LoginPageLayout>
  );
}
