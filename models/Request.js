"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestModel = new mongoose_1.Schema({
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
});
const m = (0, mongoose_1.model)('reqest', RequestModel);
exports.default = m;
