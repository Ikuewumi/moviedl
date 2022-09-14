import mongoose, { Model } from "mongoose";
import { Response, Request, NextFunction } from "express";

export interface UserReq extends Request {
   token?: string;
   user?: {
      email: string,
      id: string
   }
   userDoc?: object
}

export interface CustomHandler {
   req: UserReq | Request;
   res: Response;
   next?: NextFunction;
}

export const regexObject = {
   name: /^([a-zA-Z]+) ([a-zA-Z]+)$/,
   password: /^[\w\W]{6,}$/,
   email: /^([a-z\d\.]+)@([a-z\d\-]+)\.([a-z]{2,8})((\.)[a-z]{2,8})?$/,
};

export function validateId(id: string) {
   return mongoose.Types.ObjectId.isValid(id);
}

export function oid(id: string) {
   return new mongoose.Types.ObjectId(id);
}

export function checkUserFormat({
   name,
   email,
   password,
}: {
   name: string;
   email: string;
   password: string;
}) {
   const valid =
      typeof name === "string" &&
      typeof password === "string" &&
      typeof email === "string" &&
      name.length > 0 &&
      password.length >= 6 &&
      email.length > 0 &&
      regexObject.name.test(name) &&
      regexObject.email.test(email) &&
      regexObject.password.test(password);

   return valid;
}

export function checkUser({
   email,
   password,
}: {
   email: string;
   password: string;
}) {
   const valid =
      typeof password === "string" &&
      typeof email === "string" &&
      password.length >= 6 &&
      email.length > 0 &&
      regexObject.email.test(email) &&
      regexObject.password.test(password);

   return valid;
}

export function sendMsg(
   res: Response,
   msg: string = "",
   status: number = 400
) {
   return res.status(status).json({ msg });
}

export function sendObj(
   res: Response,
   msg: {},
   status: number = 200
) {
   return res.status(status).json(msg);
}

export function sendCode(
   res: Response,
   status: number = 200
) {
   return res.sendStatus(status)
}

export function createSelects(terms: string[]): object {
   let obj: any = {}
   const fn = (a: string) => { obj[a] = 1 }
   terms.forEach(fn)
   return obj
}




export const dbFields = {
   user: ['name', 'email', 'admin', 'img', 'description', 'requests'],
   t_user: ['name', 'email', 'admin']
}

export const r = (t: String | Array<string | object> | Object | Number) => {
   return {
      type: t,
      required: true
   }
}
