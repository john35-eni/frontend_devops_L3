/* eslint-disable import/no-unresolved */
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import DetailDestinateur from "layouts/tables/components/detailDestinateur";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Statistiques",
    key: "statistiques",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/statistiques",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Historique",
    key: "billing",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/historique",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/destinateur/:detailDestinateur",
    component: <DetailDestinateur />,
  },
];

export default routes;
