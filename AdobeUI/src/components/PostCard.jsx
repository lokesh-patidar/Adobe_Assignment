import React, { useState } from "react";
import Comment from "../img/comment.png";
import share from "../img/share.png";
import heart from "../img/like.png";
import dislike from "../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../apis/postReq";

const PostCard = ({ data, id }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const uurrll = `https://adobe-assignment-mwhv.vercel.app/images`;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="my-4 flex flex-col gap-3 bg-white rounded-lg p-4">
      <div className="px-20">
        <img
          className="w-full"
          src={data.image ? uurrll + data.image : ""}
          alt=""
        />
        <div className="flex gap-4">
          <p className="text-sm font-bold bg-black">{data.name}</p>
          <p className="text-sm">{data.content}</p>
        </div>
      </div>
      <div className="flex gap-6">
        <img src={liked ? heart : dislike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={share} alt="" />
      </div>
      <p className="font-base text-xs">{likes} likes</p>
    </div>
  );
};

export default PostCard;
