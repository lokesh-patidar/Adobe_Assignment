import React from "react";
import { UilSetting } from "@iconscout/react-unicons";
import {Link} from 'react-router-dom'
import Home from "../img/home.png";
import noti from "../img/noti.png";
import comment from "../img/comment.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white rounded-lg ">
      <Link to='../home'>
      <img className="w-4" src={Home} alt="" />
      </Link>
      <img className="w-4" src={comment} alt="" />
      <img className="w-4" src={noti} alt="" />
      <UilSetting className='w-5'/>
    </div>
  );
};

export default Navbar;
