import { Response, Router } from "express"
import mongoose, { isObjectIdOrHexString } from "mongoose"
import { createSelects, dbFields, regexObject, sendMsg, sendObj, UserReq, validateId } from "../composables"
import { exists, find, findOne } from "../composables/db"
import Film from "../models/Film"
import Movie from "../models/Movie"

const router = Router()

router.get('/movies/:id', async (req: UserReq, res: Response) => {
   try {
      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const data = await findOne(Movie, { imdbID: req.params.id, Type: 'movie' })

      if (!isObjectIdOrHexString(data._id)) {
         return sendMsg(res, 'Movie not found in database', 404)
      }

      return sendObj(res, data)



   }
   catch (e) {
      return sendMsg(res, e as string, 500)
   }
})

router.get('/series/:id', async (req: UserReq, res: Response) => {
   try {
      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const data = await findOne(Movie, { imdbID: req.params.id, Type: 'series' })

      if (!isObjectIdOrHexString(data._id)) {
         return sendMsg(res, 'Series not found in database', 404)
      }

      return sendObj(res, data)



   }
   catch (e) {
      return sendMsg(res, e as string, 500)
   }
})

router.get('/random', async (req: UserReq, res: Response) => {
   try {

      const array = [
         'Title', 'imdbID', 'imdbRating', 'Poster', 'Country', 'Plot', 'Writer', 'Runtime'
      ]
      const sortObject: RandomObject = getRandomObject(array)
      const selectObject: RandomObject = { Title: 1, Type: 1, imdbID: 1 }
      //@TODO - Replace this with a call to your own Movie collection
      const data = await find(Movie, {}, selectObject, sortObject, {
         limit: 5,
         skip: 1
      })

      return sendObj(res, { data }, 200)


   } catch (e) {
      return sendMsg(res, String(e), 500)
   }

})

router.get('/featured', async (req: UserReq, res: Response) => {
   try {
      const data: Array<{}> = await find(
         Movie, {},
         createSelects(dbFields.t_movie),
         { updatedAt: -1 },
         { limit: 5, skip: 0 }
      )

      if (!data.length) return sendMsg(res, 'Movied not found')

      return sendObj(res, data, 200)

   }
   catch (e) { return sendMsg(res, String(e), 500) }

})

type RandomObject = {
   [index: string]: 1 | -1
}


function getRandomNumber() {
   return (Math.random() > 0.5) ? 1 : -1
}

function getRandomObject(array: string[]) {
   const length = Math.random() * array.length
   const newArray = [...array.sort((a, b) => Math.random() - 0.5)[0]]

   const newObject: RandomObject = {}

   newArray.forEach(key => {
      newObject[key] = getRandomNumber()
   })

   return newObject
}

export default router