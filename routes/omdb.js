"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessedSeries = exports.getFilm = exports.getMovie = exports.getSeries = void 0;
const express_1 = require("express");
const composables_1 = require("../composables");
const fetch = require('node-fetch');
const composables_2 = require("../composables");
const auth_1 = require("../controllers/auth");
//@TODO-add api-rate-limiting here 
const limit = (0, composables_1.limitAPIRateFn)(20);
const router = (0, express_1.Router)();
const getAllSeasons = async (imdbID, totalSeasons) => {
    const s = Number(totalSeasons);
    const id = String(imdbID);
    const promiseArray = [];
    for (let i = 1; i <= s; i++) {
        const request = (await fetch(createApiLink(`?i=${imdbID}&Season=${i}`))).json();
        promiseArray.push(request);
    }
    const resultArray = await Promise.all(promiseArray);
    return resultArray;
};
function createApiLink(endpoint) {
    const link = `${process.env.API_URL}${endpoint}&apikey=${process.env.API_KEY}`;
    return link;
}
function checkForErrors(data) {
    const valid = checkString(data.Title) && checkString(data.imdbID) && checkString(data.Response) && data.Response === 'True' && composables_1.regexObject.imdbId.test(data.imdbID);
    console.log(data, valid);
    if (!valid)
        throw Error('Could not find movie in database');
    return true;
}
function checkResponse(res) {
    // console.log(res)
}
async function getSeries(imdbID) {
    const response = await fetch(createApiLink(`?i=${imdbID}&type=series`));
    checkResponse(response);
    const data = await response.json();
    checkForErrors(data);
    return data;
}
exports.getSeries = getSeries;
async function getMovie(imdbID) {
    const response = await fetch(createApiLink(`?i=${imdbID}&type=movie`));
    checkResponse(response);
    const data = await response.json();
    checkForErrors(data);
    return data;
}
exports.getMovie = getMovie;
async function getFilm(imdbID) {
    const response = await fetch(createApiLink(`?i=${imdbID}`));
    checkResponse(response);
    const data = await response.json();
    checkForErrors(data);
    return data;
}
exports.getFilm = getFilm;
function checkString(x) {
    const valid = x && String(x) && String(x).trim() > '';
    return Boolean(valid);
}
function checkNumber(x) {
    const valid = x && Number(x);
    return Boolean(valid);
}
router.use(auth_1.verify);
router.use(composables_2.vAdmin);
router.use(limit);
router.get('/seasons/:id', composables_2.checkImdbID, async (req, res) => {
    try {
        const a = await getAllSeasons(req.params.id, Number(req.query.num) ?? 1);
        return (0, composables_1.sendObj)(res, a, 200);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 500);
    }
});
router.get('/movies/:id', composables_2.checkImdbID, async (req, res) => {
    // @TODO - Replace this code with actual calls to the omDB restAPI
    try {
        let x = await getMovie(req.params.id);
        return (0, composables_1.sendObj)(res, {
            ...x,
            MovieLinks: [],
            SeriesLinks: []
        });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 503);
    }
});
router.get('/series/:id', composables_2.checkImdbID, async (req, res) => {
    // @TODO - Replace this code with actual calls to the omDB restAPI
    try {
        const obj = await getProcessedSeries(req.params.id, res);
        return (0, composables_1.sendObj)(res, obj);
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 503);
    }
});
async function getProcessedSeries(id, res) {
    let x = await getSeries(id);
    const response = await fetch(`${process.env.SERVER_URL}/api/omdb/seasons/${id}?num=${Number(x.totalSeasons)}`);
    if (!(response.status === 200))
        return (0, composables_1.sendMsg)(res, 'Something went wrong', 404);
    const seasons = await response.json();
    if (!seasons?.length) {
        return (0, composables_1.sendMsg)(res, 'Series has a problem', 404);
    }
    const seriesLinks = [];
    seasons.forEach(season => {
        const valid = checkString(season?.Title);
        if (!valid)
            return;
        const ascEpisodes = season.Episodes.sort((a, b) => Number(a.Episode) - Number(b.Episode));
        const totalEpisodes = Number(ascEpisodes[ascEpisodes.length - 1].Episode);
        const obj = {
            season: Number(season.Season),
            totalEpisodes,
            links: []
        };
        seriesLinks.push(obj);
    });
    seriesLinks.sort((a, b) => a.season - b.season);
    return ({
        ...x,
        SeriesLinks: seriesLinks,
        MovieLinks: []
    });
}
exports.getProcessedSeries = getProcessedSeries;
exports.default = router;
