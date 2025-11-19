import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
