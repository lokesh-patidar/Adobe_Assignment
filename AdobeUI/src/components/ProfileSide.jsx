import React from 'react'
import Followers from './Followers'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard'

const ProfileSide = () => {
  return (
    <div  className='flex flex-col gap-4'>
    <LogoSearch/>
    <ProfileCard/>
    <Followers/>
    </div>
  )
}

export default ProfileSide