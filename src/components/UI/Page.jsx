import React from 'react'
import {Box,Stack,Typography,Button,Container} from '@mui/material'

const Page = ({title, btnCaption, children}) => {
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' p={5}>
        <Typography component='h1' variant='h5' color='inherit' noWrap>{title}</Typography>
        <Button variant='contained'>{btnCaption}</Button>
      </Stack>
      <Container>{children}</Container>
    </Box>
  )
}

export default Page