import { apiSlice } from '../api/apiSlice'

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMovies: builder.query({
      providesTags: (result, error, userId) => {
        const tags = result.map((movie) => {
          return { type: 'Movie', id: movie.id }
        })
        tags.push({ type: 'User', id: userId })
        return tags
      },
      query: () => ({
        url: `/movies`,
        method: 'GET',
      }),
    }),
    fetchMovie: builder.query({
      providesTags: (result, error, id) => {
        return [{ type: 'Movie', id }]
      },
      query: (movieID) => ({
        url: `/movies/movie/${movieID}`,
        method: 'GET',
      }),
    }),
    addMovieComment: builder.mutation({
      invalidatesTags: (result, error, movie) => {
        return [{ type: 'Movie', id: parseInt(movie.movie_id) }]
      },
      query: ({ user_id, user_comment, movie_id }) => ({
        url: `/movies/movie/${movie_id}/comment`,
        method: 'PUT',
        body: { user_id, user_comment },
      }),
    }),
    addMovieRate: builder.mutation({
      invalidatesTags: (result, error, movie) => {
        return [
          { type: 'User', id: movie.user_id },
          { type: 'Movie', id: parseInt(movie.movie_id) },
        ]
      },
      query: ({ user_id, user_rating, movie_id }) => ({
        url: `/movies/movie/${movie_id}/rate`,
        method: 'PUT',
        body: { user_id, user_rating },
      }),
    }),
    sortMovies: builder.query({
      query: (params) => ({
        url: '/movies/sort',
        method: 'GET',
        params: {
          ...params,
        },
      }),
    }),
  }),
})

export const {
  useFetchMoviesQuery,
  useFetchMovieQuery,
  useAddMovieCommentMutation,
  useAddMovieRateMutation,
  useSortMoviesQuery,
} = movieApiSlice
