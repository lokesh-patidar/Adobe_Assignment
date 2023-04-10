import React from 'react'
import Navbar from './Navbar'
import TrendCard from './TrendCard'

const RightSide = () => {
  return (
    <div className='flex flex-col gap-4'>
    <Navbar/>
    <TrendCard/>
    </div>
  )
}

export default RightSide