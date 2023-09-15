import { createSlice } from '@reduxjs/toolkit'

const userInitialState = require("../UserInfo.json");
console.log(userInitialState.num_lessons_20)

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    increment20: (state) => {
      state.num_20_lessons += 1
    },
    decrement20: (state) => {
      state.num_20_lessons -= 1
    },
    increment40: (state) => {
      state.num_40_lessons += 1
    },
    decrement40: (state) => {
      state.num_40_lessons -= 1
    },
  },
})

export const { increment20, decrement20, increment40, decrement40 } = userSlice.actions

export default userSlice.reducer