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
const omdb_1 = require("./omdb");
const fetch = require("node-fetch");
const router = (0, express_1.Router)();
const limit = (0, composables_1.limitAPIRateFn)(20);
router.use(auth_1.verify);
router.use(composables_1.vAdmin);
router.use(limit);
const isValidMovieRequest = (object) => {
    if (!(object?.links && Array.isArray(object.links))) {
        return false;
    }
    const x = object?.links.reduce((acc, current) => {
        const valid = (current?.type && current?.links &&
            typeof current.type === 'string' &&
            Array.isArray(current.links));
        return acc && valid;
    }, true);
    if (!x)
        return false;
    const mapped = object.links.map(link => {
        return {
            type: link.type,
            links: link.links
        };
    });
    const processed = {
        links: mapped
    };
    if (object.img)
        processed.img = object.img;
    return processed;
};
const isValidSeriesRequest = (object) => {
    if (!(object?.links && Array.isArray(object.links))) {
        return false;
    }
    let x = object?.links.reduce((acc, current) => {
        const valid = (Number(current?.season) && current?.links &&
            Array.isArray(current.links));
        return acc && valid;
    }, true);
    const ids = ['batch', 'special', 'episode'];
    const types = ['480p', '540p', '720p', '1080p', '2160p', '4K', 'other'];
    object.links.forEach((season) => {
        const y = season.links.reduce((acc, current) => {
            const valid = (ids.includes(current.id) &&
                types.includes(current.type) &&
                Array.isArray(current.links) &&
                current.links.reduce((acc, current) => acc && typeof current === 'string', true));
            return acc && valid;
        }, true);
        x = x && y;
    });
    if (!x)
        return false;
    const mapped = object.links.map(link => {
        return {
            season: link.season,
            totalEpisodes: link.totalEpisodes,
            links: link.links
        };
    });
    const processed = {
        links: mapped
    };
    if (object.img)
        processed.img = object.img;
    return processed;
};
function placeSeriesObjects(db, user) {
    // Copying database object
    const db_ = [...db];
    db_.forEach(season => {
        const u = user.find((season_) => season.season === season_.season);
        if (u) {
            season.links = u.links;
        }
    });
    return db_;
}
function updateEpisodeCount(db = [], user = []) {
    const starterDb = [...db];
    let starterUser = [...user];
    const addedSeasons = starterDb.filter(db => {
        const index = user.findIndex(u => u.season === db.season);
        return Boolean(index === -1);
    });
    starterUser = [...starterUser, ...addedSeasons];
    starterDb.forEach(db => {
        const index = starterUser.findIndex(user => user.season === db.season);
        if (index !== -1) {
            starterUser[index] = {
                ...starterUser[index],
                totalEpisodes: db.totalEpisodes
            };
        }
    });
    starterUser = starterUser.sort((a, b) => a.season - b.season);
    return starterUser;
}
// @TODO - Add admin verify middleware for prod.
router.post('/movies/:id', composables_1.checkImdbID, limit, async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const body = isValidMovieRequest(req.body);
        if (!body) {
            return (0, composables_1.sendMsg)(res, 'Invalid parameters', 400);
        }
        // @TODO - Add calls to the actual omDB API
        const response = await (0, omdb_1.getMovie)(req.params.id);
        const data = response;
        const data_ = new Movie_1.default({
            ...data,
            Type: 'movie',
            Actors: (0, composables_1.formatArr)(data.Actors),
            Genre: (0, composables_1.formatArr)(data.Genre),
            Writer: (0, composables_1.formatArr)(data.Writer),
            Language: (0, composables_1.formatArr)(data.Language),
            Country: (0, composables_1.formatArr)(data.Country),
            imdbRating: Number(data.imdbRating),
            MovieLinks: body.links
        });
        if (body.img)
            data_.Poster = body.img;
        const x = await data_.save();
        return (0, composables_1.sendObj)(res, x);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 503);
    }
});
router.post('/series/:id', composables_1.checkImdbID, limit, async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const body = isValidSeriesRequest(req.body);
        if (!body) {
            return (0, composables_1.sendMsg)(res, 'Invalid parameters', 400);
        }
        // @TODO - Add calls to the actual omDB API
        const response = await (0, omdb_1.getProcessedSeries)(req.params.id, res);
        const data = response;
        const data_ = new Movie_1.default({
            ...data,
            Type: 'series',
            Actors: (0, composables_1.formatArr)(data.Actors),
            Genre: (0, composables_1.formatArr)(data.Genre),
            Writer: (0, composables_1.formatArr)(data.Writer),
            Language: (0, composables_1.formatArr)(data.Language),
            Country: (0, composables_1.formatArr)(data.Country),
            imdbRating: Number(data.imdbRating),
            SeriesLinks: placeSeriesObjects(data?.SeriesLinks, body.links)
        });
        if (body.img)
            data_.Poster = body.img;
        const x = await data_.save();
        return (0, composables_1.sendObj)(res, x);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 503);
    }
});
router.patch('/movies/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const body = isValidMovieRequest(req.body);
        if (!body) {
            return (0, composables_1.sendMsg)(res, 'Invalid parameters', 400);
        }
        const data_ = {
            MovieLinks: body.links
        };
        if (body.img)
            data_.Poster = body.img;
        const x = await (0, db_1.updateOne)(Movie_1.default, { imdbID: req.params.id, Type: 'movie' }, { $set: data_ });
        return (0, composables_1.sendObj)(res, x);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 503);
    }
});
router.patch('/series/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        if (!composables_1.regexObject.imdbId.test(req.params.id)) {
            return (0, composables_1.sendMsg)(res, 'Invalid imdB id', 400);
        }
        const body = isValidSeriesRequest(req.body);
        if (!body) {
            return (0, composables_1.sendMsg)(res, 'Invalid parameters', 400);
        }
        // @TODO - Add calls to the actual omDB API
        const response = await (0, db_1.findOne)(Movie_1.default, {
            imdbID: req.params.id,
            Type: 'series'
        });
        if (!(0, mongoose_1.isObjectIdOrHexString)(response?._id))
            return (0, composables_1.sendMsg)(res, 'Series not in Database', 404);
        const data_ = {
            SeriesLinks: placeSeriesObjects(response?.SeriesLinks, body.links)
        };
        if (body.img)
            data_.Poster = body.img;
        const x = await (0, db_1.updateOne)(Movie_1.default, { imdbID: req.params.id, Type: 'series' }, { $set: data_ });
        return (0, composables_1.sendObj)(res, x);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, e, 503);
    }
});
router.get('/movies/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        const obj = { imdbID: req.params.id, Type: 'movie' };
        const data = await (0, db_1.findOne)(Movie_1.default, obj);
        if (!(0, mongoose_1.isValidObjectId)(data?._id))
            return (0, composables_1.sendMsg)(res, 'Could not find resource', 404);
        // @TODO - Call the omdbAPI movie
        const payload = await (0, omdb_1.getMovie)(req.params.id);
        const data_ = { imdbRating: Number(payload.imdbRating), Plot: payload.Plot };
        const update = await (0, db_1.updateOne)(Movie_1.default, obj, { $set: data_ });
        if (!update)
            return (0, composables_1.sendMsg)(res, 'Cannot edit at the moment. Please try again later', 404);
        const result = await (0, db_1.findOne)(Movie_1.default, obj);
        if (!(0, mongoose_1.isValidObjectId)(result?._id))
            return (0, composables_1.sendMsg)(res, 'Could not find resource', 404);
        return (0, composables_1.sendObj)(res, result._doc, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 500);
    }
});
router.get('/series/:id', composables_1.checkImdbID, async (req, res) => {
    try {
        const obj = { imdbID: req.params.id, Type: 'series' };
        // @TODO - Call the omdbAPI movie
        const data = await (0, db_1.findOne)(Movie_1.default, obj);
        if (!(0, mongoose_1.isValidObjectId)(data?._id))
            return (0, composables_1.sendMsg)(res, 'Could not find resource', 404);
        const response = await (0, omdb_1.getProcessedSeries)(req.params.id, res);
        const payload = response;
        const data_ = {
            SeriesLinks: updateEpisodeCount(payload.SeriesLinks, data._doc.SeriesLinks),
            imdbRating: Number(payload.imdbRating),
            Plot: payload.Plot,
            totalSeasons: Number(payload.totalSeasons)
        };
        const update = await (0, db_1.updateOne)(Movie_1.default, obj, { $set: data_ });
        if (!update)
            return (0, composables_1.sendMsg)(res, 'Cannot edit at the moment. Please try again later', 404);
        const result = await (0, db_1.findOne)(Movie_1.default, obj);
        return (0, composables_1.sendObj)(res, result, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 500);
    }
});
exports.default = router;
