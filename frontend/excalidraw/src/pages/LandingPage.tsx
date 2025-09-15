import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
const LandingPage = () => {
  return (
    <Box>
      <Header/>
      <HeroSection/>
      <FeaturesSection/>
      <CTASection/>
      <Footer/>
    </Box>
  )
}

export default LandingPage