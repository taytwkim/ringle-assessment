import { createSlice } from '@reduxjs/toolkit'

const userInitialState = require("../UserInfo.json");

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    increment20: (state) => {
      state.numLessons20 += 1
    },
    decrement20: (state) => {
      state.numLessons20 -= 1
    },
    increment40: (state) => {
      state.numLessons40 += 1
    },
    decrement40: (state) => {
      state.numLessons40 -= 1
    },
    addReserved: (state, action) => {
      state.reservedLessons.append(action.payload)
    },
    deleteReserved: (state, action) => {
      
    }
  },
})

export const { increment20, decrement20, increment40, decrement40, addReserved, deleteReserved } = userSlice.actions

export default userSlice.reducer