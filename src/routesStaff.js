// Material Dashboard 2 React layouts
import Staff from "layouts/staff";
import Profile from "layouts/profile";
// eslint-disable-next-line import/no-unresolved
import DetailEnvoyeurComponent from "layouts/staff/data/detailEnvoyeurComponent";
// @mui icons
import Icon from "@mui/material/Icon";

const routesStaff = [
  {
    type: "collapse",
    name: "Recus",
    key: "recus",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/staff",
    component: <Staff />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profileStaff",
    component: <Profile />,
  },
  {
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/:detailEvoyeur",
    component: <DetailEnvoyeurComponent />,
  },
];

export default routesStaff;
