import React, { Component } from 'react'
import classes from './toast.css'

export default class toast extends Component {
  render() {
    return (
      <div className={classes.Toast} style={{transform : this.props.show ? 'translateY(0)':'translateY(-100vh)',opacity:this.props.show?'1':'0' }}>
        {this.props.children}
      </div>
    )
  }
}
