import express from "express";
import authMiddleWare from "../middleware/authMiddleware.js";
import {
  analyticsUsers,
  DeleteUser,
  getAllUsers,
  getUser,
  UpdateUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.get('/users/all', getAllUsers)
router.get("/users/:id", getUser);
router.put("/users/:id",authMiddleWare, UpdateUser);
router.delete("/users/:id",authMiddleWare, DeleteUser);
router.get("/analytics/users", analyticsUsers)
// router.get("/analytics/users/top-active",)


export default router;
