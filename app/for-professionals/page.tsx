import React from 'react'
import HeroSection from './components/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import FeatureGridSection from '../components/sections/FeatureGridSection'
import PowerfulPlatformSection from './components/PowerfulPlatformSection'
import TrustSecuritySection from './components/TrustSecuritySection'
import HelpFullCardSection from './components/HelpFullCardSection'
import FAQSection from '../components/sections/FAQSection'
import { forProfessionalsFeatureGridSection } from '../utility/data'

const page = () => {
  return (
    <>
    <HeroSection />

    <StatsSection />

    <FeatureGridSection sectionData={forProfessionalsFeatureGridSection} />

    <PowerfulPlatformSection />

    <TrustSecuritySection />

    <HelpFullCardSection />

    <FAQSection />

    </>
  )
}

export default page