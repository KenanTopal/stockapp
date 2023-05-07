import React from 'react'
import Page from '../components/UI/Page'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useNavigate } from 'react-router-dom'
import { setData } from '../store/stock/stockActions'

const Categories = () => {

  const categories = useSelector(state=>state.stock.categories)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleDelete = (id) => {
    dispatch(setData('delete', 'categories', id, navigate, '/stock/categories'))
  }

  return (
    <Page title='Categories' btnCaption='New Category'>
      <TableContainer sx={{alignItems:'center' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>#</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Number of Products</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row)=> (
              <TableRow key={row.id} >
                <TableCell align='center'>{row.id}</TableCell>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.product_count}</TableCell>
                <TableCell>
                  <DeleteOutlineIcon sx={{color:'red', cursor:'pointer'}} onClick={()=> handleDelete(row.id)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  )
}

export default Categories