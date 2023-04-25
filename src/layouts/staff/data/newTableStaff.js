/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
// eslint-disable-next-line import/no-unresolved
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import BlockIcon from "@mui/icons-material/Block";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// eslint-disable-next-line import/no-unresolved
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import Tooltip from "@mui/material/Tooltip";
// eslint-disable-next-line import/no-unresolved
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import MDTypography from "components/MDTypography";
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
// eslint-disable-next-line import/no-unresolved
import PaginationComponent from "layouts/tables/data/pagination";
// eslint-disable-next-line import/no-unresolved
import SearchComponent from "layouts/tables/data/search";
import UtiliserComponent from "./utiliserComponent";

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

export default function NewTableStaff() {
  // variable pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 3;
  // fin variable pagination
  // variable modal
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  // fin variable modal
  const [transfer, setTransfer] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const navigate = useNavigate();

  // fin button save
  // variable formulaire
  // const navigate = useNavigate();

  // fin variable formulaire
  // fonction tableau

  useEffect(() => {
    if (isMounted.current) return;
    // eslint-disable-next-line no-use-before-define
    fetchTransfer();
    isMounted.current = true;
  }, []);

  const fetchTransfer = () => {
    setLoading(true);
    axiosInstance
      .get("/transfer/")
      .then((res) => {
        setTransfer(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useMemo de tableau
  const transferData = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let computedTransfer = transfer;

    if (search) {
      // eslint-disable-next-line no-shadow
      computedTransfer = computedTransfer.filter(
        // eslint-disable-next-line no-shadow
        (transfer) =>
          transfer.couleur.toLowerCase().includes(search.toLowerCase()) ||
          transfer.marque.toLowerCase().includes(search.toLowerCase()) ||
          transfer.created_at.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedTransfer.length);
    return computedTransfer.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [transfer, currentPage, search]);
  // fin useMemo de tableau
  const deleteTodo = (id) => {
    axiosInstance
      .delete(`/todo/${id}`)
      .then(() => {
        Swal.fire("Supprimé!", "", "success");
        fetchTransfer();
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
                  <StyledTableCell align="center">Envoyeur</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </MDBox>
              <TableBody>
                {transferData.map((row, n) => (
                  <StyledTableRow key={row.transfer_id}>
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
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        sx={{ cursor: "pointer" }}
                        textGradient
                        onClick={() => navigate(`/${row.envoyeur}`)}
                      >
                        detail
                      </MDTypography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.restant === 0 ? (
                        <BlockIcon sx={{ color: "red" }} fontSize="large" />
                      ) : (
                        <UtiliserComponent
                          id={row.transfer_id}
                          couleur={row.couleur}
                          marque={row.marque}
                          quantite={row.quantite}
                          restant={row.restant}
                          description={row.description}
                          fetchTransfer={fetchTransfer}
                        />
                      )}
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
