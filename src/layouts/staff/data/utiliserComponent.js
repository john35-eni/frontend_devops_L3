/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// eslint-disable-next-line no-unused-vars
import axiosInstance from "services/axios";
import { useForm } from "react-hook-form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function UtiliserComponent({
  // eslint-disable-next-line react/prop-types
  id,
  couleur,
  marque,
  quantite,
  restant,
  description,
  fetchTransfer,
}) {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    // eslint-disable-next-line no-unused-vars
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();

  const onUtiliserSubmit = async (values) => {
    if (values.quantite > restant) {
      setOpenError(true);
      setMessage("Vous ne pouvez pas utiliser autant!");
    } else {
      // eslint-disable-next-line prefer-const
      let transfer = {};
      transfer.couleur = couleur;
      transfer.marque = marque;
      transfer.quantite = quantite;
      transfer.restant = parseFloat(restant) - parseFloat(values.quantite);
      transfer.description = description;
      try {
        await axiosInstance.put(`/transfer/${id}`, transfer);
        setOpenSuccess(true);
        handleClose();
        fetchTransfer();
      } catch (error) {
        setMessage(`${error.response.data.detail}`);
      }
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseError = () => {
    setOpenError(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSuccess}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <MDButton variant="gradient" color="info" size="small" onClick={handleClickOpen}>
        Utiliser
      </MDButton>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Quantité à utiliser
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onUtiliserSubmit)}>
          <DialogContent dividers>
            <Container maxWidth="sm">
              <MDBox>
                <MDBox>
                  <MDInput
                    type="number"
                    label="quantité à utiliser"
                    variant="outlined"
                    id="quantite"
                    name="quantite"
                    fullWidth
                    {...register("quantite", {
                      required: "restant obligatoire",
                      min: 0,
                    })}
                    error={Boolean(errors.quantite)}
                    helperText={errors.quantite?.message}
                  />
                </MDBox>
              </MDBox>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Utiliser</Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      <Snackbar
        open={openSuccess}
        autoHideDuration={60000}
        onClose={handleCloseSuccess}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleCloseSuccess} severity="success" sx={{ width: "100%" }}>
          Utilisation avec succès!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={60000}
        onClose={handleCloseError}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
