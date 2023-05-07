import { styled, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import SideMenu from "./SideMenu";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#1976D2",
    boxSizing: "border-box",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.enteringScreen,
    }),
    ...(!open && {
      width: theme.spacing(7),
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.leavingSceen,
      }),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  return (
    <Drawer variant="permanent" open={sidebarOpen}>
      <Toolbar />
      <SideMenu />
    </Drawer>
  );
};

export default Sidebar;

