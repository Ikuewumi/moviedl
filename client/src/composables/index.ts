import { regexObject } from "./env"

export const sleep = async (ms: number) => {
   setTimeout(() => Promise.resolve(), ms)
}