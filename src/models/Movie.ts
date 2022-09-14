import { Schema, model } from "mongoose";
import { r } from '../composables'

const Movie = new Schema({
   // imdb stuff
   imdbID: {
      required: true,
      type: String
   },
   imdbRating: {
      required: true,
      type: Number
   },

   //metainfo
   title: {
      required: true,
      type: String
   },
   type: {
      required: true,
      type: String
   },
   year: {
      required: true,
      type: String
   },
   poster: {
      required: true,
      type: String
   },

   //more info
   actors: {
      required: true,
      type: Array
   },
   genres: {
      required: true,
      type: Array
   },
   plot: {
      required: true,
      type: String
   },
   writers: {
      required: true,
      type: String
   },
   director: String,
   awards: String,

   // times
   runtime: {
      required: true,
      type: String
   },
   released: {
      required: true,
      type: String
   },
   language: {
      required: true,
      type: String
   },

   //movie and series specific fields, respectively
   dvd: String,
   totalSeasons: Number,
})


const m = model("movie", Movie);

export default m;
