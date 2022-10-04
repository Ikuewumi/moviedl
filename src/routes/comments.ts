import { Router, Response } from "express"
import { isValidObjectId } from "mongoose"
import { regexObject, sendMsg, sendObj, UserReq } from "../composables"
import { exists, find, updateOne } from "../composables/db"
import { verify } from "../controllers/auth"
import CommentModel from '../models/Comments'
import Movie from "../models/Movie"

const router = Router()

type Comment_ = {
   content: string
}

interface NextComment_ extends Comment_ {
   aid: string
}

function isValidComment(comment: Comment_) {
   const valid = typeof comment.content === 'string'
   return valid
}

function isValidNextComment(comment: NextComment_) {
   const valid = typeof comment.content === 'string' && typeof comment.aid === 'string'
   return valid
}

router.post('/:id', verify, async (req: UserReq, res: Response) => {
   try {
      const valid = isValidComment(req.body) && regexObject.imdbId.test(req.params.id)
      const x = await exists(Movie, { imdbID: req.params.id })
      if (!(valid && x)) { return sendMsg(res, 'Invalid data', 400) }

      const newComment = new CommentModel({
         aid: String(req.userDoc?._id),
         name: req.userDoc?.name,
         admin: req.userDoc?.admin ?? false,
         timestamp: Date.now(),
         imdbID: req.params.id,
         content: req.body.content,
         comments: []
      })

      const data = await newComment.save()

      return sendObj(res, data)

   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

router.get('/:id', async (req: UserReq, res: Response) => {
   try {
      const data = await find(
         CommentModel,
         { imdbID: req.params.id }, {},
         { timestamp: -1 },
         { limit: 2000, skip: 0 }
      )
      return sendObj(res, data)

   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

router.patch('/:id', verify, async (req: UserReq, res: Response) => {
   try {
      const valid = isValidComment(req.body) && isValidObjectId(req.params.id)
      if (!valid) { return sendMsg(res, 'Invalid data', 400) }

      const y = await exists(CommentModel, { id: req.params.id })
      if (!y) { return sendMsg(res, 'Parent Comment dosen\'t exist', 400) }

      const comment_ = {
         aid: String(req.userDoc?._id),
         name: req.userDoc?.name,
         admin: req.userDoc?.admin ?? false,
         timestamp: Date.now(),
         content: req.body.content
      }

      const data = await updateOne(
         CommentModel,
         { _id: req.params.id },
         { $push: { comments: comment_ } }
      )

      return sendMsg(res, data, 200)
   }
   catch (e) { return sendMsg(res, String(e), 500) }
})


export default router