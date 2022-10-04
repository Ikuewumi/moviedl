export interface Links {
   movies: {
   }

   series: Array<Season>
}

export type Codec = '480p' | '540p' | '720p' | '1080p' | '2160p' | '4K' | 'other'
export type Id = 'episode' | 'special' | 'batch'
export interface Episode { number: number, type: string, links: string[], _open?: boolean }
export interface B { type: Codec, links: Array<string> }
export interface Base extends B { id?: Id }
export interface Episode_ extends Base { id: 'episode', number: number }
export interface Special_ extends Base { id: 'special' }
export interface Batch_ extends Base { id: 'batch' }
export interface Season { season: number, totalEpisodes?: number, links: Array<SeasonLinks> }
export type SeasonLinks = Episode_ | Special_ | Batch_
export type GenericLinks = SeasonLinks | Base

export const addLink = (array: Links["series"], object: Episode_, number: number) => {
   // Add link to a particular season
}
