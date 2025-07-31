import React, { useState } from 'react';
import CameraRentalHero from './CameraRentalHero';
import FeaturedEquipment from './FeaturedEquipment';
import EquipmentCollections from './EquipmentCollections';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import StatsBar from './StatsBar';
import BlogSection from './BlogSection';
import Footer from './Footer';

const Home = () => {
  const [rentalDays, setRentalDays] = useState(0);
  return (
    <>
      <CameraRentalHero setRentalDays={setRentalDays} />
      <FeaturedEquipment rentalDays={rentalDays} />
      <EquipmentCollections />
      <HowItWorks />
      <Testimonials />
      <StatsBar />
      <BlogSection />
      <Footer />
    </>
  );
};

export default Home; 