import { User, Thought } from "../models/index.js";

// GET all thoughts
export const getThought = (req, res) => {
  Thought.find({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
};
// GET single thought
export const getSingleThought = (req, res) => {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};
//create a thought and push the created thought's _id to the associated user's thoughts array field
export const createThought = (req, res) => {
  Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};
//update a thought
export const updateThought = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, New: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};
//delete a thought
export const deleteThought = (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: "thought deleted, but no user found!" })
        : res.json({ message: "thought successfully deleted" })
    )
    .catch((err) => res.status(500).json(err));
};
//create reaction
export const createReaction = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};
//delete reaction
export const deleteReaction = (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "oh no! no thought found with ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};
