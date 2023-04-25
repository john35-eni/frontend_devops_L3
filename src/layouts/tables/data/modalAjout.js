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
import TextField from "@mui/material/TextField";
// import Icon from "@mui/material/Icon";
import SaveIcon from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";

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

export default function ModalAjout() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="info" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ajout d'objet
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container maxWidth="sm">
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="couleur"
                  variant="outlined"
                  id="couleur"
                  name="couleur"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="marque"
                  variant="outlined"
                  id="marque"
                  name="marque"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="quantité"
                  variant="outlined"
                  id="quantite"
                  name="quantite"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error
                  label="Error"
                  defaultValue=""
                  type="date"
                  id="dateArrive"
                  name="dateArrive"
                  helperText="Incorrect entry."
                  variant="outlined"
                  fullWidth
                />
              </MDBox>
            </MDBox>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button loading loadingPosition="start" onClick={handleClose} endIcon={<SaveIcon />}>
            Enregistrer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
