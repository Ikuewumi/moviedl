"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const composables_1 = require("../composables");
const db_1 = require("../composables/db");
const auth_1 = require("../controllers/auth");
const Comments_1 = __importDefault(require("../models/Comments"));
const Movie_1 = __importDefault(require("../models/Movie"));
const router = (0, express_1.Router)();
function isValidComment(comment) {
    const valid = typeof comment.content === 'string';
    return valid;
}
function isValidNextComment(comment) {
    const valid = typeof comment.content === 'string' && typeof comment.aid === 'string';
    return valid;
}
router.post('/:id', auth_1.verify, async (req, res) => {
    try {
        const valid = isValidComment(req.body) && composables_1.regexObject.imdbId.test(req.params.id);
        const x = await (0, db_1.exists)(Movie_1.default, { imdbID: req.params.id });
        if (!(valid && x)) {
            return (0, composables_1.sendMsg)(res, 'Invalid data', 400);
        }
        const newComment = new Comments_1.default({
            aid: String(req.userDoc?._id),
            name: req.userDoc?.name,
            admin: req.userDoc?.admin ?? false,
            timestamp: Date.now(),
            imdbID: req.params.id,
            content: req.body.content,
            comments: []
        });
        const data = await newComment.save();
        return (0, composables_1.sendObj)(res, data);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const data = await (0, db_1.find)(Comments_1.default, { imdbID: req.params.id }, {}, { timestamp: -1 }, { limit: 2000, skip: 0 });
        return (0, composables_1.sendObj)(res, data);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.patch('/:id', auth_1.verify, async (req, res) => {
    try {
        const valid = isValidComment(req.body) && (0, mongoose_1.isValidObjectId)(req.params.id);
        if (!valid) {
            return (0, composables_1.sendMsg)(res, 'Invalid data', 400);
        }
        const y = await (0, db_1.exists)(Comments_1.default, { id: req.params.id });
        if (!y) {
            return (0, composables_1.sendMsg)(res, 'Parent Comment dosen\'t exist', 400);
        }
        const comment_ = {
            aid: String(req.userDoc?._id),
            name: req.userDoc?.name,
            admin: req.userDoc?.admin ?? false,
            timestamp: Date.now(),
            content: req.body.content
        };
        const data = await (0, db_1.updateOne)(Comments_1.default, { _id: req.params.id }, { $push: { comments: comment_ } });
        return (0, composables_1.sendMsg)(res, data, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
exports.default = router;
