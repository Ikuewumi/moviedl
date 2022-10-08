// export const api = 'http://localhost:5000'
export const api = window.location.origin.startsWith('http://localhost:') ? 'http://localhost:5000' : window.location.origin

export async function getToken() {
   const x = localStorage.getItem('moviedl')
   if (x && typeof x === 'string' && x > '') return x
   Promise.reject('no token present')
}

export function setToken(token: string = '') {
   return localStorage.setItem('moviedl', token)
}

export const regexObject = {
   name: /^([a-zA-Z]+) ([a-zA-Z]+)$/,
   password: /^[\w\W]{6,}$/,
   email: /^([a-z\d\.]+)@([a-z\d\-]+)\.([a-z]{2,8})((\.)[a-z]{2,8})?$/,
   imdbId: /^tt[0-9]{6,12}$/,
   dbid: /^(\w\d){24}$/
}