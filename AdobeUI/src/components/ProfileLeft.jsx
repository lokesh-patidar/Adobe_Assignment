import React from 'react'
import Followers from './Followers'
import InfoCard from './InfoCard'
import LogoSearch from './LogoSearch'

const ProfileLeft = () => {
  return (
    <div className='flex flex-col gap-4 relative'>
        <LogoSearch/>
        <InfoCard/>
        <Followers/>
    </div>
  )
}

export default ProfileLeft