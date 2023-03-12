import React from 'react';
import classes from './sideDrawer.css';
import { FaCubes  } from 'react-icons/fa'
import { VscChromeClose } from 'react-icons/vsc';
import Navigation from '../Navigation';

export default function SideDrawer(props) {
  return (
      <div className={classes.SideDrawer} style={{transform : props.show ? 'translateX(0%)':'translateX(-100%)'  }}>

        <div className={classes.Close}>
        <VscChromeClose onClick={props.NavHandler} />
        </div>

         <div className={classes.Logo}> 
         <FaCubes />
        </div>

        <Navigation />

      </div>
);
}
