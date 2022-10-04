import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
   aid: {
      required: true,
      type: String
   },

   name: {
      required: true,
      type: String
   },

   imdbID: {
      required: true,
      type: String
   },

   admin: Boolean,

   content: {
      required: true,
      type: String
   },

   timestamp: {
      required: true,
      type: Number
   },

   comments: {
      required: true,
      type: Array
   }
})

const m = model('comment', CommentSchema)

export default m