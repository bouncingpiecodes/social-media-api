import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const prettyTimestamp = (dateTime) => {
  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();
  const prettyDateTime = `${date} at ${time}`;
  return prettyDateTime;
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (dateTime) => prettyTimestamp(dateTime),
    },
    updatedAt: { type: Date, get: (dateTime) => prettyTimestamp(dateTime) },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (dateTime) => prettyTimestamp(dateTime),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
    updatedAt: { type: Date, get: (dateTime) => prettyTimestamp(dateTime) },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

export default Thought;
