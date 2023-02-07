import express from "express";
const router = express.Router();

import {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} from "../../controllers/thoughtController.js";

// /api/thoughts GET all and POST thought
router.route("/").get(getThought).post(createThought);

// /api/thoughts/:thoughtId GET one thought, PUT and DELETE by iD
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;
