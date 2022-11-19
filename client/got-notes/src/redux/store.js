
import { configureStore } from '@reduxjs/toolkit'
import userDetails from './userDetailsSlice'

export default configureStore({
  reducer: {
    user: userDetails,
  }
})