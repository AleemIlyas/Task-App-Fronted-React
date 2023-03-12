import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from '../reducer/userReducer.js'
import taskReducer from '../reducer/taskReducer.js'

const reducer=combineReducers({
  user:userReducer,
  task:taskReducer
})
export const store = configureStore({
  reducer
})