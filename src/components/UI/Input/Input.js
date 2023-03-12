import React from 'react';
import classes from './Input.css'

export default function Input(props) {
    let input=''
    switch (props.type) {
        case 'text':
            input = <input onChange={props.change} className={classes.Input} {...props.eleconfig} value={props.value} />
            break;
        case 'textarea':
            input= <textarea  onChange={props.change} className={classes.textArea} {...props.eleconfig} value={props.value} />
            break;
        case 'number':
            input = <input onChange={props.change} className={classes.Input} {...props.eleconfig} value={props.value} />
            break;
        case 'select':
            input =( <select  onChange={props.change} className={classes.InputElement} value={props.value}>
                {props.eleconfig.Options.map((option) => {
                     return <option className={classes.Option} key={option.value} value={option.value}>{option.displayValue}</option>
                    })}
            </select> )
            break;
        default:
            input = <input onChange={props.change} className={classes.Input} {...props.eleconfig} value={props.value} />
            break;
    }
  return (
    <div className={classes.Input}>
    <label className={classes.Label}>{props.label}</label>
    {input}
</div>
  )
}
