import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { PlayArrow as PlayIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import heroImage from '../assets/hero-illustration.jpg';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Collaborative Whiteboarding Made Simple
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Create, collaborate, and bring your ideas to life with our intuitive digital whiteboard. 
              No sign-up required, privacy-first, and designed for seamless teamwork.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateX(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Drawing
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                View on GitHub
              </Button>
            </Box>
            
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                ✨ No registration required
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                🔒 Privacy-first approach
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                🚀 Real-time collaboration
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '50%' } }}>
            <Paper
              elevation={20}
              sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                transform: 'rotateY(-5deg) rotateX(5deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'rotateY(-2deg) rotateX(2deg) scale(1.02)',
                },
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="DrawBoard collaborative whiteboarding interface"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;