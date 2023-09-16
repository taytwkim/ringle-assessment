import { createSlice } from '@reduxjs/toolkit'

/*
  {
    "tutorID": "T0004",
    "name": "Tim",
    "school": "Dartmouth College",
    "majorType": 3,
    "major": "Computer Science",
    "gender": 1,
    "accent": 1,
    "acceptanceRate": 100,
    "reservedLessons": [],
    "available": [{
      "start": "2023-09-20T00:00:00",
      "end": "2023-09-20T23:59:59"
    }]
  }
*/

const tutorInitialState = require("../TutorInfo.json");

export const tutorSlice = createSlice({
  name: 'tutor',
  initialState: tutorInitialState,
  reducers: {
    tutorAddReserved: (state, action) => {
      const i = action.payload.tutorIndex;
      console.log("Tutor Action: Add Event " + action.payload.event.eventID + " to tutor " + state[i].tutorID);
      
      // console.log("Before Action: " + state[i].reservedLessons.length.toString());
      state[i].reservedLessons.push(action.payload.event);
      // console.log("After Action: " + state[i].reservedLessons.length.toString());
    },
    tutorDeleteReserved: (state, action) => {
      console.log("Tutor Action: Delete Event " + action.payload.eventID + " from tutor " + action.payload.tutorID);
      
      let tutorIndex = 0
      for (let i; i < state.length; i++) {
        if (state[i].id === action.payload.tutorID) {
          tutorIndex = i;
          break;
        }
      }
      
      // console.log("Before Action: " + state[tutorIndex].reservedLessons.length.toString());
      state[tutorIndex].reservedLessons = state[tutorIndex].reservedLessons.filter((lesson, i) => lesson.eventID !== action.payload.eventID);
      // console.log("After Action: " + state[tutorIndex].reservedLessons.length.toString());
    }
  },
})

export const { tutorAddReserved, tutorDeleteReserved } = tutorSlice.actions

export default tutorSlice.reducer