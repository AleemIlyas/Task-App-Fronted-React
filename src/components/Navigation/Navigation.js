import React , { useState } from 'react';
import classes from './Navigation.css'
import NavigationItem from './Navigation Items/Navigation-Items.js';
import Profile from './profile/profile.js'
import { connect } from 'react-redux'

const Navigation=(props)=>{
    const [profile , setProfile ] = useState(false)

    const hideProfileMenu = () =>{
        setProfile( prevState => !prevState )
    }

    return(
        <ul className={classes.Navigation}>
            <NavigationItem href="/"   func={hideProfileMenu}> Task </NavigationItem>
           {!props.isAuth ? null : <NavigationItem href="/ADDTask" func={hideProfileMenu} >ADDTASK</NavigationItem> }
           { !props.isAuth ? <NavigationItem href="/login"> Login </NavigationItem> : 
           <Profile profile = {profile} />
           }
           
        </ul>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuth : state.user.token!==null
    }
}


export default connect(mapStateToProps,null)(Navigation);