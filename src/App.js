/* eslint-disable no-unused-vars */
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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import Logo from "assets/images/devops2.png";
import SignIn from "layouts/authentication/sign-in";
import User from "layouts/simpleUser/index";
import Staff from "layouts/staff/index";
import DetailEnvoyeurComponent from "layouts/staff/data/detailEnvoyeurComponent";
import { PublicRoute } from "layouts/authentication/components/PublicRoute";
import { Authenticated } from "layouts/authentication/Authenticated";
import SignUp from "layouts/authentication/sign-up";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import routesStaff from "routesStaff";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
// eslint-disable-next-line no-unused-vars
import { AuthProvider, AuthConsumer } from "context/JWTAuthContext";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  const Bardenavigation = (
    <>
      <Sidenav
        color={sidenavColor}
        brand={Logo}
        brandName="SECTEUR PRINCIPAL"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Configurator />
      {configsButton}
    </>
  );
  const BardenavigationStaff = (
    <>
      <Sidenav
        color={sidenavColor}
        brand={Logo}
        brandName="SECTEUR SECONDAIRE"
        routes={routesStaff}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Configurator />
      {configsButton}
    </>
  );

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <Authenticated>
                {Bardenavigation} {route.component}
              </Authenticated>
            }
            key={route.key}
          />
        );
      }

      return null;
    });
  const getRoutesStaff = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <Authenticated>
                {BardenavigationStaff} {route.component}
              </Authenticated>
            }
            key={route.key}
          />
        );
      }

      return null;
    });
  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          {getRoutesStaff(routesStaff)}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/tables" />} />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/test"
            element={
              <Authenticated>
                <p>detail envoyeur</p>
              </Authenticated>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/user"
            element={
              <Authenticated>
                <User />
              </Authenticated>
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
