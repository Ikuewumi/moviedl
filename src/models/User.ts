import { Schema, model } from "mongoose";

const User = new Schema({
   name: {
      required: true,
      type: String
   },
   email: {
      required: true,
      type: String
   },
   password: {
      required: true,
      type: String
   },
   requests: {
      required: true,
      type: Array
   },
   admin: Boolean,
   img: String,
   description: String
});

const m = model("user", User);

export default m;
