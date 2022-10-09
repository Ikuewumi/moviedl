"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Film = new mongoose_1.Schema({
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
        type: String
    },
    Genre: {
        required: true,
        type: String
    },
    Plot: {
        required: true,
        type: String
    },
    Writers: {
        required: true,
        type: String
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
        type: String
    },
    //movie and series specific fields, respectively
    dvd: String,
    totalSeasons: Number,
    SeriesLinks: Array
});
const m = (0, mongoose_1.model)('film', Film);
exports.default = m;
