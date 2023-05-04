import React, {useState} from 'react';
import {styled, Toolbar, IconButton, Typography, Avatar, MenuItem, Menu} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import {uiActions} from '../../store/uiSlice'



const drawerWidth = 240;


const AppBar = styled(MuiAppBar)(({theme, open})=>({
  zIndex: theme.zIndex.drawer+1,
  transition: theme.transitions.create('width',{
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.enteringScreen
  }),
  ...(open&&{
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create('width',{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.leavingScreen
  }),
})
}))



const Header = () => {
  const currentUser = useSelector(state=>state.auth.currentUser);
  const [anchorElement, setAnchorElement] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen)

  return (
    <AppBar open={sidebarOpen}>
      <Toolbar sx={{pr:'24px'}}>
        <IconButton size='large' edge="start" color='inherit' sx={{mr:2}} onClick={()=>dispatch(uiActions.toggleMenu())}>
          <MenuIcon/>
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{flexGrow:1}} >
          Stock App
        </Typography>
        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{cursor:'pointer'}} onClick={(e)=> setAnchorElement(e.currentTarget)}>
          {currentUser&& <Avatar alt={currentUser.toUpperCase()} src='/broken-image.jpg' />}
        </Typography>
        {currentUser && (
          <Menu open={anchorElement} anchorOrigin={{vertical:'top', horizontal:'right'}} keepMounted transformOrigin={{vertical:'top', horizontal:'right'}}>
            <MenuItem onClick={()=>dispatch(logout(navigate))}>Logout</MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header