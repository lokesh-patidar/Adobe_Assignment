import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUser } from "../apis/userReq";

const UserInfo = () => {
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [prsns, setPrsns] = useState();

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      data.map((e, id) => {
        if (e._id === param.id) {
          setPrsns(e);
        }
      });
    };
    fetchPersons();
  }, []);

  return <div>hii
    
    </div>;
};

export default UserInfo;
