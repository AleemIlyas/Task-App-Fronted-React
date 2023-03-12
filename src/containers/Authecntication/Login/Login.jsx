import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './Login.css';
import updateObject from '../../../shared/updateObject'
import validate from '../../../shared/validate'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/index.js';
import { Navigate } from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/spinner'


class Login extends Component{
    state={
        formdata:{
            email:{
                type:'text',
                eleConfig:{
                    type:'text',
                    placeholder:'johndoe@email.com'
                },
                value:'',
                validation:{
                    required:true,
                    isemail:true
                },
                valid:false
            },
            password:{
                type:'text',
                eleConfig:{
                    type:'text',
                    placeholder:'password'
                },
                value:'',
                validation:{
                    required:true,
                    min:5,
                    max:25
                },
                valid:false
            }
        },
        formIsValid:false
    }


    submitHandler=(e)=>{
        e.preventDefault();
        const formData={}
        for(let v in this.state.formdata){
            formData[v]=this.state.formdata[v].value
        }
        this.props.login(formData)
    }

    changeHandler=(e,id)=>{
        let data = updateObject(this.state.formdata,{
            [id]: updateObject(this.state.formdata[id],{
                value:e.target.value,
                valid:validate(e.target.value,this.state.formdata[id].validation)
            })
        })
        
        let validity=true;
        for(let v in this.state.formdata){
            validity = this.state.formdata[v].valid && validity
        }
        this.setState({formdata:data,formIsValid:validity})
    }

    componentWillUnmount(){
        this.props.reset()
    }

    render(){
        let form=[]
        for(let data in this.state.formdata){
            form.push({
                key:data,
                label:data,
                config:this.state.formdata[data]
        })
        }

        let redirect = null

        if(this.props.redirect) redirect=<Navigate to='/' replace />

        let Component = ( <div className={classes.form}>
        <h1>LOG IN!</h1>
        <p className={classes.Error}>{this.props.error}</p>
          <form onSubmit={(e)=>this.submitHandler(e)}>
          {form.map(value=>{
              return (
                  <Input type={value.config.type}
                  key={value.key}
                  eleconfig={value.config.eleConfig}
                  value={value.config.value}
                  label={value.label}
                  change={(e)=>{this.changeHandler(e,value.key)}} />
              )
          })}
          <Button type='Success' disable={this.state.formIsValid}> LOG IN! </Button>
          </form>
      <p> Don't have a account <span className={classes.btn} onClick={()=>this.props.navigate('/SignUP')} >SIGN Up!</span> </p>
      {redirect}
      </div>
  )
        if(this.props.loading) Component = <Spinner />


        return Component
    }
}

const mapStateToProps=(state)=>{
    return{
        loading: state.user.loading,
        error:state.user.error,
        redirect:state.user.redirect
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        login:(params)=>dispatch(actionCreators.login(params)),
        reset:()=>dispatch(actionCreators.Reset())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);