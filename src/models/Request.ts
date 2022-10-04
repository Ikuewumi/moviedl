import { Schema, model } from "mongoose";

const RequestModel = new Schema({
   imdbID: {
      required: true,
      type: String
   },

   Title: {
      required: true,
      type: String
   },

   Type: {
      required: true,
      type: String
   },

   votes: {
      required: true,
      type: Number
   }
})

const m = model('reqest', RequestModel)

export default m