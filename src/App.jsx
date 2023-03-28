import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {Login, Register, Dashboard, Categories, Firms, Sales, Brands} from './pages';
import Products from './pages/Products';

import PrivateRouter from './PrivateRouter';

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/stock" element={<PrivateRouter/>}>
        <Route path='/stock' element={<Layout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='firms' element={<Firms/>}/>
          <Route path='sales' element={<Sales/>}/>
          <Route path='categories' element={<Categories/>}/>
          <Route path='brands' element={<Brands/>}/>
          <Route path='products' element={<Products/>}/>
         </Route>
      </Route>
    </Routes>
  )
}

export default App