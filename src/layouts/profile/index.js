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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useRef } from "react";
import axiosInstance from "services/axios";

function Overview() {
  // eslint-disable-next-line no-unused-vars
  const [me, setMe] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchDestinateur();
  }, []);
  const fetchDestinateur = () => {
    axiosInstance
      .get("/users/me")
      .then((res) => {
        setMe(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Information sur l'utilisateur"
                description={`Je suis ${me.first_name} ${me.last_name} et je travaille dans l'entreprise`}
                info={{
                  Nom: `${me.first_name}`.toUpperCase(),
                  Prénom: `${me.last_name}`,
                  Adresse: `${me.adresse}`,
                  mobile: `${me.mobile}`,
                  email: `${me.email}`,
                  cin: `${me.cin}`,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
