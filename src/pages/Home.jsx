import React from 'react'
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import Banner from '../components/banner/Banner';
import FindBookByCategory from '../components/Home/FindBookByCategory';

const Home = () => {
  return (
    <div >
      <Hero/>
      <RecentlyAdded/>
      <Banner/>
      <FindBookByCategory/>
    </div>
  )
};

export default Home;