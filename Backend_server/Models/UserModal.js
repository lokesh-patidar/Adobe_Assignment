import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        bio: String,
        password: { type: String, required: true },
        created_at: { type: String, timestamps: true },
        updated_at: { type: String, timestamps: true },
    }
)

const userModal = mongoose.model("Users", UserSchema)
export default userModal;
