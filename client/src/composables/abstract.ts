import { regexObject } from "./env"

export function map<Input, Output>(
   arr: Input[],
   func: (arg?: Input, currentIndex?: number, array?: Input[]) => Output
) {
   return arr.map(func)
}

export function filter<Input, Output>(
   arr: Input[],
   func: (arg?: Input, currentIndex?: number, array?: Input[]) => Output
) {
   return arr.filter(func)
}

export function find<Input, Output>(
   arr: Input[],
   func: (arg?: Input, currentIndex?: number, array?: Input[]) => Output
) {
   return arr.find(func)
}

export function reduce<Input, Output>(
   arr: Input[],
   func: (previousValue?: Input, currentValue?: Input, currentIndex?: number, array?: Input[]) => Input
) {
   return arr.reduce(func)
}

export async function validateId(id: string = '') {
   const isValid =
      typeof id === 'string' &&
      id?.length === 24

   if (isValid) return id
   Promise.reject('Invalid Id')
}

export function vId(id: string = '') {
   const isValid =
      typeof id === 'string' &&
      id?.length === 24 &&
      regexObject.dbid.test(id)

   return isValid
} 