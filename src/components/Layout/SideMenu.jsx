 import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { List, ListItemButton, ListItemIcon, MenuItem } from '@mui/material';
import { useNavigate} from 'react-router-dom'


const menu = [
  {title: 'Dashboard', icon: <DashboardIcon/>, path:'/stock/dashboard'},
  {title: 'Products', icon: <InventoryIcon/>, path:'/stock/products' }
]

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <List component='nav' sx={{
      backgroundColor:"#1976D2",
      color: 'white',
      height:'100%'
    }}>
      {menu.map((menuItem, index)=>(
      <ListItemButton key={index.toString()} onClick={()=>navigate(menuItem.path)}>
        <ListItemIcon sx={{color:'white' }} title={menuItem.title}>
          {menuItem.icon}
        </ListItemIcon>
        <ListItemButton primary={menuItem.title}/>
      </ListItemButton>))}

    </List>
  )
}

export default SideMenu 

//5151