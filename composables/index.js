"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vAdmin = exports.limitAPIRateFn = exports.checkImdbID = exports.r = exports.dbFields = exports.createSelects = exports.sendCode = exports.sendObj = exports.sendMsg = exports.checkUser = exports.checkUserFormat = exports.oid = exports.validateId = exports.regexObject = exports.formatArr = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_rate_limit_1 = require("express-rate-limit");
const formatArr = (str) => {
    const array = str.split(',').map(item => item.trim());
    return array;
};
exports.formatArr = formatArr;
exports.regexObject = {
    name: /^([a-zA-Z]+) ([a-zA-Z]+)$/,
    password: /^[\w\W]{6,}$/,
    email: /^([a-z\d\.]+)@([a-z\d\-]+)\.([a-z]{2,8})((\.)[a-z]{2,8})?$/,
    imdbId: /^tt[0-9]{6,12}$/
};
function validateId(id) {
    return mongoose_1.default.Types.ObjectId.isValid(id);
}
exports.validateId = validateId;
function oid(id) {
    return new mongoose_1.default.Types.ObjectId(id);
}
exports.oid = oid;
function checkUserFormat({ name, email, password, }) {
    const valid = typeof name === "string" &&
        typeof password === "string" &&
        typeof email === "string" &&
        name.length > 0 &&
        password.length >= 6 &&
        email.length > 0 &&
        exports.regexObject.name.test(name) &&
        exports.regexObject.email.test(email) &&
        exports.regexObject.password.test(password);
    return valid;
}
exports.checkUserFormat = checkUserFormat;
function checkUser({ email, password, }) {
    const valid = typeof password === "string" &&
        typeof email === "string" &&
        password.length >= 6 &&
        email.length > 0 &&
        exports.regexObject.email.test(email) &&
        exports.regexObject.password.test(password);
    return valid;
}
exports.checkUser = checkUser;
function sendMsg(res, msg = "", status = 400) {
    return res.status(status).json({ msg });
}
exports.sendMsg = sendMsg;
function sendObj(res, msg, status = 200) {
    return res.status(status).json(msg);
}
exports.sendObj = sendObj;
function sendCode(res, status = 200) {
    return res.sendStatus(status);
}
exports.sendCode = sendCode;
function createSelects(terms) {
    let obj = {};
    const fn = (a) => { obj[a] = 1; };
    terms.forEach(fn);
    return obj;
}
exports.createSelects = createSelects;
exports.dbFields = {
    user: ['name', 'email', 'admin', 'img', 'description', 'requests'],
    t_user: ['name', 'email', 'admin'],
    t_movie: ['Title', 'Year', 'Plot', 'Genre', 'Actors', 'Type', 'imdbID', 'imdbRating', 'Poster']
};
const r = (t) => {
    return {
        type: t,
        required: true
    };
};
exports.r = r;
const checkImdbID = (req, res, next) => {
    const valid = exports.regexObject.imdbId.test(req.params?.id);
    if (!valid)
        return sendMsg(res, 'Invalid imdbID!', 400);
    next();
};
exports.checkImdbID = checkImdbID;
const limitAPIRateFn = (n) => {
    const limiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 24 * 60 * 6000,
        max: n,
        "message": {
            msg: 'Too many requests. Please try again later'
        }
    });
    return limiter;
};
exports.limitAPIRateFn = limitAPIRateFn;
const vAdmin = (req, res, next) => {
    try {
        const valid = Boolean(req?.userDoc?.admin);
        if (!valid)
            throw Error('User not admin');
        return next();
    }
    catch (e) {
        return sendMsg(res, 'User is not an admin', 401);
    }
};
exports.vAdmin = vAdmin;
