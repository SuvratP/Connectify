import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
// import ProfileSide from '../../components/profileSide/ProfileSide'
// import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import ProfileSide from '../../components/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
const Home = () => {
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
        
    </div>
  )
}

export default Home