import React from 'react'
import ProfileSide from '../components/ProfileSide'
import PostSide from '../components/PostSide'
import RightSide from '../components/RightSide'

const Home = () => {
  return (
    <div className='flex  relative gap-3 h-screen'>
        <div className="profile xl:w-1/5  overflow-scroll"><ProfileSide/></div>
        <div className="post xl:w-3/5 overflow-scroll"><PostSide/></div>
        <div className="rightSide xl:w-1/5"><RightSide/></div>
    </div>
  )
}

export default Home