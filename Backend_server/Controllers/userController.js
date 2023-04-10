import userModal from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    }
    else {
      res.status(404).json("No Such User Found");
    }
  }
  catch (error) {
    res.status(500).json(error);
  }
};

export const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentAdminStatus, password } = req.body;
  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await userModal.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        "MERN",
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    }
    catch (error) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(403).json("acess Denail");
  }
};

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentAdminStatus } = req.body;

  if (id === currentUserId || currentAdminStatus) {
    try {
      await userModal.findByIdAndDelete(id);
      res.status(200).json("User Deleated");
    }
    catch (error) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(403).json("acess Denail");
  }
};


export const getAllUsers = async (req, res) => {
  try {
    let users = await userModal.find()
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json(error);
  }
}

export const analyticsUsers = async (req, res) => {
  try {
    let data = await userModal.find();
    console.log("analytics", data.length);
    res.send({ total_users: data.length });
  }
  catch (err) {
    console.log(err);
    res.send({ Message: "Can not find users!" });
  }
}

export const analyticsUsersTopActive = async (req, res) => {
  // try {
  //   let data = await userModal.find();
  //   console.log("analytics", data.length);
  //   res.send({ total_users: data.length });
  // }
  // catch (err) {
  //   console.log(err);
  //   res.send({ Message: "Can not find users!" });
  // }
}