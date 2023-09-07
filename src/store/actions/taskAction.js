import * as actionTypes from './actionType.js';
import AxiosInstance from '../../axios/axiosInstance.js';

export const getINIT=()=>{
    return{
        type: actionTypes.GET_INIT
    }
}


export const getTasks = (value)=>{
    return async dispatch=>{
        dispatch(getINIT())
        const token = await localStorage.getItem('token')
        AxiosInstance.get('/task?completed='+value,{
            headers :{
                'Authorization' : token
            }
        })
        .then(res=>dispatch(getSuccess(res.data)))
        .catch(err=>dispatch(getFail(err.response)))
    }
}

export const getSuccess = (data)=>{
    return {
        type : actionTypes.GET_TASK_ACCESS,
        payload : data
    }
}

export const getFail=(error)=>{
    return {
        type: actionTypes.GET_TASK_FAIL,
        payload:error.data
    }
}

export const markCompleted = (id)=>{
    const data = {
        complete : true
    }
    return dispatch=>{
        AxiosInstance.patch('/task/'+id,data,{
            headers :{
                'Authorization' : localStorage.getItem('token')
            }
        })
        .then(res=>{
            dispatch(afterComplete('Task is Marked as completed Successfully!'))
            setTimeout(()=>{
                dispatch(hideToast())
            },2000)
        })
        .catch(err=>{dispatch(afterComplete(null))
            setTimeout(()=>{
                dispatch(hideToast())
            },2000)
        })
    }
}

export const afterComplete=(value)=>{
    return{
        type:actionTypes.MARK_COMPLETED,
        payload:value
    }
}

export const hideToast = ()=>{
    return{
        type : actionTypes.HIDE_TOAST
    }
}


export const saveTask=(data)=>{
    return dispatch=>{
        dispatch(getINIT())
        const token = localStorage.getItem('token')
        AxiosInstance.post('/task',data,{
            headers :{
                'Authorization' : token
            }
        })
        .then(res=>dispatch(getSuccess(res.data)))
        .catch(err=>dispatch(getFail(err.response)))
    }
}


export const deleteTask=(id)=>{
    return dispatch=>{
        AxiosInstance.delete('/task/'+id,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then(res=>{dispatch(afterComplete('Task is deleted Successfully!'))
        setTimeout(()=>{
            dispatch(hideToast())
        },2000)
    })
        .catch(err=>{dispatch(afterComplete(null))
            setTimeout(()=>{
                dispatch(hideToast())
            },2000)
        })
    }
}