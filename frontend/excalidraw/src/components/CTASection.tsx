import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { PlayArrow as PlayIcon, GitHub as GitHubIcon } from '@mui/icons-material';

const CTASection: React.FC = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            p: 8,
            textAlign: 'center',
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm0 0l40-40v40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
              }}
            >
              Ready to bring your ideas to life?
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: 5,
                fontSize: '1.2rem',
                opacity: 0.9,
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              Join thousands of teams already using DrawBoard to collaborate visually. 
              Start creating in seconds, no setup required.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Drawing Now
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<GitHubIcon />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Contribute on GitHub
              </Button>
            </Box>
            
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                opacity: 0.8,
                fontSize: '0.9rem',
              }}
            >
              Free forever • No credit card required • Open source
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTASection;