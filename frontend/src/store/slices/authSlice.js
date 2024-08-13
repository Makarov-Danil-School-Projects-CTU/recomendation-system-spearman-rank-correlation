import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        ratings: action.payload.ratings,
      }
      state.accessToken = action.payload.access_token
    },
    logout: (state, action) => {
      state.user = null
      state.accessToken = null
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
})

export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectActualUser = state => state.auth.user
export const selectAccessToken = state => state.auth.accessToken