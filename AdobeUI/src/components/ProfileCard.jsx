import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const uurl = `https://adobe-assignment-mwhv.vercel.app/images`;

  const profilePage = false;
  return (
    <div className="flex flex-col rounded relative gap-2 bg-white rounded-md overflow-hidden">
      <div className="flex flex-col rounded items-center">
        <div className="">
          <img
            className="h-full"
            src={user.coverImage ? uurl + user.coverImage : uurl + "def.jpg"}
            alt=""
          />
        </div>
        <img
          className="relative bottom-16 w-28 h-28 shadow-md rounded-full"
          src={user.profileImage ? uurl + user.profileImage : uurl + "def.jpg"}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center bottom-16 relative">
        <span className="font-bold text-md">
          {user.firstname} {user.lastname}
        </span>
        <span className=" text-sm">
          {user.worksAt ? user.worksAt : "Write About URSElf"}
        </span>
      </div>
      <div className="px-6 relative bottom-12  ">
        <div className="flex justify-around items-center gap-8 border-t-2 border-b-2 border-black py-4">
          <div className="flex flex-col items-center justify-center">
            
            <span className="font-semibold text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            
            <span className="font-semibold text-sm">Followings</span>
          </div>
          {location === "profilePage" && (
            <div className="flex flex-col items-center justify-center">
              <span className="text-lg font-semibold">
                {posts.filter((post) => post.userId === user._id).length}
              </span>
              <span className="font-semibold text-sm">Posts</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center relative bottom-8 text-md text-orange-600 font-bold">
        {location !== "profilePage" && (
          <span>
            <Link to={`/profile/${user._id}`}>My Profile</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
