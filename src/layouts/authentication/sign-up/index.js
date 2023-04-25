/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import WorkIcon from "@mui/icons-material/Work";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useForm } from "react-hook-form";
import axiosInstance from "services/axios";

// eslint-disable-next-line prefer-arrow-callback
function Cover() {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState();
  // eslint-disable-next-line prefer-arrow-callback
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      await axiosInstance.post("/users/create", values);
      setOpenSuccess(true);
      navigate("/authentication/sign-in", { replace: true });
    } catch (error) {
      setMessage(`${error.response.data.detail}`);
      setOpen(true);
      console.log(error.response.data.detail);
    }
    console.log(values);
  };

  const currencies = [
    {
      value: 1,
      label: "Secteur principale",
    },
    {
      value: 2,
      label: "Secteur secondaire",
    },
    {
      value: 3,
      label: "Secteur tertiaire",
    },
  ];
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };
  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <CoverLayout image={bgImage}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Compte créer avec succès!
        </MuiAlert>
      </Snackbar>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Créer un compte
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Remplissez le formulaire pour créer votre compte
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="username"
                  label="Pseudo"
                  name="username"
                  type="text"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("username", {
                    required: "Pseudo obligatoire",
                    minLength: { value: 5, message: "Pseudo au moin 5 caractères" },
                    maxLength: {
                      value: 20,
                      message: "Pseudo au maximum 20 caractères",
                    },
                  })}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                />
              </MDBox>
              <MDBox>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email", {
                    required: "Adresse email obligatoire",
                    pattern: {
                      value: /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
                      message: "Veuillez indiquez une adresse email valide",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </MDBox>
              <br />
              <MDBox mb={1}>
                <TextField
                  id="role"
                  select
                  label="Role"
                  variant="standard"
                  defaultValue={2}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("role", {
                    required: "Veuillez selectionnez votre rôle",
                  })}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="first_name"
                  label="Nom"
                  name="first_name"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("first_name", {
                    required: "Nom obligatoire",
                    minLength: { value: 2, message: "Nom au moin 2 caractères" },
                    maxLength: {
                      value: 55,
                      message: "Nom d'utilisateur au maximum 55 caractères",
                    },
                  })}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name?.message}
                />
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="last_name"
                  label="Prénom(s)"
                  name="last_name"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("last_name", {
                    required: "Prénom(s) obligatoire",
                    minLength: { value: 2, message: "Prénom(s) au moin 2 caractères" },
                    maxLength: {
                      value: 55,
                      message: "Prénoms(s) au maximum 55 caractères",
                    },
                  })}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name?.message}
                />
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("mobile", {
                    required: "Numéro téléphone mobile obligatoire",
                    minLength: { value: 10, message: "Numéro mobile au moin 10 caractères" },
                    maxLength: {
                      value: 13,
                      message: "Numéro mobile au maximum 13 caractères",
                    },
                  })}
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile?.message}
                />
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="adresse"
                  label="Adresse"
                  name="adresse"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PlaceIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("adresse", {
                    required: "Adresse obligatoire",
                    minLength: { value: 5, message: "Adresse au moin 5 caractères" },
                    maxLength: {
                      value: 100,
                      message: "Adresse au maximum 100 caractères",
                    },
                  })}
                  error={Boolean(errors.adresse)}
                  helperText={errors.adresse?.message}
                />
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  id="cin"
                  label="Numéro CIN"
                  name="cin"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("cin", {
                    required: "Numéro CIN obligatoire",
                    pattern: {
                      value: /[0-9]{12}/,
                      message: "Numéro CIN doivent être uniquement des 12 chiffres",
                    },
                    maxLength: {
                      value: 12,
                      message: "Numéro CIN au maximum 12 chiffre",
                    },
                  })}
                  error={Boolean(errors.cin)}
                  helperText={errors.cin?.message}
                />
              </MDBox>
              <MDBox mb={1}>
                <TextField
                  margin="normal"
                  variant="standard"
                  fullWidth
                  type="password"
                  id="password"
                  label="Mot de passe"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Mot de passe obligatoire",
                    pattern: { value: /[a-z][A-Z][0-9]/, message: "Mot de passe trop faible" },
                    minLength: { value: 8, message: "Mot de passe trop faible" },
                    maxLength: {
                      value: 24,
                      message: "Mot de passe au maximum 24 caractères",
                    },
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </MDBox>
              <MDBox mt={3} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Créer
                </MDButton>
              </MDBox>
            </form>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Déjà un compte?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Se connecter
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
