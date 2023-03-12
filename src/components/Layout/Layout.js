import  React  from  'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css'

const Layout =(props)=>{
    return( 
    
    <React.Fragment>
          <Toolbar />     {/* Navigation Items */}
             {/* // Depends if required */}
         <main className={classes.content}>
           {props.children}
         </main>
    </React.Fragment>
    )
}

export default Layout;