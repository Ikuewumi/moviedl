import { Router } from "express";
import auth from "./auth";
import user from './user';
import omdb from './omdb'

const router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/omdb", omdb);

export default router;
