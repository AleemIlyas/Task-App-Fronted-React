import React, { Component } from 'react';
import Toggle from '../../components/UI/Toggle/Toggle'
import classes from './Task.css';
import Task from '../../components/Task/Task';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/index.js'
import Spinner from '../../components/UI/Spinner/spinner';
import Toast from '../../components/UI/Toast/toast';

class Tasks extends Component {
  state={
    toggle:false
  }
  componentDidMount(){
    this.props.getTasks(this.state.toggle)
  }

  componentDidUpdate(prevProps , prevState){
    if(prevState === this.state && (this.props.tasks !== prevProps.tasks || this.props.error )) return false
    this.props.getTasks(this.state.toggle)
  }

  toggleHandler = (value)=>{
    if(value===this.state.toggle) return
     this.setState({toggle:!this.state.toggle})
  }

  render() {
    let tasks = null
    if(this.props.loading) tasks = <Spinner />    

    if(this.props.error) tasks = <p className={classes.nothing}> {this.props.error} </p>
      
    if(this.props.tasks){
        if(this.props.tasks.length > 0){
        tasks = this.props.tasks.map((value)=>{
          return <Task 
            key = {value._id}
            title = {value.title}
            id={value._id}
            description = {value.description}
            complete = {value.complete === true ? 'true' : 'false' }
            navigate= { ()=>this.props.navigate(value._id+'/edit') }
            type = {this.state.toggle === false ? 'In-Complete' : 'Complete' }
          />
        })
      }
    else{
      tasks = <p className={classes.nothing}> Nothing to show! </p>
    }  
    }


   return (
      <React.Fragment>
        <Toast show={this.props.show}>{this.props.type ? this.props.type :'Something went wrong' }</Toast>
        <div className={classes.Toggle}>
        <Toggle key={!this.state.toggle} type=" In-Completed " active={!this.state.toggle} toggle={()=>this.toggleHandler(false)}/>
        <Toggle key={this.state.toggle} type="Completed"  active={this.state.toggle}  toggle={()=>this.toggleHandler(true)}/>
        </div>
        <div className={classes.Tasks_INFO}>
          <h2>Your Tasks</h2>
          { tasks }
          </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    loading : state.task.loading,
    tasks : state.task.tasks,
    error:state.task.error,
    show : state.task.show,
    type:state.task.type
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    getTasks:(query)=>dispatch(actionTypes.getTasks(query))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tasks);
