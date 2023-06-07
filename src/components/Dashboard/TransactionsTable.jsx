import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const TrasactionsTable = () => {

  const sales = useSelector(state=> state.stock.sales);

  return (
   
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Date </TableCell>
          <TableCell>Brand</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {sales.map(row=>(
          <TableRow key={row.id}>
            <TableCell> {row.createds} {row.time_hour}</TableCell>
            <TableCell> {row.brand}</TableCell>
            <TableCell> {row.product}</TableCell>
            <TableCell> {row.quantity}</TableCell>
            <TableCell align="right"> ${row.price_total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TrasactionsTable