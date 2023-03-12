import React from 'react';
import classes from './Button.css'

export default function Button(props) {
  return (
    <button className={[classes.Button, classes[props.type]].join(' ')} disabled={!props.disable}> {props.children} </button>
  )
}
