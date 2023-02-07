import express from "express";
const router = express.Router();

import {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} from "../../controllers/userController.js";

// /api/users GET all and POST
router.route("/").get(getUser).post(createUser);

// /api/users/:userId GET one user, PUT and DELETE by user's ID
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE a friend by ID
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export default router;
