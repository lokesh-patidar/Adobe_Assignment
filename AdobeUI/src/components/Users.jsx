import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../actions/userAction";
import { Link } from "react-router-dom";

const Users = ({ e, id }) => {
  const uurl = `http://localhost:5000/images/`;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [flwing, setflwing] = useState(e.followers.includes(user._id));
  const dispatch = useDispatch();
  const handleFollow = () => {
    flwing
      ? dispatch(unfollowUser(e._id, user))
      : dispatch(followUser(e._id, user));
    setflwing((prev) => !prev);
  };

  return (
    <div key={id} className="flex justify-between">
      <div className="w-12 h-10 overflow-hidden  rounded-full">
        <img
          className=""
          src={e.profileImage ? uurl + e.profileImage : uurl + "def.jpg"}
          alt=""
        />
      </div>
      <div className=" w-[50%] flex flex-col items-start">
        <Link to={`/view/${e._id}`}>
          <p className="font-semibold text-sm">@{e.username}</p>
          <p className=" text-xs">{e.firstname}</p>
        </Link>
      </div>
      <div className="flex items-center">
        <button
          className="font-bold text-xs bg-orange-400 px-3 py-1 rounded text-white"
          onClick={handleFollow}
        >
          {flwing ? "Unfollow" : "follow"}
        </button>
      </div>
    </div>
  );
};

export default Users;
