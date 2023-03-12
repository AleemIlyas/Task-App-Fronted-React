import * as actionTypes from '../actions/actionType'
import {createReducer } from '@reduxjs/toolkit';

const initialState = {
    tasks:null,
    laoding:false,
    error:null,
    show : false,
    type:null
}

const reducer = createReducer(initialState , (builder)=>{
    builder
        .addCase(actionTypes.GET_INIT,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(actionTypes.GET_TASK_ACCESS, (state , { payload })=>{
            state.loading = false
            state.tasks=payload
            state.error = null
        })
        .addCase(actionTypes.GET_TASK_FAIL,(state , {payload})=>{
            state.loading = false
            state.error = payload.error
            state.tasks = null
        })
        .addCase(actionTypes.MARK_COMPLETED,(state,{payload})=>{
            state.show = true
            state.type = payload
        })
        .addCase(actionTypes.HIDE_TOAST,(state)=>{
            state.show = false
            state.type = null
        })
})

export default reducer;