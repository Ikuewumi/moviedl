"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const composables_1 = require("../composables");
const db_1 = require("../composables/db");
const auth_1 = require("../controllers/auth");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', auth_1.verify, async (req, res) => {
    try {
        const data = await (0, db_1.findById)(User_1.default, req.user?.id ?? '', {}, (0, composables_1.createSelects)(composables_1.dbFields.user));
        return (0, composables_1.sendObj)(res, data);
    }
    catch (e) { }
});
router.patch('/', auth_1.verify, async (req, res) => {
    try {
        const valid = composables_1.regexObject.name.test(req.body?.name);
        if (!valid)
            return (0, composables_1.sendMsg)(res, 'Invalid user object. There must at least be a valid name', 400);
        const user = {
            name: req.body.name,
            img: req.body?.img,
            description: req.body?.description
        };
        const data = await (0, db_1.setById)(User_1.default, req.user?.id ?? '', {}, user);
        if (!data)
            return (0, composables_1.sendMsg)(res, 'Something went wrong. Please try again', 503);
        return (0, composables_1.sendMsg)(res, 'Update successful!', 200);
    }
    catch (e) { }
});
exports.default = router;
