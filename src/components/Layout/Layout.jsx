import React from 'react';
import Sidebar from './Sidebar';
import SideMenu from './SideMenu';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
 
    <>
    <Header/>
    <Sidebar/>
    <SideMenu/>
    <Outlet/>
    </>
  )
}

export default Layout