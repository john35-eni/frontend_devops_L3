/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
// eslint-disable-next-line import/no-unresolved
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// eslint-disable-next-line import/no-unresolved
import MDBadge from "components/MDBadge";
import Icon from "@mui/material/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
// import MDButton from "components/MDButton";
// import Button from "@mui/material/Button";
// eslint-disable-next-line import/no-unresolved
import axiosInstance from "services/axios";
import { useEffect, useRef, useState } from "react";
import MaterialTable from "material-table";
import Supprimer from "./sweet";
import BootstrapDialogTitle from "./modal";
// import BasicModal from "./exampleModal";
// eslint-disable-next-line import/no-unresolved

// Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function Tableau() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) return;
    // eslint-disable-next-line no-use-before-define
    fetchTodo();
    isMounted.current = true;
  }, []);

  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get("/todo/")
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  ); */
  /* const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton variant="text" color="error">
        <Icon>{title}</Icon>
        <Icon>{description}</Icon>
      </MDButton>
    </MDBox>
  ); */
  const [tableData, setTableData] = useState([
    {
      todo_id: 1,
      couleur: "jaune",
      marque: "soul",
      quantite: "bien",
      restant: 4,
      description: "desc",
    },
  ]);
  const columns = [
    { title: "ID", field: "todo_id", align: "center" },
    { title: "couleur", field: "couleur", align: "center" },
    { title: "marque", field: "marque", align: "center" },
    { title: "quantité", field: "quantite", align: "center" },
    { title: "restant", field: "restant", align: "center" },
    { title: "description", field: "description", align: "center" },
  ];
  return (
    <div>
      {loading ? (
        <p>loading....</p>
      ) : (
        <MaterialTable
          columns={columns}
          data={todos}
          title={null}
          options={{
            sorting: false,
            searchFieldVariant: "outlined",
            paging: true,
            pageSizeOptions: [3, 5, 10, 20],
            pageSize: 3,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            exportButton: true,
            actionsColumnIndex: -1,
            rowStyle: (data, index) => (index % 2 === 0 ? { background: "#f5f5f5" } : null),
          }}
          actions={[
            {
              // eslint-disable-next-line react/no-unstable-nested-components, react/button-has-type
              icon: () => <button>edit</button>,
              tooltip: "click me",
              onClick: (e, data) => console.log(data),
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components, react/button-has-type
              icon: () => <DeleteIcon color="danger" />,
              tooltip: "click me",
              onClick: (e, data) => console.log(data),
            },
            {
              // eslint-disable-next-line react/no-unstable-nested-components, react/button-has-type
              icon: () => <button>share</button>,
              tooltip: "click me",
              onClick: (e, data) => console.log(data),
            },
          ]}
        />
      )}
    </div>
  );
}
