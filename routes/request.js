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
const Movie_1 = __importDefault(require("../models/Movie"));
const Request_1 = __importDefault(require("../models/Request"));
const omdb_1 = require("./omdb");
const fetch = require('node-fetch');
const extractPageNumber = (req) => {
    let n = Number(req.query?.page);
    let m = n && Number.isFinite(n) && n >= 1 ? n - 1 : 0;
    return m;
};
const makeRequest = async (res, imdbID) => {
    // @TODO-Make a call to the omDB API to generate the information
    const requested = await (0, omdb_1.getFilm)(imdbID);
    const newRequest = new Request_1.default({
        imdbID: requested.imdbID,
        Title: requested.Title,
        votes: 1,
        Type: requested.Type
    });
    const data = await newRequest.save();
    return (0, composables_1.sendObj)(res, data, 200);
};
const updateRequest = async (res, imdbID) => {
    const data = await (0, db_1.updateOne)(Request_1.default, { imdbID }, { $inc: { votes: 1 } });
    return (0, composables_1.sendMsg)(res, data, 200);
};
const router = (0, express_1.Router)();
router.use(auth_1.verify);
const limit = (0, composables_1.limitAPIRateFn)(5);
router.post('/:id', composables_1.checkImdbID, limit, async (req, res) => {
    try {
        const valid = await (0, db_1.exists)(Movie_1.default, { imdbID: req.params.id });
        if (valid)
            return (0, composables_1.sendMsg)(res, 'Movie is already present', 400);
        const isPresent = await (0, db_1.exists)(Request_1.default, { imdbID: req.params.id });
        const chosenFunction = isPresent ? updateRequest : makeRequest;
        await chosenFunction(res, req.params.id);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.use(composables_1.vAdmin);
router.get('/', async (req, res) => {
    try {
        const pageNumber = extractPageNumber(req);
        const data = await (0, db_1.find)(Request_1.default, {}, {}, {}, { limit: 20, skip: Number(pageNumber * 20) ?? 0 });
        const count = await Request_1.default.count({});
        return (0, composables_1.sendObj)(res, { data: data, count, page: pageNumber + 1 }, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.get('/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        const valid = await (0, db_1.exists)(Movie_1.default, { imdbID: req.params.id });
        if (valid)
            return (0, composables_1.sendMsg)(res, 'Movie is already present', 400);
        const isPresent = await (0, db_1.findOne)(Request_1.default, { imdbID: req.params.id });
        if ((0, mongoose_1.isValidObjectId)(isPresent?._id)) {
            return (0, composables_1.sendObj)(res, isPresent, 200);
        }
        else {
            // @TODO - Make a call to omdb API
            const x = await (0, omdb_1.getFilm)(req.params.id);
            return (0, composables_1.sendObj)(res, x, 200);
        }
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.delete('/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        const data = await (0, db_1.removeOne)(Request_1.default, { imdbId: req.params.id });
        if (!data)
            return (0, composables_1.sendMsg)(res, 'Failed to delete', 400);
        return (0, composables_1.sendMsg)(res, 'Deleted the request', 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
exports.default = router;
