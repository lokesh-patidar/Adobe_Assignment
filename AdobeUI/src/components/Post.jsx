import React, { useEffect } from "react";
import PostCard from "./PostCard";
import {useDispatch,useSelector} from 'react-redux'
import { getTimeLinePosts } from "../actions/postAction";
import { useParams } from "react-router-dom";

const Post = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.authReducer.authData)
  let {posts , loading } = useSelector((state)=>state.postReducer)
  const params = useParams()

  useEffect(()=>{
    dispatch(getTimeLinePosts(user._id))
  },[])
  if(!posts) return "no post yet"
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  return (
    <div className="">
      {loading?"loading":
      posts.map((e, id) => {
        return <PostCard data={e} key={id} />;
      })}
    </div>
  );
};

export default Post;
