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
    addReserved: (state, action) => {

    },
    deleteReserved: (state, action) => {
      
    }
  },
})

export const { addReserved, deleteReserved } = tutorSlice.actions

export default tutorSlice.reducer