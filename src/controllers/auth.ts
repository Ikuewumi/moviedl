import { Handler, NextFunction, Request, Response } from "express";
import { checkUser, checkUserFormat, createSelects, dbFields, oid, sendMsg, UserReq } from "../composables";
import { exists, findById, findOne } from "../composables/db";
import User from "../models/User";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const createUser: Handler = async (req: Request, res: Response) => {
   try {
      if (!checkUserFormat(req.body)) {
         return res.status(400).json({
            msg: "Bad format! Name, Email or Password invalid",
         });
      }

      const x = await exists(User, { email: req.body.email });

      if (x)
         return sendMsg(
            res,
            "A User that has the same name or email is already present"
         );
      const password = await bcrypt.hash(req.body.password, 15);

      const data = new User({
         name: req.body.name,
         email: req.body.email,
         password,
         requests: []
      });

      await data.save();

      res.json({
         msg: `${req.body.email} was signed up`,
      });
   } catch (e) {
      return sendMsg(res, 'Something went wrong in auth. Please try again later', 503)
   }
};

export const login: Handler = async (
   req: UserReq,
   res: Response,
   next: NextFunction
) => {
   try {

      if (!checkUser(req.body)) return sendMsg(res, "Name or email invalid");

      const user = await findOne(User, { email: req.body.email });
      if (!user?._id) return sendMsg(res, "Could not find user");

      const pass = await bcrypt.compare(req.body.password, user.password);
      if (!pass) return sendMsg(res, "Email or Password invalid", 403);

      const data = { email: user.email, id: user.id };
      jwt.sign(data, process.env.SECRET_KEY, (err: any, authData: any) => {
         if (err)
            return sendMsg(res, "Something went wrong. Please try again", 500);
         req.token = authData;
         next();
      });
   } catch (e) {
      return sendMsg(res, 'Something went wrong in auth. Please try again later', 503)
   }
};



export const verify: Handler = (
   req: UserReq,
   res: Response,
   next: NextFunction
) => {
   try {
      const isPresent =
         req.headers['authorization'] &&
         req.headers['authorization'] > 'Bearer ' &&
         req.headers['authorization'].split(' ')[1] > ''

      if (!isPresent) return sendMsg(res, 'The token is invalid', 401)

      const token = req.headers['authorization']!.split(' ')[1]
      jwt.verify(
         token, process.env.SECRET_KEY, async (err: any, data: { email: string, id: string }) => {
            if (err) return sendMsg(res, 'Forbidden', 403)

            const isValid = await findById(User, data.id, {}, createSelects(dbFields.t_user))
            if (!isValid?._id) return sendMsg(res, 'Forbidden', 403)

            req.user = data
            req.userDoc = isValid
            next()
         }
      )

   }
   catch (e) {
      return sendMsg(res, 'Something went wrong in auth. Please try again later', 503)
   }
}

export const verifyAdmin: Handler = (
   req: UserReq,
   res: Response,
   next: NextFunction
) => {
   try {
      const isPresent =
         req.headers['authorization'] &&
         req.headers['authorization'] > 'Bearer ' &&
         req.headers['authorization'].split(' ')[1] > ''

      console.log(isPresent, req.headers['authorization'], req.headers)

      if (!isPresent) return sendMsg(res, 'The token is invalid', 401)

      const token = req.headers['authorization']!.split(' ')[1]
      jwt.verify(
         token, process.env.SECRET_KEY, async (err: any, data: { email: string, id: string }) => {
            if (err) return sendMsg(res, 'Forbidden', 403)

            const isValid = await findById(User, data.id, { admin: true }, createSelects(dbFields.t_user))
            if (!isValid?._id) return sendMsg(res, 'Forbidden', 403)

            req.user = data
            req.userDoc = isValid
            next()
         }
      )

   }
   catch (e) {
      return sendMsg(res, 'Something went wrong in auth. Please try again later', 503)
   }
}
