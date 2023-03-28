import { Box, Card, CardContent, Grid, Typography, TextField, Stack, Button } from '@mui/material'
import { Formik, Form, Field } from 'formik';
import React from 'react';
import Img from '../assets/result.svg';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {login} from '../store/authSlice';
import { useDispatch } from 'react-redux';



const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formFields = [
    {type: 'email', label: 'Email', name: 'email'},
    {type: 'password', label: 'Password', name: 'password'},
  ]

  const initalValues = {
    email:'', 
    password: ''
  }

  
  const resisterSchema = yup.object().shape({
   
    email: yup.string().email('Email Invalid').required('Email is required'), 
    password: yup.string().min(8, 'Must be minimum 8 characters').required('Password is required')
  })


  const submitHandler = (values, actions)=> {
    actions.resetForm();
    actions.setSubmitting(false)
    dispatch(login(values, navigate))
  }
  return (
 
    <Box sx={{width:'100%', height:'100vh', bgcolor: '#052159'}}>
      <Typography variant='h2' component='h1' align='center' color="white"> Stock App</Typography>
      <Grid container  p={5} alignItems="center" justifyContent="center" >
        <Grid item display={{xs:'none', sm:'block'}} md={6} xl={8}>
          <img src={Img} alt="register" style={{maxHeight:'82vh'}}/>
        </Grid>
        <Grid item xl={4} xs={12} md={6}>
            <Card sx={{maxWidth:'100%', padding:'2rem'}}>
              <CardContent>
                <Typography variant='h3' align='center' mb={3}> Login </Typography>
                <Formik initialValues={initalValues} onSubmit={submitHandler} validationSchema={resisterSchema}>

                  {({errors, touched})=>(
                    <Form>
                     {formFields.map(field=>(
                      <Field 
                        type={field.type}
                        key={field.name}
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        label={field.label}
                        name={field.name}
                        margin="dense"
                        error={Boolean(errors[field.name] && Boolean(touched[field.name])  )}
                        helperText={ (Boolean(touched[field.name])&& errors[field.name]) || ''}
                      />
                     ))}

                     <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button variant='contained' size="large" type="submit">Login</Button>
                     </Stack>
                    </Form>
                  )}
                </Formik>

                <Typography variant='subtitle1' 
                  align='center'
                  component='div'
                  sx={{cursor:'pointer'}}
                  onClick={()=> navigate('/register')}
                > Don't have an account?</Typography>
              </CardContent>
            </Card>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Login