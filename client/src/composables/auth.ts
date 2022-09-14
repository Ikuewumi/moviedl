import { api, getToken } from "./env"

interface _Header {
   'method': 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
   'body'?: string,
   'headers': {
      'Content-type'?: 'application/json',
      'Authorization'?: string
   }
}
export async function apiGet(endpoint: string = '', auth: boolean = false) {
   const headers: _Header = {
      method: 'GET',
      headers: {}
   }

   if (auth) {
      const token = await getToken()
      headers.headers!.Authorization = `Bearer ${token}`
      console.log('1')
   }
   console.log('2')

   const res: Response = await fetch(`${api}/api/${endpoint}`, headers as RequestInit)
   console.log('works', res)
   const json = await res.json()
   if (!res.ok) return Promise.reject(json?.msg)
   return json
}

export async function apiPost(endpoint: string = '', payload: object = {}, auth = true) {
   const headers: _Header = {
      method: 'POST',
      headers: {
         'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
   }

   if (auth) {
      const token = await getToken()
      headers.headers!.Authorization = `Bearer ${token}`
   }

   const res: Response = await fetch(`${api}/api/${endpoint}`, headers as RequestInit)

   console.log(res)

   const json = await res.json()
   if (!res.ok) return Promise.reject(json?.msg)
   return json

}

export async function apiPatch(endpoint: string = '', payload: object = {}) {
   const token = await getToken()
   const headers: _Header = {
      method: 'PATCH',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
   }

   const res: Response = await fetch(`${api}/api/${endpoint}`, headers as RequestInit)
   const json = await res.json()
   if (!res.ok) return Promise.reject(json?.msg)
   return json
}

export async function apiDelete(endpoint: string = '', payload: object = {}) {
   const token = await getToken()
   const headers: _Header = {
      method: 'DELETE',
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
   }

   const res: Response = await fetch(`${api}/api/${endpoint}`, headers as RequestInit)
   const json = await res.json()
   if (!res.ok) return Promise.reject(json?.msg)
   return json

}