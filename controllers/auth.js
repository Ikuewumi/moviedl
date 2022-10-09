"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verify = exports.login = exports.createUser = void 0;
const composables_1 = require("../composables");
const db_1 = require("../composables/db");
const User_1 = __importDefault(require("../models/User"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
    try {
        if (!(0, composables_1.checkUserFormat)(req.body)) {
            return res.status(400).json({
                msg: "Bad format! Name, Email or Password invalid",
            });
        }
        const x = await (0, db_1.exists)(User_1.default, { email: req.body.email });
        if (x)
            return (0, composables_1.sendMsg)(res, "A User that has the same name or email is already present");
        const password = await bcrypt.hash(req.body.password, 15);
        const data = new User_1.default({
            name: req.body.name,
            email: req.body.email,
            password,
            requests: []
        });
        await data.save();
        res.json({
            msg: `${req.body.email} was signed up`,
        });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong in auth. Please try again later', 503);
    }
};
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        if (!(0, composables_1.checkUser)(req.body))
            return (0, composables_1.sendMsg)(res, "Name or email invalid");
        const user = await (0, db_1.findOne)(User_1.default, { email: req.body.email });
        if (!user?._id)
            return (0, composables_1.sendMsg)(res, "Could not find user");
        const pass = await bcrypt.compare(req.body.password, user.password);
        if (!pass)
            return (0, composables_1.sendMsg)(res, "Email or Password invalid", 403);
        const data = { email: user.email, id: user.id };
        jwt.sign(data, process.env.SECRET_KEY, (err, authData) => {
            if (err)
                return (0, composables_1.sendMsg)(res, "Something went wrong. Please try again", 500);
            req.token = authData;
            next();
        });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong in auth. Please try again later', 503);
    }
};
exports.login = login;
const verify = (req, res, next) => {
    try {
        const isPresent = req.headers['authorization'] &&
            req.headers['authorization'] > 'Bearer ' &&
            req.headers['authorization'].split(' ')[1] > '';
        if (!isPresent)
            return (0, composables_1.sendMsg)(res, 'The token is invalid', 401);
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err)
                return (0, composables_1.sendMsg)(res, 'Forbidden', 403);
            const isValid = await (0, db_1.findById)(User_1.default, data.id, {}, (0, composables_1.createSelects)(composables_1.dbFields.t_user));
            if (!isValid?._id)
                return (0, composables_1.sendMsg)(res, 'Forbidden', 403);
            req.user = data;
            req.userDoc = isValid;
            next();
        });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong in auth. Please try again later', 503);
    }
};
exports.verify = verify;
const verifyAdmin = (req, res, next) => {
    try {
        const isPresent = req.headers['authorization'] &&
            req.headers['authorization'] > 'Bearer ' &&
            req.headers['authorization'].split(' ')[1] > '';
        console.log(isPresent, req.headers['authorization'], req.headers);
        if (!isPresent)
            return (0, composables_1.sendMsg)(res, 'The token is invalid', 401);
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
            if (err)
                return (0, composables_1.sendMsg)(res, 'Forbidden', 403);
            const isValid = await (0, db_1.findById)(User_1.default, data.id, { admin: true }, (0, composables_1.createSelects)(composables_1.dbFields.t_user));
            if (!isValid?._id)
                return (0, composables_1.sendMsg)(res, 'Forbidden', 403);
            req.user = data;
            req.userDoc = isValid;
            next();
        });
    }
    catch (e) {
        return (0, composables_1.sendMsg)(res, 'Something went wrong in auth. Please try again later', 503);
    }
};
exports.verifyAdmin = verifyAdmin;
