"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const composables_1 = require("../composables");
const db_1 = require("../composables/db");
const Movie_1 = __importDefault(require("../models/Movie"));
const router = (0, express_1.Router)();
const extractPageNumber = (req) => {
    let n = Number(req.query?.page);
    let m = n && Number.isFinite(n) && n >= 1 ? n - 1 : 0;
    return m;
};
// SEARCH FUNCTIONALITY
router.get('/search/:title', async (req, res) => {
    try {
        if (!req.params?.title)
            return (0, composables_1.sendMsg)(res, 'Any search must have term', 400);
        const pageNum = extractPageNumber(req);
        const regex = { Title: { $regex: new RegExp(req.params.title, 'i') } };
        const more = { limit: 20, skip: Number(pageNum * 20) ?? 0 };
        const data = await (0, db_1.find)(Movie_1.default, regex, (0, composables_1.createSelects)(composables_1.dbFields.t_movie), {}, more);
        const count = await Movie_1.default.count(regex);
        return (0, composables_1.sendObj)(res, { data: data, count, page: pageNum + 1 });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.get('/index/:type', async (req, res) => {
    try {
        const pageNum = extractPageNumber(req);
        const extractType = (x = '') => {
            let result = 'movie';
            switch (x) {
                case 'series':
                case 's':
                    result = 'series';
                    break;
                default:
                    result = 'movie';
                    break;
            }
            return result;
        };
        const type = extractType(req.params.type);
        const field = { Type: type };
        const sort = { Title: 1 };
        const more = { limit: 200, skip: Number(pageNum * 200) ?? 0 };
        const data = await (0, db_1.find)(Movie_1.default, field, (0, composables_1.createSelects)(composables_1.dbFields.t_movie), sort, more);
        const count = await Movie_1.default.count(field);
        return (0, composables_1.sendObj)(res, { data: data, count, page: pageNum + 1 });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
router.get('/home', async (req, res) => {
    try {
        const pageNum = extractPageNumber(req);
        const field = {};
        const sort = { updatedBy: -1 };
        const more = { limit: 20, skip: Number(pageNum * 20) ?? 0 };
        const data = await (0, db_1.find)(Movie_1.default, field, (0, composables_1.createSelects)(composables_1.dbFields.t_movie), sort, more);
        const count = await Movie_1.default.count(field);
        return (0, composables_1.sendObj)(res, { data: data, count, page: pageNum + 1 });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, String(e), 500);
    }
});
exports.default = router;
