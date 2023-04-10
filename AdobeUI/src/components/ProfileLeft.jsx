import React from 'react'
import InfoCard from './InfoCard'
import LogoSearch from './LogoSearch'

const ProfileLeft = () => {
  return (
    <div className='flex flex-col gap-4 relative'>
        <LogoSearch/>
        <InfoCard/>
    </div>
  )
}

export default ProfileLeft