import { Router, Application, Request, Response, NextFunction } from "express";
import { CustomHandler, sendMsg, sendObj, sendCode, UserReq, validateId } from "../composables";
import { findOne } from "../composables/db";
import Movie from "../models/Movie";

const router = Router();

router.get('/movie/:id', async (req: UserReq, res: Response) => {
   // @TODO - Replace this code with actual calls to the omDB restAPI

   try {
      if (!req.params.id) {
         return sendMsg(res, 'No imdbID present', 400)
      }

      const x = await findOne(Movie, {
         imdbID: req.params.id,
         type: 'movie'
      })

      if (validateId(x?.id)) {
         return sendMsg(res, 'Movie not found', 404)
      }

      return sendObj(res, x!)

   } catch (e) {
      return sendMsg(res, 'Something went wrong', 503)
   }

})



router.get('/series/:id', async (req: UserReq, res: Response) => {
   // @TODO - Replace this code with actual calls to the omDB restAPI

   try {
      if (!req.params.id) {
         return sendMsg(res, 'No imdbID present', 400)
      }

      const x = await findOne(Movie, {
         imdbID: req.params.id,
         type: 'series'
      })

      if (validateId(x?.id)) {
         return sendMsg(res, 'Series not found', 404)
      }

      return sendObj(res, x!)

   } catch (e) {
      return sendMsg(res, 'Something went wrong', 503)
   }

})

export default router
