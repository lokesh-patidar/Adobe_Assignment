const { UserModel } = require("../Models/UserModel");

const express = require(express);
const userRouter = express.Router();

// POST /users: Create a new user.
// GET /users/{id}: Retrieve a user by id.
// PUT /users/{id}: Update a user's name or bio by id.
// DELETE /users/{id}: Delete a user by id.
// GET /analytics/users: Retrieve the total number of users.
// GET /analytics/users/top-active: Retrieve the top 5 most active users, based on the number of posts.

userRouter.get("/", async (req,res) => {
    try {
        let data = await UserModel.find();
        res.send(cartdata);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find users!" });
    }
})

userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ "_id": id });
        res.send({ Message: "User Deleted!" });
    } catch (error) {
        console.log(err);
        res.send({ Message: "Can not delete user!" });
    }
});


userRouter.put("/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;

    try {
        await CartModel.findByIdAndUpdate({ "_id": id }, payload);
        res.send({ Message: "User Updated!" });
    }
    catch (error) {
        console.log(err);
        res.send({ Message: "Can not update user info!" });
    }
});


// get by ID
userRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const cartItem = await CartModel.findById({ "_id": id });
        res.send(cartItem);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can't find product item by given id!" });
    }
});



userRouter.post("/", async (req, res) => {
    const payload = req.body;
    
    try {
      const data = new UserModel(payload);
      await data.save();
      res.send({ Message: "User added successfully!" });
      console.log(data);
    } 
    catch (err) {
      console.log(err);
      res.send({ Message: "User can not be added!" });
    }
  });
  