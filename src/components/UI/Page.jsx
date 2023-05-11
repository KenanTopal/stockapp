import React from 'react'
import {Box,Stack,Typography,Button,Container} from '@mui/material'
import { useDispatch } from 'react-redux'
import {uiActions} from '../../store/uiSlice'

const Page = ({title, btnCaption, children}) => {

  const dispatch = useDispatch()

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' p={5}>
        <Typography component='h1' variant='h5' color='inherit' noWrap>{title}</Typography>
        <Button variant='contained' onClick={()=>dispatch(uiActions.openModal())}>{btnCaption}</Button>
      </Stack>
      <Container>{children}</Container>
    </Box>
  )
}

export default Page