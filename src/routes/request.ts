import { Response, Request, Router } from "express"
import { isValidObjectId, ObjectId } from "mongoose"
import { checkImdbID, sendMsg, sendObj, UserReq } from "../composables"
import { exists, find, findOne, removeOne, updateOne } from "../composables/db"
import { verify, verifyAdmin } from "../controllers/auth"
import Film from "../models/Film"
import Movie from "../models/Movie"
import RequestModel from "../models/Request"
import { getFilm } from "./omdb"
const fetch = require('node-fetch')

// @TODO - Add API-rate-limiting here 

type Requested = {
   imdbID: string,
   Title: string,
   Type: 'movie' | 'series'
}

const extractPageNumber = (req: Request) => {
   let n = Number(req.query?.page)
   let m = n && Number.isFinite(n) && n >= 1 ? n - 1 : 0

   return m

}

const makeRequest = async (res: Response, imdbID: string) => {
   // @TODO-Make a call to the omDB API to generate the information
   const requested = await getFilm(imdbID)
   const newRequest = new RequestModel({
      imdbID: requested.imdbID,
      Title: requested.Title,
      votes: 1,
      Type: requested.Type
   })
   const data = await newRequest.save()

   return sendObj(res, data, 200)
}

const updateRequest = async (res: Response, imdbID: string) => {
   const data = await updateOne(
      RequestModel,
      { imdbID },
      { $inc: { votes: 1 } }
   )

   return sendMsg(res, data, 200)
}

const router = Router()

router.post('/:id', checkImdbID, verify, async (req: UserReq, res: Response) => {
   try {
      const valid = await exists(Movie, { imdbID: req.params.id })
      if (valid) return sendMsg(res, 'Movie is already present', 400)

      const isPresent = await exists(RequestModel, { imdbID: req.params.id })
      const chosenFunction = isPresent ? updateRequest : makeRequest

      await chosenFunction(res, req.params.id)

   }
   catch (e) { return sendMsg(res, String(e), 500) }


})



router.get('/', verifyAdmin, async (req: UserReq, res: Response) => {
   try {
      const pageNumber = extractPageNumber(req)
      const data = await find(
         RequestModel, {}, {}, {},
         { limit: 20, skip: Number(pageNumber * 20) ?? 0 }
      )
      const count = await RequestModel.count({})

      return sendObj(res, { data: data, count, page: pageNumber + 1 }, 200)
   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

router.get('/:id', checkImdbID, verify, async (req: UserReq, res: Response) => {
   try {
      const valid = await exists(Movie, { imdbID: req.params.id })
      if (valid) return sendMsg(res, 'Movie is already present', 400)

      const isPresent = await findOne(RequestModel, { imdbID: req.params.id })

      if (isValidObjectId(isPresent?._id)) {
         return sendObj(res, isPresent, 200)
      } else {
         // @TODO - Make a call to omdb API
         const x = await getFilm(req.params.id)
         return sendObj(res, x, 200)
      }



   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

router.delete('/:id', checkImdbID, verifyAdmin, async (req: UserReq, res: Response) => {
   try {
      const data = await removeOne(
         RequestModel,
         { imdbId: req.params.id },
      )
      if (!data) return sendMsg(res, 'Failed to delete', 400)
      return sendMsg(res, 'Deleted the request', 200)
   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

export default router