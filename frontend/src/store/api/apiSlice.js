import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQueryAuth = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
      headers.set('Access-Control-Allow-Origin', 'Origin' )
    }

    return headers
  },
})

export const apiSlice = createApi({
  baseQuery: baseQueryAuth,
  endpoints: (builder) => ({}),
})
