import { Router, Application, Request, Response, NextFunction } from "express";
import { CustomHandler, sendMsg, sendObj, sendCode, UserReq, validateId, regexObject, CustomMovie, limitAPIRateFn } from "../composables";
import { findOne } from "../composables/db";
const fetch = require('node-fetch')
import { checkImdbID, vAdmin } from "../composables";
import { verify, verifyAdmin } from "../controllers/auth";

//@TODO-add api-rate-limiting here 
const limit = limitAPIRateFn(20)
const router = Router();

const getAllSeasons = async (imdbID: string, totalSeasons: number | string) => {
   const s = Number(totalSeasons)
   const id = String(imdbID)
   const promiseArray = []

   for (let i = 1; i <= s; i++) {
      const request = (await fetch(createApiLink(`?i=${imdbID}&Season=${i}`))).json()

      promiseArray.push(request)
   }

   const resultArray = await Promise.all(promiseArray)

   return resultArray

}

function createApiLink(endpoint: string): string {
   const link = `${process.env.API_URL}${endpoint}&apikey=${process.env.API_KEY}`
   return link
}

function checkForErrors(data: { Response: string, imdbID: string, Title: string, [index: string]: any }) {
   const valid = checkString(data.Title) && checkString(data.imdbID) && checkString(data.Response) && data.Response === 'True' && regexObject.imdbId.test(data.imdbID)

   console.log(data, valid)

   if (!valid) throw Error('Could not find movie in database')

   return true
}
function checkResponse(res: { ok: boolean, [index: string]: any }) {
   // console.log(res)
}

export async function getSeries(imdbID: string) {
   const response = await fetch(createApiLink(`?i=${imdbID}&type=series`))
   checkResponse(response)
   const data = await response.json()

   checkForErrors(data)
   return data as CustomMovie
}

export async function getMovie(imdbID: string) {
   const response = await fetch(createApiLink(`?i=${imdbID}&type=movie`))
   checkResponse(response)
   const data = await response.json()

   checkForErrors(data)
   return data as CustomMovie
}

export async function getFilm(imdbID: string) {
   const response = await fetch(createApiLink(`?i=${imdbID}`))
   checkResponse(response)
   const data = await response.json()

   checkForErrors(data)
   return data as CustomMovie
}

type Season = {
   Title: string
   Season: string | number
   totalSeasons: string | number
   Episodes: Episode[]
}

type Episode = {
   Title: string
   Released: string,
   Episode: string | number,
   imdbRating: string | number,
   imdbID: string
}

type SeasonLinks = {
   season: number
   totalEpisodes: number
   links: Array<any>
}

function checkString(x: any): boolean {
   const valid = x && String(x) && String(x).trim() > ''
   return Boolean(valid)
}

function checkNumber(x: any): boolean {
   const valid = x && Number(x)
   return Boolean(valid)
}
router.use(verify)
router.use(vAdmin)
router.use(limit)


router.get('/seasons/:id', checkImdbID, async (req: UserReq, res: Response) => {
   try {
      const a = await getAllSeasons(req.params.id, Number(req.query.num) ?? 1)
      return sendObj(res, a, 200)
   }
   catch (e) { return sendMsg(res, 'Something went wrong', 500) }
})


router.get('/movies/:id', checkImdbID, async (req: UserReq, res: Response) => {
   // @TODO - Replace this code with actual calls to the omDB restAPI

   try {
      let x = await getMovie(req.params.id)
      return sendObj(res, {
         ...x,
         MovieLinks: [],
         SeriesLinks: []
      })

   }
   catch (e) { return sendMsg(res, 'Something went wrong', 503) }

})



router.get('/series/:id', checkImdbID, async (req: UserReq, res: Response) => {
   // @TODO - Replace this code with actual calls to the omDB restAPI

   try {
      const obj = await getProcessedSeries(req.params.id, res)
      return sendObj(res, obj)
   }
   catch (e) { return sendMsg(res, 'Something went wrong', 503) }

})

export async function getProcessedSeries(id: string, res: Response) {
   let x = await getSeries(id)
   const response = await fetch(`${process.env.SERVER_URL}/api/omdb/seasons/${id}?num=${Number(x.totalSeasons)}`)
   if (!(response.status === 200)) return sendMsg(res, 'Something went wrong', 404)
   const seasons: Season[] = await response.json()
   if (!seasons?.length) { return sendMsg(res, 'Series has a problem', 404) }
   const seriesLinks: SeasonLinks[] = []
   seasons.forEach(season => {
      const valid = checkString(season?.Title)
      if (!valid) return

      const ascEpisodes = season.Episodes.sort((a, b) => Number(a.Episode) - Number(b.Episode))

      const totalEpisodes = Number(ascEpisodes[ascEpisodes.length - 1].Episode)


      const obj: SeasonLinks = {
         season: Number(season.Season),
         totalEpisodes,
         links: []
      }

      seriesLinks.push(obj)

   })

   seriesLinks.sort((a, b) => a.season - b.season)
   return ({
      ...x,
      SeriesLinks: seriesLinks,
      MovieLinks: []
   })
}

export default router
