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
      console.log("User Action: Increment 20");
      // console.log("Before Action: " + state.numLessons20.toString());
      state.numLessons20 += 1;
      // console.log("After Action: " + state.numLessons20.toString());
    },
    decrement20: (state) => {
      console.log("User Action: Decrement 20");
      // console.log("Before Action: " + state.numLessons20.toString());
      state.numLessons20 -= 1;
      // console.log("After Action: " + state.numLessons20.toString());
    },
    increment40: (state) => {
      console.log("User Action: Increment 40");
      // console.log("Before Action: " + state.numLessons40.toString());
      state.numLessons40 += 1;
      // console.log("After Action: " + state.numLessons40.toString());
    },
    decrement40: (state) => {
      console.log("User Action: Decrement 40");
      // console.log("Before Action: " + state.numLessons40.toString());
      state.numLessons40 -= 1;
      // console.log("After Action: " + state.numLessons40.toString());
    },
    addReserved: (state, action) => {
      console.log("User Action: Add Event " + action.payload.eventID);
      // console.log("Before Action: " + state.reservedLessons.length.toString());
      state.reservedLessons.push(action.payload);
      // console.log("After Action: " + state.reservedLessons.length.toString());
    },
    deleteReserved: (state, action) => {
      console.log("User Action: Delete Event " + action.payload);
      // console.log("Before Action: " + state.reservedLessons.length.toString());
      state.reservedLessons = state.reservedLessons.filter((lesson, i) => lesson.eventID !== action.payload);
      // console.log("After Action: " + state.reservedLessons.length.toString());
    }
  },
})

export const { increment20, decrement20, increment40, decrement40, addReserved, deleteReserved } = userSlice.actions

export default userSlice.reducer