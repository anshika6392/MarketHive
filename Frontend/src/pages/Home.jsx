import React from 'react'
import Slide from '../components/Slide'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { user, isAuthenticated, } = useAuth0();
  return (
    <div className=' h-screen w-full pt-24'>
      <div>
        <img src="https://images.pexels.com/photos/31321356/pexels-photo-31321356.jpeg" alt="" />
      </div>

      {isAuthenticated && <img src={user.picture}></img>}
      {isAuthenticated && <h1>Hello {user.name}</h1>}
      <div>
        <Slide />
      </div>
    </div>
  )
}

export default Home