import React from 'react';
import Hero from './sections/Hero';
import PoetsSpotlight from './sections/PoetsSpotlight';
import FeaturedPoems from './sections/FeaturedPoems';
import BooksShowcase from './sections/BooksShowcase';
import QuotesCarousel from './sections/QuotesCarousel';
import RoyalCTA from './sections/RoyalCTA';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <PoetsSpotlight />
      <FeaturedPoems />
      <BooksShowcase />
      <QuotesCarousel />
      <RoyalCTA />
    </div>
  );
};

export default Home;
