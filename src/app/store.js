import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import counterReducer from './counterSlice.js'

export default configureStore({
    reducer: {
      user: userReducer,
  },
})