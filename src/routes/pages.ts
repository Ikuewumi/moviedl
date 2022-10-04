import { Response, Router, Request } from 'express'
import { createSelects, dbFields, sendMsg, sendObj, UserReq } from '../composables'
import { find } from '../composables/db'
import Movie from '../models/Movie'

const router = Router()

const extractPageNumber = (req: Request) => {
   let n = Number(req.query?.page)
   let m = n && Number.isFinite(n) && n >= 1 ? n - 1 : 0

   return m

}

// SEARCH FUNCTIONALITY
router.get('/search/:title', async (req: UserReq, res: Response) => {
   try {
      if (!req.params?.title) return sendMsg(res, 'Any search must have term', 400)

      const pageNum = extractPageNumber(req)
      const regex = { Title: { $regex: new RegExp(req.params.title, 'i') } }
      const more = { limit: 20, skip: Number(pageNum * 20) ?? 0 }

      const data = await find(Movie, regex, createSelects(dbFields.t_movie), {}, more)
      const count = await Movie.count(regex)

      return sendObj(res, { data: data, count, page: pageNum + 1 })
   }
   catch (e) { return sendMsg(res, String(e), 500) }
})

router.get('/index/:type', async (req: UserReq, res: Response) => {
   try {
      const pageNum = extractPageNumber(req)
      const extractType = (x: string = '') => {
         let result: 'movie' | 'series' = 'movie'

         switch (x) {
            case 'series':
            case 's':
               result = 'series'
               break;
            default:
               result = 'movie'
               break;
         }

         return result
      }

      const type = extractType(req.params.type)

      const field = { Type: type }
      const sort = { Title: 1 }
      const more = { limit: 200, skip: Number(pageNum * 200) ?? 0 }

      const data = await find(Movie, field, createSelects(dbFields.t_movie), sort, more)
      const count = await Movie.count(field)

      return sendObj(res, { data: data, count, page: pageNum + 1 })

   }
   catch (e) { return sendMsg(res, String(e), 500) }

})

router.get('/home', async (req: UserReq, res: Response) => {
   try {
      const pageNum = extractPageNumber(req)

      const field = {}
      const sort = { updatedBy: -1 }
      const more = { limit: 20, skip: Number(pageNum * 20) ?? 0 }

      const data = await find(Movie, field, createSelects(dbFields.t_movie), sort, more)
      const count = await Movie.count(field)

      return sendObj(res, { data: data, count, page: pageNum + 1 })

   }
   catch (e) { return sendMsg(res, String(e), 500) }

})




export default router