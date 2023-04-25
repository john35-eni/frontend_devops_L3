/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
// eslint-disable-next-line import/no-unresolved
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import LinearProgress from "@mui/material/LinearProgress";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// eslint-disable-next-line import/no-unresolved
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
// import MDTypography from "components/MDTypography";
// eslint-disable-next-line import/no-unresolved
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
// eslint-disable-next-line import/no-unresolved
import MDTypography from "components/MDTypography";
import CheckIcon from "@mui/icons-material/Check";
// import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line import/no-unresolved
import axiosInstance from "services/axios";
// eslint-disable-next-line import/no-unresolved
import MDBadge from "components/MDBadge";
import Swal from "sweetalert2";
/* eslint-disable react/no-unescaped-entities */
// import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Icon from "@mui/material/Icon";
import SaveIcon from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
// import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import { green } from "@mui/material/colors";
import PaginationComponent from "./pagination";
import ShareComponent from "./share";
import SearchComponent from "./search";
import EditComponent from "./edit";
// modal ajout
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// function modal and variable
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

// variable talbeau
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/* function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
} */

/* const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]; */

export default function CustomizedTables() {
  // variable pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 4;
  // fin variable pagination
  // variable modal
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [me, setMe] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseShare = () => {
    setOpenShare(false);
  };
  // fin variable modal
  const [destinateur, setDestinateur] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  // button save variable
  const [saveloading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      textcolor: "white",
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const saveButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setSaveLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setSaveLoading(false);
      }, 2000);
    }
  }; // fin button save
  // variable formulaire
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm();
  // const navigate = useNavigate();

  // fin variable formulaire
  // fonction tableau
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchDestinateur();
  }, []);

  useEffect(() => {
    if (isMounted.current) return;
    // eslint-disable-next-line no-use-before-define
    fetchTodo();
    isMounted.current = true;
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
  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get("/todo/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // fetch me

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchMe();
  }, []);
  const fetchMe = () => {
    axiosInstance
      .get("/users/me")
      .then((res) => {
        setMe(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useMemo de tableau
  const todosData = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let computedTodos = todos;

    if (search) {
      // eslint-disable-next-line no-shadow
      computedTodos = computedTodos.filter(
        // eslint-disable-next-line no-shadow
        (todos) =>
          todos.couleur.toLowerCase().includes(search.toLowerCase()) ||
          todos.marque.toLowerCase().includes(search.toLowerCase()) ||
          todos.created_at.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedTodos.length);
    return computedTodos.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [todos, currentPage, search]);
  // fin useMemo de tableau
  const onSaveSubmit = async (values) => {
    // eslint-disable-next-line no-param-reassign
    values.restant = values.quantite;
    try {
      await axiosInstance.post("/todo/create", values);
      setSuccess(true);
      setSaveLoading(false);
      handleClose();
      Swal.fire("Succès!", "Ajout avec succès!", "success");
      fetchTodo();
    } catch (error) {
      alert(`${error.response.data.detail}`);
    }
  };
  const deleteTodo = (id) => {
    axiosInstance
      .delete(`/todo/${id}`)
      .then(() => {
        Swal.fire("Supprimé!", "", "success");
        fetchTodo();
      })
      .catch((error) => Swal.fire("Erreur", error.toString(), "error"));
  };
  function Supprimer(id) {
    Swal.fire({
      title: "Etes-vous sûre?",
      text: "Cette action est irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
      }
    });
  }
  // function share
  function Share(couleur, marque, description) {
    // alert(couleur + marque + description);
    setOpenShare(true);
  }
  return (
    // variable tableau pagination

    // fin variable tableau pagination
    <div>
      {loading ? (
        <MDBox display="flex" p={5}>
          <CircularProgress color="info" size={50} sx={{ marginLeft: "50%" }} />
        </MDBox>
      ) : (
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <Box sx={{ width: "100%" }}>
              <Grid container>
                <Grid item xs={10} sm={11} md={11} lg={11}>
                  <MDTypography variant="h6" color="white" fontWeight="medium">
                    liste des objets
                  </MDTypography>
                </Grid>
                <Grid item xs={2} sm={1} md={1} lg={1}>
                  <div>
                    <Fab color="info" aria-label="add" onClick={handleClickOpen}>
                      <AddIcon />
                    </Fab>
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <AddIcon /> Ajout d'objet
                      </BootstrapDialogTitle>
                      <form onSubmit={handleSubmit(onSaveSubmit)}>
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
                                  id="quantite"
                                  name="quantite"
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
                                  label="Description"
                                  defaultValue=""
                                  id="description"
                                  name="description"
                                  variant="outlined"
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
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ m: 1, position: "relative" }}>
                              <Fab
                                aria-label="save"
                                color="info"
                                sx={buttonSx}
                                onClick={saveButtonClick}
                              >
                                {success ? <CheckIcon /> : <SaveIcon />}
                              </Fab>
                            </Box>
                            <Box sx={{ m: 1, position: "relative" }}>
                              <Button sx={buttonSx} disabled={isSubmitting} type="submit">
                                Enregister
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
                  </div>
                </Grid>
              </Grid>
            </Box>
          </MDBox>
          <TableContainer sx={{ boxShadow: "none" }}>
            <SearchComponent
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <MDBox component="thead">
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Couleur</StyledTableCell>
                  <StyledTableCell align="center">Marque</StyledTableCell>
                  <StyledTableCell align="center">Quantité</StyledTableCell>
                  <StyledTableCell align="center">Restant</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Date d&apos;arrivée</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </MDBox>
              <TableBody>
                {todosData.map((row, n) => (
                  <StyledTableRow key={row.todo_id}>
                    <StyledTableCell component="th" scope="row">
                      {n + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.couleur}</StyledTableCell>
                    <StyledTableCell align="center">{row.marque}</StyledTableCell>
                    <StyledTableCell align="center">{row.quantite}</StyledTableCell>
                    <StyledTableCell align="center">
                      <MDBox ml={-1}>
                        <MDBadge
                          badgeContent={`${row.restant.toString()} Kg`}
                          color={row.restant < 5 ? "warning" : "success"}
                          variant="gradient"
                          size="sm"
                        />
                      </MDBox>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                    <StyledTableCell align="center">{`${new Date(
                      row.created_at
                      // eslint-disable-next-line prettier/prettier
                      ).getFullYear()}/${new Date(row.created_at).getMonth() + 1}/${new Date(
                      row.created_at
                    ).getDate()}`}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.quantite === row.restant ? (
                        <EditComponent
                          id={row.todo_id}
                          couleur={row.couleur}
                          marque={row.marque}
                          quantite={row.quantite}
                          restant={row.restant}
                          description={row.description}
                          fetchTodo={fetchTodo}
                        />
                      ) : null}

                      <Tooltip title="Supprimer" placement="top">
                        <Icon
                          sx={{ cursor: "pointer", color: "red" }}
                          fontSize="small"
                          onClick={() => Supprimer(row.todo_id)}
                        >
                          delete
                        </Icon>
                      </Tooltip>
                      {row.restant > 0 ? (
                        <ShareComponent
                          id={row.todo_id}
                          couleur={row.couleur}
                          marque={row.marque}
                          quantite={row.quantite}
                          restant={row.restant}
                          description={row.description}
                          envoyeur={`${me.user_id}`}
                          fetchTodo={fetchTodo}
                        />
                      ) : null}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Card>
      )}
    </div>
  );
}
