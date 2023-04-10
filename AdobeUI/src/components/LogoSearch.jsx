import React from 'react'
import Logo from '../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'

const LogoSearch = () => {
  return (
    <div className='flex gap-[0.75rem]'>
        <img src={Logo} alt="" />
        <div className="flex bg-orange-100 mr-2  rounded p-[0.5rem]">
            <input className='bg-transparent w-[80%] outline-none border-none' type="text" placeholder='#Explore'/>
            <div className="">
                <UilSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch