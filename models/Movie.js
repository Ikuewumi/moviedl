"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Movie = new mongoose_1.Schema({
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
    Title: {
        required: true,
        type: String
    },
    Type: {
        required: true,
        type: String
    },
    Year: {
        required: true,
        type: String
    },
    Poster: {
        required: true,
        type: String
    },
    //more info
    Actors: {
        required: true,
        type: Array
    },
    Country: Array,
    Genre: {
        required: true,
        type: Array
    },
    Plot: {
        required: true,
        type: String
    },
    Writer: {
        required: true,
        type: Array
    },
    Director: String,
    Awards: String,
    // times
    Runtime: {
        required: true,
        type: String
    },
    Released: {
        required: true,
        type: String
    },
    Language: {
        required: true,
        type: Array
    },
    //movie and series specific fields, respectively
    MovieLinks: { type: Array },
    SeriesLinks: { type: Array },
    dvd: String,
    totalSeasons: Number,
}, { timestamps: true });
const m = (0, mongoose_1.model)("movie", Movie);
exports.default = m;
