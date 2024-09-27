import React from 'react'
import Layout from '../../layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import myContext from '../../context/myContext'
import { useContext } from 'react'
const HomePage = () => {
  const context=useContext(myContext)
  return (
      
      <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
    </Layout>
    
  )
}

export default HomePage
