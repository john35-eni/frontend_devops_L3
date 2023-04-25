/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
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

// @mui material components
import Grid from "@mui/material/Grid";
// test grid
// import Paper from "@mui/material/Paper";
// import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from "@mui/icons-material/Save";
// import TextField from "@mui/material/TextField";
//  import CustomizedDialogs from "layouts/tables/data/modal";
// import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
// import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import NewTableStaff from "layouts/staff/data/newTableStaff";

function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={1}>
                <NewTableStaff />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
