import React , { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { log_user_out } from '../../../store/index.js';
import { Navigate } from 'react-router-dom'

export default function LogOut(){
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(log_user_out())
    })
    return <Navigate to='/login' replace />
}