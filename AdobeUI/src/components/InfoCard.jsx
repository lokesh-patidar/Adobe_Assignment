import React from "react";
import { useState, useEffect } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { Modal, Button, Group } from "@mantine/core";
import { useParams } from "react-router-dom";
import * as UserApi from "../apis/userReq.js";
import { logout } from "../actions/authActions";

const InfoCard = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="flex flex-col gap-2 text-center">
      <div className="text-center flex justify-between px-4 items-center">
        <h2 className="font-bold text-lg">Profile Info</h2>
        {user._id === profileUserId ? (
          <Group position="left">
            <UilPen className="w-4" onClick={() => setOpened(true)} />
            <ProfileModal opened={opened} setOpened={setOpened} data={user}/>
          </Group>
        ) : (
          ""
        )}
      </div>
      <div className="">
        <span className="font-semibold text-sm">Status : </span>
        <span className="font-bold text-sm">{profileUser.relationShip}</span>
      </div>
      <div className="">
        <span className="font-semibold text-sm">Lives In : </span>
        <span className="font-bold text-sm">{profileUser.livesIn}</span>
      </div>
      <div className="">
        <span className="font-semibold text-sm">Works At : </span>
        <span className="font-bold text-sm">{profileUser.worksAt}</span>
      </div>
      <button className="font-bold text-xs bg-orange-400 px-3 py-1 mt-4 rounded text-white" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
