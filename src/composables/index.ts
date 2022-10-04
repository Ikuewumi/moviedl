import mongoose, { Model, ObjectId } from "mongoose";
import { Response, Request, NextFunction, Handler } from "express";

export const formatArr = (str: string) => {
   const array = str.split(',').map(item => item.trim())
   return array
}

export interface CustomMovie {
   imdbID: string,
   imdbRating: number,
   Title: string,
   Type: string,
   Year: string,
   Poster: string,
   Actors: string,
   Writer: string,
   Country: string,
   Genre: string,
   Plot: string,
   Released: string,
   Language: string,
   Director?: string | undefined,
   Awards?: string | undefined,
   dvd?: string | undefined,
   totalSeasons?: number | undefined,
   SeriesLinks?: Season[],
   MovieLinks?: Season[],
   _id?: ObjectId
}

export interface UserReq extends Request {
   token?: string;
   user?: {
      email: string,
      id: string
   }
   userDoc?: {
      _id: ObjectId
      name: string
      email: string
      admin?: boolean
   }
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
   imdbId: /^tt[0-9]{6,12}$/
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
   let obj: {
      [index: string]: 1 | -1
   } = {}
   const fn = (a: string) => { obj[a] = 1 }
   terms.forEach(fn)
   return obj
}

export interface Movie_ { img?: string, links: B[] }
export interface Series { img?: string, links: Season[] }
export interface Season { season: number, totalEpisodes: number, links: SeasonLinks[] }
export interface Episode_ extends Base { id: 'episode', number: number }
export interface Special_ extends Base { id: 'special' }
export interface Batch_ extends Base { id: 'batch' }
export interface B { type: Codec, links: Array<string> }
export interface Base extends B { id?: Id }
export type Id = 'episode' | 'special' | 'batch'
export type Codec = '480p' | '540p' | '720p' | '1080p' | '2160p' | '4K' | 'other'
export type SeasonLinks = Episode_ | Special_ | Batch_



export const dbFields = {
   user: ['name', 'email', 'admin', 'img', 'description', 'requests'],
   t_user: ['name', 'email', 'admin'],
   t_movie: ['Title', 'Year', 'Plot', 'Genre', 'Actors', 'Type', 'imdbID', 'imdbRating', 'Poster']
}

export const r = (t: String | Array<string | object> | Object | Number) => {
   return {
      type: t,
      required: true
   }
}

export const checkImdbID: Handler = (req: UserReq, res: Response, next: NextFunction) => {
   const valid = regexObject.imdbId.test(req.params?.id)

   if (!valid) return sendMsg(res, 'Invalid imdbID!', 400)

   next()
}
