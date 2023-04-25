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
// eslint-disable-next-line import/no-unresolved
import MDTypography from "components/MDTypography";
// import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import axiosInstance from "services/axios";
// eslint-disable-next-line import/no-unresolved
import MDBadge from "components/MDBadge";
import Swal from "sweetalert2";
import PaginationComponent from "layouts/tables/data/pagination";
import SearchComponent from "layouts/tables/data/search";

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

export default function CustomizedTables() {
  // variable pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 4;
  // fin variable pagination
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  // fonction tableau

  useEffect(() => {
    if (isMounted.current) return;
    // eslint-disable-next-line no-use-before-define
    fetchHistorique();
    isMounted.current = true;
  }, []);
  const fetchHistorique = () => {
    setLoading(true);
    axiosInstance
      .get("/historique/")
      .then((res) => {
        setHistorique(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useMemo de tableau
  const historiqueData = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let computedHistorique = historique;

    if (search) {
      // eslint-disable-next-line no-shadow
      computedHistorique = computedHistorique.filter(
        // eslint-disable-next-line no-shadow
        (historique) =>
          historique.couleur.toLowerCase().includes(search.toLowerCase()) ||
          historique.marque.toLowerCase().includes(search.toLowerCase()) ||
          historique.created_at.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedHistorique.length);
    return computedHistorique.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [historique, currentPage, search]);
  // fin useMemo de tableau
  const deleteHistorique = (id) => {
    axiosInstance
      .delete(`/historique/${id}`)
      .then(() => {
        Swal.fire("Supprimé!", "", "success");
        fetchHistorique();
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
        deleteHistorique(id);
      }
    });
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
            bgColor="success"
            borderRadius="lg"
            coloredShadow="info"
          >
            <Box sx={{ width: "100%" }}>
              <Grid container>
                <Grid item xs={10} sm={11} md={11} lg={11}>
                  <MDTypography variant="h6" color="white" fontWeight="medium">
                    Historique de vos transfère
                  </MDTypography>
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
                  <StyledTableCell align="center">Destinateur</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Date d&apos;envoie</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </MDBox>
              <TableBody>
                {historiqueData.map((row, n) => (
                  <StyledTableRow key={row.historique_id}>
                    <StyledTableCell component="th" scope="row">
                      {n + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.couleur}</StyledTableCell>
                    <StyledTableCell align="center">{row.marque}</StyledTableCell>
                    <StyledTableCell align="center">{row.quantite}</StyledTableCell>
                    <StyledTableCell align="center">
                      <MDTypography
                        variant="button"
                        color="success"
                        fontWeight="medium"
                        sx={{ cursor: "pointer" }}
                        textGradient
                        onClick={() => navigate(`/destinateur/${row.destinateur}`)}
                      >
                        detail
                      </MDTypography>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                    <StyledTableCell align="center">{`${new Date(
                      row.created_at
                      // eslint-disable-next-line prettier/prettier
                      ).getFullYear()}/${new Date(row.created_at).getMonth() + 1}/${new Date(
                      row.created_at
                    ).getDate()}`}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Supprimer" placement="top">
                        <Icon
                          sx={{ cursor: "pointer", color: "red" }}
                          fontSize="small"
                          onClick={() => Supprimer(row.historique_id)}
                        >
                          delete
                        </Icon>
                      </Tooltip>
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
