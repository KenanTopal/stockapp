import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Page from '../components/UI/Page'
import DeleteOulineIcon from '@mui/icons-material/DeleteOutline'
import { setData } from '../store/stock/stockActions';
import { useNavigate } from 'react-router-dom';
import UiModal from '../components/UI/UiModal';
import { Field } from 'formik';
import { uiActions } from '../store/uiSlice';

const Categories = () => {

  const categories = useSelector(state=> state.stock.categories);
  const modalData  = useSelector(state=> state.ui.modalData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = (id)=>{
    dispatch(setData('delete', 'categories', id, navigate, '/stock/categories'))
  }

  const request = {
    endpoint:'categories', 
    to:'/stock/categories', 
    edit: false
  }

  return (
    <Page title="Categories" btnCaption="New Category">

      <TableContainer
        sx={{alignItems:'center'}}
        component = {Paper}
      >
        <Table>
          <TableHead>
            <TableRow> 
              <TableCell align="center"> #</TableCell>
              <TableCell align="center"> Name</TableCell>
              <TableCell align="center"> Number of Products</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row)=> (
              <TableRow key={row.id} sx={{"&:last-child td, &:last-child th":{border:0}
            }}>
                <TableCell align="center"> {row.id}</TableCell>
                <TableCell align="center"> {row.name}</TableCell>
                <TableCell align="center"> {row.product_count}</TableCell>
                <TableCell>
                  <DeleteOulineIcon sx={{color: 'red', cursor:'pointer'}} onClick={()=>handleDelete(row.id)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>


        {/* Modal */}

          <UiModal title="Category" request={request} initialValues={{name:''}}>

            <Field 
              as={TextField}
              label = "Category Name"
              name = "name"
              variant="outlined"
              type="text"
              required
              fullWidth
              sx={{mb:2}}
              onChange={(e)=>dispatch(uiActions.setModalData({...modalData, name: e.target.value}))}
              value={modalData.name}
            />
          </UiModal>

    </Page>
  )
}

export default Categories