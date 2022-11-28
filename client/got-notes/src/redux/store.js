
import { configureStore } from '@reduxjs/toolkit'
import characterDetails from './characterSlice'
import userDetails from './userDetailsSlice'

export default configureStore({
  reducer: {
    user: userDetails,
    characters: characterDetails
  }
})