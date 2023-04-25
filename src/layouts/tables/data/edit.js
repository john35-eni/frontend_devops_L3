/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";
import SaveIcon from "@mui/icons-material/Save";
// eslint-disable-next-line import/no-unresolved
// import MDInput from "components/MDInput";
// eslint-disable-next-line import/no-unresolved
import MDBox from "components/MDBox";
// import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
// eslint-disable-next-line import/no-unresolved
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

export default function EditComponent({
  id,
  couleur,
  marque,
  quantite,
  restant,
  description,
  // eslint-disable-next-line no-unused-vars
  fetchTodo,
}) {
  const [open, setOpen] = useState(false);

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
  const onEditSubmit = async (values) => {
    if (values.quantite < values.restant) {
      alert("restant ne peut pas etre superieur au quantité");
    } else {
      try {
        await axiosInstance.put(`/todo/${id}`, values);
        handleClose();
        alert("modification avec succes!!");
        fetchTodo();
      } catch (error) {
        alert(`${error.response.data.detail}`);
      }
    }
  };
  return (
    <>
      <Tooltip title="Modifier" placement="top">
        <Icon
          sx={{ cursor: "pointer", color: "purple" }}
          fontSize="small"
          onClick={() => handleClickOpen()}
        >
          edit
        </Icon>
      </Tooltip>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Icon sx={{ cursor: "pointer", color: "purple" }} fontSize="small">
            edit
          </Icon>
          Modification
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          <DialogContent dividers>
            <Container maxWidth="sm">
              <MDBox>
                <MDBox mb={2}>
                  <TextField
                    type="text"
                    label="couleur"
                    variant="outlined"
                    id="couleur"
                    name="couleur"
                    defaultValue={couleur}
                    fullWidth
                    {...register("couleur", {
                      required: "couleur obligatoire",
                      minLength: {
                        value: 2,
                        message: "couleur au moin 2 caractères",
                      },
                      maxLength: {
                        value: 20,
                        message: "Couleur au moins 20 caractères",
                      },
                    })}
                    error={Boolean(errors.couleur)}
                    helperText={errors.couleur?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    type="text"
                    label="marque"
                    variant="outlined"
                    id="marque"
                    name="marque"
                    defaultValue={marque}
                    fullWidth
                    {...register("marque", {
                      required: "marque obligatoire",
                      minLength: {
                        value: 2,
                        message: "marque au moin 2 caractères",
                      },
                      maxLength: {
                        value: 20,
                        message: "marque au moins 20 caractères",
                      },
                    })}
                    error={Boolean(errors.marque)}
                    helperText={errors.marque?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    type="number"
                    label="quantité"
                    variant="outlined"
                    id="quantite_edit"
                    name="quantite"
                    defaultValue={quantite}
                    fullWidth
                    {...register("quantite", {
                      required: "quantité obligatoire",
                      min: 0,
                    })}
                    error={Boolean(errors.quantite)}
                    helperText={errors.quantite?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    type="number"
                    label="restant"
                    variant="outlined"
                    id="restant"
                    name="restant"
                    defaultValue={restant}
                    fullWidth
                    {...register("restant", {
                      required: "restant obligatoire",
                      min: 0,
                    })}
                    error={Boolean(errors.restant)}
                    helperText={errors.restant?.message}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <TextField
                    label="Description"
                    id="description"
                    name="description"
                    variant="outlined"
                    defaultValue={description}
                    multiline
                    rows={4}
                    fullWidth
                    {...register("description", {
                      required: "description obligatoire",
                      minLength: {
                        value: 2,
                        message: "description au moin 2 caractères",
                      },
                      maxLength: {
                        value: 200,
                        message: "marque au moins 200 caractères",
                      },
                    })}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                </MDBox>
              </MDBox>
            </Container>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={isSubmitting}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Enregister
            </LoadingButton>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
}
