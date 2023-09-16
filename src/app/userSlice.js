import { createSlice } from '@reduxjs/toolkit'
/*
{
  "userID": "U0001",
  "numLessons20": 1,
  "numLessons40": 1,
  "reservedLessons": [{
    "eventID": "E0001",
    "eventType": 40,
    "title": "예약 완료",
    "userID": 0,
    "tutorID": 0,
    "tutorName": "Dominic",
    "start": "2023-09-16T10:00:00",
    "end": "2023-09-16T10:40:00"
  }]
}
*/

const userInitialState = require("../UserInfo.json");

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    increment20: (state) => {
      console.log("Increment 20")
      state.numLessons20 += 1
    },
    decrement20: (state) => {
      console.log("Decrement 20")
      state.numLessons20 -= 1
    },
    increment40: (state) => {
      console.log("Increment 40")
      state.numLessons40 += 1
    },
    decrement40: (state) => {
      console.log("Decrement 40")
      state.numLessons40 -= 1
    },
    addReserved: (state, action) => {
      console.log("User: Add New Event")
      state.reservedLessons.push(action.payload)
    },
    deleteReserved: (state, action) => {
      console.log("User: Delete Event")
      state.reservedLessons = state.reservedLessons.filter((lesson, i) => lesson.eventID !== action.payload)
    }
  },
})

export const { increment20, decrement20, increment40, decrement40, addReserved, deleteReserved } = userSlice.actions

export default userSlice.reducer