import React , { useState } from 'react';
import classes from './toolbar.css'
import Navigation from '../Navigation';
import { FaCubes  } from 'react-icons/fa'
import { DiGhostSmall } from 'react-icons/di';
import SideDrawer from '../SideDrawer/SideDrawer'

const Toolbar = ()=>{
    const [show,setShow] = useState(false)

    const navigationHandler = ()=>{
            setShow(prevState=>  !prevState )
    }

    return(
        <header className={classes.header}>
        <div className={classes.SIDEDRAWER}>
        <SideDrawer show={show} NavHandler={navigationHandler}/>
        <DiGhostSmall onClick={navigationHandler} />
        </div>
        <div className={classes.Logo}>
         <FaCubes />
        </div>
        <nav className={classes.nav}>
        <Navigation/>
        </nav>
        </header>
    )

}

export default Toolbar;