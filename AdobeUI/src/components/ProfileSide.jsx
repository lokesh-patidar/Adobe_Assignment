import React from 'react'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard'

const ProfileSide = () => {
  return (
    <div  className='flex flex-col gap-4'>
    <LogoSearch/>
    <ProfileCard/>
    </div>
  )
}

export default ProfileSide