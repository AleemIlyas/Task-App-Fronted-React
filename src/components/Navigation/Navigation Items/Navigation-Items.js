import React from 'react';
import classes from './Navigation-Items.css'
import { NavLink } from 'react-router-dom'

const NavigationItem = (props)=>{
    return(
        <li  className={classes.Item} onClick={props.func}><NavLink className={({isActive})=>isActive?classes.active:null} to={props.href} end>{ props.children } </NavLink> </li>
    )
}

export default NavigationItem;