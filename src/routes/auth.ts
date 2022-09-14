import { Router, Application, Request, Response, NextFunction } from "express";
import { CustomHandler, sendMsg, UserReq } from "../composables";
import { createUser, login } from "../controllers/auth";

const router = Router();

router.post("/signup", createUser);
router.post("/login", login, (req: UserReq, res: Response) => {
   return sendMsg(res, req.token, 200);
});

export default router;
