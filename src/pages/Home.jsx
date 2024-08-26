import React from 'react'
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import Banner from '../components/banner/Banner';
import FindBookByCategory from '../components/Home/FindBookByCategory';
import LowBookCart from '../components/banner/LowBookCart';
import GrowthBookCart from '../components/Home/GrowthBookCart';

const Home = () => {
  return (
    <div >
      <Hero/>
      <RecentlyAdded/>
      <Banner/>
      <FindBookByCategory/>
      <LowBookCart/>
      <GrowthBookCart/>
    </div>
  )
};

export default Home;