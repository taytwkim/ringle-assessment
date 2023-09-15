import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import tutorReducer from './tutorSlice.js'

export default configureStore({
    reducer: {
      user: userReducer,
      tutor: tutorReducer
  },
})