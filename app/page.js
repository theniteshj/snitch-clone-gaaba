import React from 'react'
import PincodeBar from './components/PincodeBar'
import CategoryNav from './components/CategoryNav'
import BannerSlider from './components/BannerSlider'

export default function HomePage() {
  return (
    <>
      <PincodeBar />
      <CategoryNav />
      <BannerSlider />
      <div className='flex items-center justify-center min-h-screen font-extrabold text-6xl'>Home</div>
    </>
  )
}
