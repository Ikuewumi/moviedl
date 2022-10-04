import { computed, ref } from "@vue/reactivity"
import type { Ref } from "vue"
import { regexObject } from "./env"

export const sleep = async (ms: number) => {
   setTimeout(() => Promise.resolve(), ms)
}

// export xonst