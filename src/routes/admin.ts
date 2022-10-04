import express, { Router, Application, Request, Response, NextFunction } from "express";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import { B, Codec, CustomHandler, CustomMovie, formatArr, Id, regexObject, Season, sendCode, sendMsg, sendObj, Series, UserReq, validateId, Movie_, checkImdbID } from "../composables";
import { exists, findOne, updateOne } from "../composables/db";
import Movie from "../models/Movie";
import { getMovie } from "./omdb";

const fetch = require("node-fetch")

const router = Router();

const isValidMovieRequest = (object: Movie_) => {
   if (!(object?.links && Array.isArray(object.links))) {
      return false
   }

   const x = object?.links.reduce((acc, current) => {
      const valid = (
         current?.type && current?.links &&
         typeof current.type === 'string' &&
         Array.isArray(current.links)
      ) as boolean
      return acc && valid
   }, true)

   if (!x) return false

   const mapped = object.links.map(link => {
      return {
         type: link.type,
         links: link.links
      }
   })

   const processed: Movie_ = {
      links: mapped
   }

   if (object.img) processed.img = object.img



   return processed
}

const isValidSeriesRequest = (object: Series) => {
   if (!(object?.links && Array.isArray(object.links))) {
      return false
   }

   let x: boolean = object?.links.reduce((acc, current) => {
      const valid = (
         Number(current?.season) && current?.links &&
         Array.isArray(current.links)
      ) as boolean
      return acc && valid
   }, true)

   const ids: Id[] = ['batch', 'special', 'episode']
   const types: Codec[] = ['480p', '540p', '720p', '1080p', '2160p', '4K', 'other']

   object.links.forEach((season: Season) => {
      const y = season.links.reduce((acc, current) => {
         const valid = (
            ids.includes(current.id) &&
            types.includes(current.type) &&
            Array.isArray(current.links) &&
            current.links.reduce((acc, current) => acc && typeof current === 'string', true)
         ) as boolean

         return acc && valid
      }, true)

      x = x && y
   })


   if (!x) return false



   const mapped = object.links.map(link => {
      return {
         season: link.season,
         totalEpisodes: link.totalEpisodes,
         links: link.links
      }
   })

   const processed: Series = {
      links: mapped
   }

   if (object.img) processed.img = object.img



   return processed
}

function placeSeriesObjects(db: Season[], user: Season[]) {
   // Copying database object
   const db_ = [...db]

   db_.forEach(season => {
      const u = user.find((season_) => season.season === season_.season)

      if (u) {
         season.links = u.links
      }
   })

   return db_

}

function updateEpisodeCount(db: Season[] = [], user: Season[] = []) {
   const starterDb = [...db]
   let starterUser = [...user]

   const addedSeasons = starterDb.filter(db => {
      const index = user.findIndex(u => u.season === db.season)
      return Boolean(index === -1)
   })

   starterUser = [...starterUser, ...addedSeasons]

   starterDb.forEach(db => {
      const index = starterUser.findIndex(user => user.season === db.season)

      if (index !== -1) {
         starterUser[index] = {
            ...starterUser[index],
            totalEpisodes: db.totalEpisodes
         }

      }
   })

   starterUser = starterUser.sort((a, b) => a.season - b.season)

   return starterUser


}

// @TODO - Add admin verify middleware for prod.
router.post('/movies/:id', checkImdbID, async (req: UserReq, res: Response) => {

   try {


      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const body = isValidMovieRequest(req.body as Movie_)

      if (!body) {
         return sendMsg(res, 'Invalid parameters', 400)
      }

      // @TODO - Add calls to the actual omDB API
      const response = await fetch(`${process.env.SERVER_URL}/api/omdb/movies/${req.params.id}`)
      if (!response.ok) return sendMsg(res, 'Could not find movie', 404)
      const data = await response.json() as CustomMovie

      const data_ = new Movie({
         ...data,
         Type: 'movie',
         Actors: formatArr(data.Actors),
         Genre: formatArr(data.Genre),
         Writer: formatArr(data.Writer),
         Language: formatArr(data.Language),
         Country: formatArr(data.Country),
         imdbRating: Number(data.imdbRating),
         MovieLinks: body.links
      })

      if (body.img) data_.Poster = body.img
      const x = await data_.save()
      return sendObj(res, x)

   } catch (e) {

      return sendMsg(res, e as string, 503)
   }

})

