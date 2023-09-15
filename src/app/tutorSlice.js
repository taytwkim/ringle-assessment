import { createSlice } from '@reduxjs/toolkit'

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