import * as actionTypes from './actionType.js';
import AxiosInstance from '../../axios/axiosInstance.js';

export const getuser=()=>{
    return{
        type:actionTypes.GET_USER
    }
}

export const logOut=(expiretime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(log_user_out())
        }
        , expiretime * 1000 )
    }
}

export const log_user_out=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expireIn')
    return{
        type:actionTypes.LOG_OUT
    }
}

export const login=(data)=>{
    return dispatch=>{
        dispatch(authStart())
        AxiosInstance.post('/users/login',data)
        .then(res=>{
            const expireIn = new Date( new Date().getTime() + res.data.expiresIn * 1000 )
            localStorage.setItem('token','Bearer '+res.data.token)
            localStorage.setItem('expireIn',expireIn)
            localStorage.setItem('id' , res.data.user._id)
            dispatch(authSuccess({'token':res.data.token,'_id':res.data.user._id}))
            dispatch(logOut(res.data.expiresIn))
        })
        .catch(e=>{
            dispatch(authFail(e.response))
        })
    }
}

export const authStart=()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess=(data)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:data
    }
}

export const authFail=(error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        payload :error.data
    }
}

export const SignUP=(data)=>{
    return dispatch =>{
        dispatch(authStart())
        AxiosInstance.post('/users',data)
        .then(res=>{
            const expireIn = new Date( new Date().getTime() + res.data.expiresIn * 1000 )
            localStorage.setItem('token','Bearer ' + res.data.token)
            localStorage.setItem('expireIn',expireIn)
            localStorage.setItem('id' , res.data.user._id)
            dispatch(authSuccess({'token':res.data.token,'_id':res.data.user._id}))
            dispatch(logOut(res.data.expiresIn))
        })
        .catch(err=>dispatch(authFail(err.response)))
    }
}

export const autoLogIN=()=>{
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('id')
    return dispatch=>{
        if(!token) dispatch(log_user_out())
        else{
        const expiresIn = new Date(localStorage.getItem('expireIn'))
        if(expiresIn > new Date() ){
            dispatch(authSuccess({token,_id}))
            dispatch(logOut((expiresIn.getTime()- new Date().getTime()) / 1000 ))
        }
        else{
            dispatch(log_user_out())
        }
    }
}
}


export const Reset = ()=>{
    return{
        type : actionTypes.RESET
    }
}