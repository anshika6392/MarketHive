import React from 'react'
import Slide from '../components/Slide'

const Home = () => {
  return (
    <div className=' h-screen w-full pt-24'>
        <div>
        <img src="https://images.pexels.com/photos/31321356/pexels-photo-31321356.jpeg" alt="" />
        </div>
        
        <div>
            <Slide />
        </div>
    </div>
  )
}

export default Home