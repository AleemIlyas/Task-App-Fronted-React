import React from 'react';
import classes from './Toggle.css';

const Toggle = (props)=>{
    const styles=[classes.Toggle]
    if(props.active) styles.push(classes.active)
    return <button className={styles.join(" ")} onClick={props.toggle} >{props.type}</button>

}
export default Toggle;