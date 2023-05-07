import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarsIcon from "@mui/icons-material/Stars";
import CategoryIcon from "@mui/icons-material/Category";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const menu = [
  { title: "Dashboard", icon: <DashboardIcon />, path: "/stock/dashboard" },
  { title: "Products", icon: <InventoryIcon />, path: "/stock/products" },
  { title: "Sales", icon: <ReceiptIcon />, path: "/stock/sales" },
  { title: "Firms", icon: <AccountBalanceIcon />, path: "/stock/firms" },
  { title: "Brands", icon: <StarsIcon />, path: "/stock/brands" },
  { title: "Categories", icon: <CategoryIcon />, path: "/stock/categories" },
];

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <List
      component="nav"
      sx={{
        backgroundColor: "#1976D2",
        color: "white",
        height: "100%",
        width: "100%",

      }}
    >
      {menu.map((menuItem, index) => (
        <ListItemButton
          key={index.toString()}
          onClick={() => navigate(menuItem.path)}
        >
          <ListItemIcon sx={{ color: "white" }} title={menuItem.title}>
            {menuItem.icon}
          </ListItemIcon>
          <ListItemText primary={menuItem.title} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideMenu;