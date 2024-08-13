import { apiSlice } from '../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          user_email: payload.login,
          user_password: payload.password,
        },
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutQuery } = authApiSlice
