import type { B, Base, Season } from "./series"

export interface Rating {
   Source: string,
   Value: string
}

export interface BaseFilm<T> {
   _id: string
   imdbID: string,
   Title: string,
   Plot: string,
   Poster: string,
   Runtime: string
   imdbRating: number | string
   Type: 'movie' | 'series',
   Year: string,
   Director: string
   Ratings: Rating[]
   Genre: T
   Actors: T
   Country: T
   Writer: T,
   createdAt: string
   updatedAt: string
}

export interface Series<T> extends BaseFilm<T> {
   Type: 'series'
   totalSeasons: number,
   SeriesLinks: Array<Season>
}


export interface Movie<T> extends BaseFilm<T> {
   Type: 'movie'
   MovieLinks: Array<Base>
}

export type OptionsBase = {
   type: 'movie' | 'series'
}

export interface MovieOptions extends OptionsBase {
   type: 'movie'
   index?: number
   imdbID?: string
}

export interface SeriesOptions extends OptionsBase {
   type: 'series'
   seasonNumber: number,
   index?: number
   imdbID?: string
}

export type HybridOptions = MovieOptions | SeriesOptions

export type iPinia = {
   toast: {
      show: Function,
      close: Function,
   },

   load: {
      start: Function,
      close: Function
   }
}

export const linkBlueprints: B[] = [{
   type: '480p',
   links: []
},
{
   type: '720p',
   links: []
},
{
   type: '1080p',
   links: []
},
{
   type: '480p',
   links: []
},
{
   type: '2160p',
   links: []
},
{
   type: '4K',
   links: []
},
{
   type: '540p',
   links: []
},
{
   type: 'other',
   links: []
}]

export type iTitle = Function