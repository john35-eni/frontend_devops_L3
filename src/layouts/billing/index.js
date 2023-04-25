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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
import DataTable from "layouts/billing/components/BillingInformation/dataTable";
// import Transactions from "layouts/billing/components/Transactions";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <MDBox mb={8}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
              <Card>
                <DataTable />
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
