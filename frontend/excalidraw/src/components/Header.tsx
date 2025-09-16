import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { Brush as BrushIcon } from '@mui/icons-material';
import {  useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate()
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        height:'auto',
        top:'0px',
        maxHeight:'auto'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BrushIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                fontSize: '1.5rem'
              }}
            >
              DrawBoard
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              color="inherit"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Features
            </Button>
            <Button 
              color="inherit"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Pricing
            </Button>
            <Button 
              color="inherit"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              About
            </Button>
            <Button
              variant="outlined"
              sx={{ 
                ml: 1,
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
              onClick={()=>{
                navigate("/signIn")
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              sx={{ 
                ml: 1,
                borderColor: 'primary.main',
                color: 'primary.main'
              }}
              onClick={()=>{
                navigate("/signUp")
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;