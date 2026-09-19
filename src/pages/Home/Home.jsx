import React from 'react';
import Hero from './sections/Hero';
import PoetsSpotlight from './sections/PoetsSpotlight';
import RoyalCTA from './sections/RoyalCTA';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <PoetsSpotlight />
      <RoyalCTA />
    </div>
  );
};

export default Home;
