"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
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
const m = (0, mongoose_1.model)("user", User);
exports.default = m;
