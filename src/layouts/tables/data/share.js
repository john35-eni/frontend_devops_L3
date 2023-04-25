/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Container from "@mui/material/Container";
// eslint-disable-next-line import/no-unresolved
import MDBox from "components/MDBox";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// eslint-disable-next-line import/no-unresolved
import axiosInstance from "services/axios";
import { green } from "@mui/material/colors";
import { useState, useEffect } from "react";
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

function ShareComponent({
  id,
  couleur,
  marque,
  quantite,
  restant,
  description,
  envoyeur,
  fetchTodo,
}) {
  const {
    register,
    // eslint-disable-next-line no-unused-vars
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();
  // const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [destinateur, setDestinateur] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchDestinateur();
  }, []);
  const fetchDestinateur = () => {
    axiosInstance
      .get("/users/")
      .then((res) => {
        setDestinateur(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onShareSubmit = async (values) => {
    // variables historique
    // eslint-disable-next-line prefer-const
    let historique = {};
    historique.todo_id = id;
    historique.couleur = couleur;
    historique.marque = marque;
    historique.quantite = values.quantite;
    historique.description = description;
    historique.destinateur = values.destinateur;
    // eslint-disable-next-line no-param-reassign
    values.couleur = couleur;
    // eslint-disable-next-line no-param-reassign
    values.todo_id = id;
    // eslint-disable-next-line no-param-reassign
    values.marque = marque;
    // eslint-disable-next-line no-param-reassign
    values.description = description;
    // eslint-disable-next-line no-param-reassign
    values.restant = values.quantite;
    // eslint-disable-next-line no-param-reassign
    values.envoyeur = envoyeur;
    // eslint-disable-next-line prefer-const
    let editvalues = {};
    editvalues.couleur = couleur;
    editvalues.marque = marque;
    editvalues.quantite = quantite;
    editvalues.restant = parseFloat(restant) - parseFloat(values.quantite);
    editvalues.description = description;
    try {
      await axiosInstance.post("/transfer/create", values);
      await axiosInstance.put(`/todo/${id}`, editvalues);
      await axiosInstance.post("/historique/create", historique);
      handleClose();
      alert("transfer avec succes!!");
      fetchTodo();
    } catch (error) {
      alert(`${error.response.data.detail}`);
    }
  };

  return (
    <>
      <Tooltip title="Transferer" placement="top">
        <Icon
          color="info"
          sx={{ cursor: "pointer" }}
          fontSize="small"
          onClick={() => handleClickOpen()}
        >
          share
        </Icon>
      </Tooltip>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <ShareIcon /> Transfère
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onShareSubmit)}>
          <DialogContent dividers>
            <Container>
              <MDBox>
                <MDBox mb={2}>
                  <TextField
                    type="number"
                    label="quantité à transferer"
                    variant="standard"
                    id="quantite"
                    name="quantite"
                    fullWidth
                    {...register("quantite", {
                      required: "quantité obligatoire",
                      min: 1,
                      max: `${quantite}`,
                    })}
                    error={Boolean(errors.quantite_transfer)}
                    helperText={errors.quantite_transfer?.message}
                  />
                </MDBox>
                <MDBox>
                  <TextField
                    id="destinateur"
                    name="destinateur"
                    select
                    label="Destinateur"
                    defaultValue=""
                    size="normal"
                    variant="standard"
                    fullWidth
                    {...register("destinateur", {
                      required: "destinateur obligatoire",
                    })}
                    error={Boolean(errors.destinateur)}
                    helperText={errors.destinateur?.message}
                  >
                    {destinateur.map((option) => (
                      <MenuItem key={option.user_id} value={option.user_id}>
                        {option.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </MDBox>
              </MDBox>
            </Container>
          </DialogContent>
          <DialogActions>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ m: 1, position: "relative" }}>
                <Button disabled={isSubmitting} type="submit">
                  Partager
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </Box>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
}
export default ShareComponent;
