import { Router, Response, NextFunction, Handler } from "express";
import { checkUser, createSelects, dbFields, regexObject, sendMsg, sendObj, UserReq } from "../composables";
import { findById, setById } from "../composables/db";
import { verify } from "../controllers/auth";
import User from "../models/User";

const router = Router()

router.get('/', verify, async (req: UserReq, res: Response) => {
   try {
      const data = await findById(User, req.user?.id, {}, createSelects(dbFields.user))
      return sendObj(res, data!)
   }
   catch (e) { }
})

router.patch('/', verify, async (req: UserReq, res: Response) => {
   try {
      const valid = regexObject.name.test(req.body?.name)
      if (!valid) return sendMsg(res, 'Invalid user object. There must at least be a valid name', 400)

      const user = {
         name: req.body.name,
         img: req.body?.img,
         description: req.body?.description
      }

      const data = await setById(User, req.user?.id, {}, user)
      if (!data) return sendMsg(res, 'Something went wrong. Please try again', 503)

      return sendMsg(res, 'Update successful!', 200)
   }
   catch (e) { }
})

export default router;