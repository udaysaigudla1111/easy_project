import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  Brush as BrushIcon,
  CloudOff as CloudOffIcon,
  Speed as SpeedIcon,
  FileDownload as FileDownloadIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <PeopleIcon />,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with your team. See cursors, changes, and updates in real-time as everyone contributes to the whiteboard.',
  },
  {
    icon: <BrushIcon />,
    title: 'Hand-drawn Feel',
    description: 'Enjoy the natural, sketchy aesthetic that makes your diagrams feel more human and approachable, just like drawing on paper.',
  },
  {
    icon: <CloudOffIcon />,
    title: 'Works Offline',
    description: 'No internet? No problem. Create and edit your drawings offline, and sync when you\'re back online.',
  },
  {
    icon: <SpeedIcon />,
    title: 'Lightning Fast',
    description: 'Optimized for performance with smooth drawing experience, even with complex diagrams and multiple collaborators.',
  },
  {
    icon: <FileDownloadIcon />,
    title: 'Export Anywhere',
    description: 'Export your creations as PNG, SVG, or JSON. Share your work across platforms and integrate with your favorite tools.',
  },
  {
    icon: <SecurityIcon />,
    title: 'Privacy First',
    description: 'Your data stays yours. End-to-end encryption ensures your ideas remain private and secure.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Everything you need to collaborate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.2rem',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Powerful features designed to make visual collaboration effortless, 
            whether you're brainstorming, planning, or presenting ideas.
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 8
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                p: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 3,
                    background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                  }}
                >
                  {React.cloneElement(feature.icon, { sx: { fontSize: 32, color: 'white' } })}
                </Avatar>
                
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;