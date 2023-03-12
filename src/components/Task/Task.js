import React from 'react';
import classes from './Task.css';
import { AiOutlineEdit , AiOutlineClose , AiOutlineCheck } from 'react-icons/ai';
import * as actionCreators from '../../store/actions/taskAction'
import { useDispatch } from 'react-redux';

export default function Task(props){
    const dispatch = useDispatch()
    let option = null
    if(props.type === 'Complete'){
        option = (
            <div className={classes.option}>
            <AiOutlineEdit onClick={props.navigate}/>
            <AiOutlineClose className={classes.close} onClick = {()=>dispatch(actionCreators.deleteTask(props.id)) }/>
            </div>
        )
    }
    else{
        option = <div className={classes.option}>
            <AiOutlineEdit onClick={props.navigate}/>
            <AiOutlineCheck onClick = {()=>dispatch(actionCreators.markCompleted(props.id)) }/>
            <AiOutlineClose className={classes.close} onClick = {()=>dispatch(actionCreators.deleteTask(props.id)) }/>
            </div>
    }
    return(
        <div className={classes.Task}>
            <span> Title: <h2>{props.title} </h2> </span>
            <p> Description : {props.description} </p>
            <p> Completed: <span> {props.complete} </span> </p>
            {option}
        </div>
    )

}