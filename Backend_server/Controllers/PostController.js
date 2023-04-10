import PostModal from "../Models/PostModals.js";
import mongoose from "mongoose";
import userModal from "../Models/UserModal.js";

export const CreatePost = async (req, res) => {
  const newPost = new PostModal(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

export const GetPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModal.findById(id);
    res.status(200).json(post);
  }
  catch (error) {
    res.status(500).json(error);
  }
};

export const UpdatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModal.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    }
    else {
      res.status(403).json("forbidden");
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
};

export const DeletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModal.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("post deleted");
    }
    else {
      res.status(403).json("forbidden");
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
};

export const LikePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModal.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("liked");
    }
    else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("disliked");
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
};


export const GetTimeLinePost = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserIdPost = await PostModal.find({ userId: userId });
    const followingPosts = await userModal.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserIdPost
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  }
  catch (error) {
    res.status(500).json(error);
  }
};
