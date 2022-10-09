"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
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
});
const m = (0, mongoose_1.model)('comment', CommentSchema);
exports.default = m;
