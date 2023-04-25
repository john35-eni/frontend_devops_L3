import * as React from "react";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MDTypography from "components/MDTypography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import Logo from "assets/images/laptop.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "hooks/useAuth";

function Copyright() {
  return (
    <MDTypography variant="body2" align="center">
      <Link to="/sign-up" color="success">
        Créer un compte
      </Link>
    </MDTypography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      alert(error);
    }
  };

  // const [open, setOpen] = React.useState(false);
  /* const handleClose = () => {
    setOpen(false);
  }; */

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <MDTypography component="h1" variant="h5">
              Authentifiez-vous
            </MDTypography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email", { required: "Adresse email obligatoire" })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password", { required: "Mot de passe obligatoire" })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                <LoadingButton
                  loading={isSubmitting}
                  loadingIndicator={isSubmitting ? "Chargement..." : null}
                  disableElevation
                  loadingPosition={isSubmitting ? "start" : null}
                  startIcon={<LoginIcon />}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                  fullWidth
                >
                  {!isSubmitting ? "Se connecter" : null}
                </LoadingButton>
                <Backdrop
                  // eslint-disable-next-line no-shadow
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={isSubmitting}
                  // eslint-disable-next-line no-undef
                  // onClick={handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </form>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
