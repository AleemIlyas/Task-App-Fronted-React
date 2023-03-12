import React , { useState , useEffect } from 'react';
import classes from './profile.css'
import NavigationItem from '../Navigation Items/Navigation-Items.js';

const Profile=(props)=>{
    const [show,setShow]=useState(false)

    const menuHandler=()=>{
        setShow( prevState=>{ return !prevState  } )
    }

    const menuHider = ()=>{
        setShow(false)
    }

    useEffect(()=>{
        setShow(false)
    } , [props.profile] )

    return(
        <div className={classes.profile}>
            <div className={classes.img} onClick={()=>menuHandler()}>
                <img src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png" width={100+'%'} alt="profile_image_of_user" />
            </div>
            <div className={classes.links} style={{display:show?'block':'none'}}>
            <NavigationItem  href="/profile" func= { ()=>menuHider() }> Profile </NavigationItem>
            <NavigationItem  href="/profile/LogOut" func= { ()=>menuHider() }> LogOut </NavigationItem>
            </div>
        </div>
    )
}
export default Profile;

