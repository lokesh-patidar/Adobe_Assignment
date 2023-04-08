const { UserModel } = require("../Models/UserModel");

const express = require(express);
const userRouter = express.Router();

// POST /posts: Create a new post. The request should include the user_id.
// GET /posts/{id}: Retrieve a post by id.
// PUT /posts/{id}: Update a post's content by id.
// DELETE /posts/{id}: Delete a post by id.
// POST /posts/{id}/like: Increment the like count of a post by id.
// POST /posts/{id}/unlike: Decrement the like count of a post by id. The count should not go below 0.


userRouter.get("/", async (req,res) => {
    try {
        let data = await UserModel.find();
        res.send(cartdata);
    }
    catch (err) {
        console.log(err);
        res.send({ Message: "Can not find posts!" });
    }
});


userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ "_id": id });
        res.send({ Message: "User Deleted!" });
    } catch (error) {
        console.log(err);
        res.send({ Message: "Can not delete posts!" });
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


userRouter.post("/:id/like", async (req, res) => {
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


userRouter.post("/:id/unlike", async (req, res) => {
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
  