router.post('/series/:id', checkImdbID, async (req: UserReq, res: Response) => {

   try {


      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const body = isValidSeriesRequest(req.body as Series)

      if (!body) {
         return sendMsg(res, 'Invalid parameters', 400)
      }

      // @TODO - Add calls to the actual omDB API
      const response = await fetch(`${process.env.SERVER_URL}/api/omdb/series/${req.params.id}`)
      if (!response.ok) return sendMsg(res, 'Could not find movie', 404)
      const data = await response.json() as CustomMovie

      const data_ = new Movie({
         ...data,
         Type: 'series',
         Actors: formatArr(data.Actors),
         Genre: formatArr(data.Genre),
         Writer: formatArr(data.Writer),
         Language: formatArr(data.Language),
         Country: formatArr(data.Country),
         imdbRating: Number(data.imdbRating),
         SeriesLinks: placeSeriesObjects(data?.SeriesLinks!, body.links)
      })

      if (body.img) data_.Poster = body.img
      const x = await data_.save()
      return sendObj(res, x)

   } catch (e) {

      return sendMsg(res, e as string, 503)
   }

})

router.patch('/movies/:id', checkImdbID, async (req: UserReq, res: Response) => {

   try {


      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const body = isValidMovieRequest(req.body as Movie_)

      if (!body) {
         return sendMsg(res, 'Invalid parameters', 400)
      }

      const data_: {
         MovieLinks: B[],
         Poster?: string
      } = {
         MovieLinks: body.links
      }

      if (body.img) data_.Poster = body.img
      const x = await updateOne(
         Movie,
         { imdbID: req.params.id, Type: 'movie' },
         { $set: data_ }
      )
      return sendObj(res, x)

   } catch (e) {

      return sendMsg(res, e as string, 503)
   }

})

router.patch('/series/:id', checkImdbID, async (req: UserReq, res: Response) => {

   try {


      if (!regexObject.imdbId.test(req.params.id)) {
         return sendMsg(res, 'Invalid imdB id', 400)
      }

      const body = isValidSeriesRequest(req.body as Series)

      if (!body) {
         return sendMsg(res, 'Invalid parameters', 400)
      }

      // @TODO - Add calls to the actual omDB API
      const response = await findOne(Movie, {
         imdbID: req.params.id,
         Type: 'series'
      })

      if (!isObjectIdOrHexString(response?._id)) return sendMsg(res, 'Series not in Database', 404)

      const data_: {
         SeriesLinks: Season[],
         Poster?: string
      } = {
         SeriesLinks: placeSeriesObjects(response?.SeriesLinks!, body.links)
      }

      if (body.img) data_.Poster = body.img
      const x = await updateOne(
         Movie,
         { imdbID: req.params.id, Type: 'series' },
         { $set: data_ }
      )
      return sendObj(res, x)

   } catch (e) {

      return sendMsg(res, e as string, 503)
   }

})

router.get('/movies/:id', checkImdbID, async (req: UserReq, res: Response) => {
   try {
      const obj = { imdbID: req.params.id, Type: 'movie' }
      const data = await findOne(Movie, obj)
      if (!isValidObjectId(data?._id)) return sendMsg(res, 'Could not find resource', 404)
      // @TODO - Call the omdbAPI movie
      const payload = await getMovie(req.params.id)
      const data_ = { imdbRating: Number(payload.imdbRating), Plot: payload.Plot }
      const update = await updateOne(Movie, obj, { $set: data_ })
      if (!update) return sendMsg(res, 'Cannot edit at the moment. Please try again later', 404)
      const result = await findOne(Movie, obj)
      if (!isValidObjectId(result?._id)) return sendMsg(res, 'Could not find resource', 404)
      return sendObj(res, result._doc, 200)

   }
   catch (e) { return sendMsg(res, 'Something went wrong', 500) }
})

router.get('/series/:id', checkImdbID, async (req: UserReq, res: Response) => {
   try {
      const obj = { imdbID: req.params.id, Type: 'series' }

      // @TODO - Call the omdbAPI movie
      const data: any = await findOne(Movie, obj)
      if (!isValidObjectId(data?._id)) return sendMsg(res, 'Could not find resource', 404)
      const response = await fetch(`${process.env.SERVER_URL}/api/omdb/series/${req.params.id}`)
      if (!response.ok) throw Error('somthing went wrong')
      const payload: CustomMovie = await response.json()
      const data_ = {
         SeriesLinks: updateEpisodeCount(payload.SeriesLinks, data._doc.SeriesLinks),
         imdbRating: Number(payload.imdbRating),
         Plot: payload.Plot
      }
      const update = await updateOne(Movie, obj, { $set: data_ })
      if (!update) return sendMsg(res, 'Cannot edit at the moment. Please try again later', 404)
      const result = await findOne(Movie, obj)
      return sendObj(res, result, 200)


   }
   catch (e) { return sendMsg(res, 'Something went wrong', 500) }
})


export default router