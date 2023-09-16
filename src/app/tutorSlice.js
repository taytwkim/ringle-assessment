import { createSlice } from '@reduxjs/toolkit'

/*
  {
    "tutorID": "T0001",
    "name": "Dominic",
    "school": "University of Oxford",
    "majorType": "인문계",
    "major": "Japanese and Korean Studies",
    "gender": "M",
    "accent": "British",
    "acceptanceRate": 100,
    "reservedLessons": []
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
      console.log("Tutor Action: Delete Event " + action.payload.eventID);
      
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