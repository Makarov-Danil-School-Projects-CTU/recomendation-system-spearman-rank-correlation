import { apiSlice } from '../api/apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      providesTags: (result, error, id) => {
        return [{ type: 'User', id: id }]
      },
      query: (userID) => ({
        url: `/user/${userID}`,
        method: 'GET',
      }),
    }),
    getPredictedMovieRating: builder.query({
      query: ({ userID, movieID }) => ({
        url: `/user/${userID}/prediction/${movieID}`,
        method: 'GET',
      }),
    }),
    getMovieReccomendations: builder.query({
      query: (userID) => ({
        url: `/user/${userID}/recommendations`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserByIdQuery, useGetPredictedMovieRatingQuery, useGetMovieReccomendationsQuery } = userApiSlice
