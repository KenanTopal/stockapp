import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {Login, Register, Dashboard, Categories, Firms, Sales, Brands} from './pages';
import Products from './pages/Products';
import {getData, getTransactions} from './store/stock/stockActions'

import PrivateRouter from './PrivateRouter';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getData('categories'))
    dispatch(getData('brands'))
    dispatch(getData('products'))
    dispatch(getTransactions())
  }, [])

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