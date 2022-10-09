"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const composables_1 = require("../composables");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/signup", auth_1.createUser);
router.post("/login", auth_1.login, (req, res) => {
    return (0, composables_1.sendMsg)(res, req.token, 200);
});
exports.default = router;
