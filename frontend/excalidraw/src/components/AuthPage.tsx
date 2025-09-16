import { Button, Grid, Link, TextField } from '@mui/material'
import signinimage from '../assets/philipp-dusel-t_VkKLO9Fqo-unsplash.jpg'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from '../pages/SignIn';

interface AuthPageI{
  SignIn:boolean
}

const AuthPage:React.FC<AuthPageI> = ({SignIn}) => {

  const navigate = useNavigate();

  return (
    <Grid container style={{height:'100vh',width:'100vw'}}>
    <Grid item lg={6} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
      <div style={{backgroundColor:'#e0e0e0',width:'250px',height:SignIn?'240px':'320px',borderRadius:'20px'}}>
        <h4 style={{textAlign:'center'}}>Get Started Now</h4>
        <div style={{display:"flex",flexDirection:'column',justifyContent:'center',gap:12}}>
         {!SignIn&&<TextField label="Username" size='small' sx={{}} /> }
          <TextField label="Email" size="small" type='email' sx={{backgroundColor:'transparent'}}/>
          <TextField label="Password" size="small" type='password'autoComplete="current-password"/>
        </div>
        <div style={{backgroundColor:'',display:'flex',justifyContent:'center',marginTop:'15px'}}><Button variant='contained' disableRipple>{SignIn?"SignIn":"SignUp"}</Button></div>
      </div>
      <span>{!SignIn?"Already have an account?":"Don't have an account?"} <Link onClick={()=>{ navigate(SignIn?"/signup":"/signIn") }} underline='none' sx={{cursor:'pointer'}}>{SignIn?"SignUp":"SignIn"}</Link></span>
    </Grid>
    <Grid item lg={6} style={{overflow:'hidden',borderRadius:'30px'}}>
      <img src={signinimage} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="" />
    </Grid>
    </Grid>
  )
}

export default AuthPage