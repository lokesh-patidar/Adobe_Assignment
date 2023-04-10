import React from "react";
import ProfileLeft from "../components/ProfileLeft";
import Profilecard from '../components/ProfileCard'
import PostSide from "../components/PostSide";
import RightSide from "../components/RightSide";

const Profile = () => {
  return (
    <div className="flex  relative gap-3 h-screen">
      <div className="w-1/5">
        <ProfileLeft />
      </div>
      <div className="w-3/5 overflow-scroll space-y-4">
        <Profilecard  location = "profilePage"/>
        <PostSide/>
      </div>
      <div className="w-1/5">
        <RightSide/>
      </div>
    </div>
  );
};

export default Profile;
