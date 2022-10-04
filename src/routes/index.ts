import { Router } from "express";
import auth from "./auth";
import user from './user';
import omdb from './omdb'
import admin from './admin'
import public_ from './public'
import comments from './comments'
import requests from './request'
import pages from './pages'

const router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/omdb", omdb);
router.use("/admin", admin);
router.use("/public", public_);
router.use("/comments", comments);
router.use("/requests", requests);
router.use("/pages", pages);

export default router;
