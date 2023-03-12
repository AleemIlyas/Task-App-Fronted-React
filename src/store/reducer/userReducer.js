import * as actionTypes from '../actions/actionType'
import {createReducer } from '@reduxjs/toolkit';


const initialState={
    name:null,
    loading:false,
    error:null,
    token:null,
    redirect:null,
    id:null
}

const reducer=createReducer(initialState,(builder)=>{
    builder
        .addCase( actionTypes.GET_USER , (state)=>{
            state.loading= true
            state.error=null
    })
        .addCase(actionTypes.AUTH_SUCCESS,(state,{ payload })=>{
            state.token=payload.token
            state.loading=false
            state.redirect = '/'
            state.error=null
            state.id = payload._id
        })
        .addCase(actionTypes.AUTH_START,(state)=>{
            state.loading=true
            state.error=null

        })
        .addCase(actionTypes.AUTH_FAIL,(state,{payload})=>{
            state.loading=false;
            state.error=payload.error
        })
        .addCase(actionTypes.LOG_OUT,(state)=>{
            state.token=null
            state.name=null
            state.redirect = null
        })
        .addCase(actionTypes.RESET,(state)=>{
            return initialState
        })
})

export default reducer;