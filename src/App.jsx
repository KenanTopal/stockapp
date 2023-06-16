import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {Login, Register, Dashboard, Categories, Firms, Sales, Brands, Products} from './pages';
import {getData, getTransactions} from './store/stock/stockActions';

import PrivateRouter from './PrivateRouter';


const App = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getData('categories'))
    dispatch(getData('brands'))
    dispatch(getData('firms'))
    dispatch(getData('products'))
    dispatch(getData('sales'))
    dispatch(getTransactions())
// eslint-disable-next-line 
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