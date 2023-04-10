import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user_id: { type: String, required: true },
    content: String,
    created_at: { type: String, timestamps: true },
    updated_at: { type: String, timestamps: true },
    likes: [],
    image: String,
  }
);

const PostModal = mongoose.model("Posts", postSchema);
export default PostModal;