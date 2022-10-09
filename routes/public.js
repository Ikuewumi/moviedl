"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const composables_1 = require("../composables");
const db_1 = require("../composables/db");
const Movie_1 = __importDefault(require("../models/Movie"));
const router = (0, express_1.Router)();
router.get('/movies/:id', async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const data = await (0, db_1.findOne)(Movie_1.default, { imdbID: req.params.id, Type: 'movie' });
        if (!(0, mongoose_1.isObjectIdOrHexString)(data._id)) {
            return (0, composables_1.sendMsg)(res, 'Movie not found in database', 404);
        }
        return (0, composables_1.sendObj)(res, data);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 500);
    }
});
router.get('/series/:id', async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const data = await (0, db_1.findOne)(Movie_1.default, { imdbID: req.params.id, Type: 'series' });
        if (!(0, mongoose_1.isObjectIdOrHexString)(data._id)) {
            return (0, composables_1.sendMsg)(res, 'Series not found in database', 404);
        }
        return (0, composables_1.sendObj)(res, data);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 500);
    }
});
router.get('/random', async (req, res) => {
    try {
        const array = [
            'Title', 'imdbID', 'imdbRating', 'Poster', 'Country', 'Plot', 'Writer', 'Runtime'
        ];
        const sortObject = getRandomObject(array);
        const selectObject = { Title: 1, Type: 1, imdbID: 1 };
        //@TODO - Replace this with a call to your own Movie collection
        const data = await (0, db_1.find)(Movie_1.default, {}, selectObject, sortObject, {
            limit: 5,
            skip: 1
        });
        return (0, composables_1.sendObj)(res, { data }, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.get('/featured', async (req, res) => {
    try {
        const data = await (0, db_1.find)(Movie_1.default, {}, (0, composables_1.createSelects)(composables_1.dbFields.t_movie), { updatedAt: -1 }, { limit: 5, skip: 0 });
        if (!data.length)
            return (0, composables_1.sendMsg)(res, 'Movied not found');
        return (0, composables_1.sendObj)(res, data, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
function getRandomNumber() {
    return (Math.random() > 0.5) ? 1 : -1;
}
function getRandomObject(array) {
    const length = Math.random() * array.length;
    const newArray = [...array.sort((a, b) => Math.random() - 0.5)[0]];
    const newObject = {};
    newArray.forEach(key => {
        newObject[key] = getRandomNumber();
    });
    return newObject;
}
exports.default = router;
