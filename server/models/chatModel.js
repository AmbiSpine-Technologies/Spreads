import { Schema, Types, model } from "mongoose";

const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);


const Chat = model("Chat", chatSchema);

export default Chat;
