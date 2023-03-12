import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './SignUP.css';
import updateObject from '../../../shared/updateObject';
import validate from '../../../shared/validate';
import Spinner from '../../../components/UI/Spinner/spinner';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
import * as actionCreators from '../../../store/index.js';


class SignUP extends Component{
    state={
        formdata:{
            name:{
                type:'text',
                eleConfig:{
                    type:'text',
                    placeholder:'johndoe'
                },
                value:'',
                validation:{
                    required:true,
                    min:7,
                    max:25
                },
                valid:false
            },
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
            age:{
                type:'number',
                eleConfig:{
                    type:'number',
                    placeholder:'age'
                },
                value:'' ,
                validation:{
                    required:true,
                    min:2,
                    max:2
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
        isValid:false
    }

    changeHandler=(e,id)=>{
        let update = updateObject(this.state.formdata[id],{
            value:e.target.value,
            valid: validate(e.target.value,this.state.formdata[id].validation)
        })
        let data=updateObject(this.state.formdata,{
            [id]:update
        })

                
        let validity=true;
        for(let v in this.state.formdata){
            validity = this.state.formdata[v].valid && validity
        }
        this.setState({formdata:data,isValid:validity})
}

        submitHandler=(e)=>{
            e.preventDefault()
            let data = {}

            for(let v in this.state.formdata){
                data[v]= this.state.formdata[v].value
            }
            this.props.signup(data)
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
        if(this.props.redirect) redirect = <Navigate to='/' replace />
        let component =(
            <div className={classes.form}>
                {redirect}
              <h1>SIGN UP!</h1>
              <p className={classes.Error}>{this.props.error}</p>
                <form onSubmit={(e)=>this.submitHandler(e)}>
                {form.map(value=>{
                    return (
                        <Input type={value.config.type}
                        key={value.key}
                        eleconfig={value.config.eleConfig}
                        value={value.config.value}
                        label={value.label}
                        change={(e)=>this.changeHandler(e,value.key)} />
                    )
                })}
                <Button type='Success' disable={this.state.isValid} > SIGN UP! </Button>
                </form>
            <p> have a account <span className={classes.btn} onClick={()=>this.props.navigate('/login')} >Log IN!</span> </p>
            </div>
        )

        if(this.props.loading) component= <Spinner />
        return component
    }
}

const mapStateToProps=(state)=>{
    return{
        error:state.user.error,
        loading:state.user.loading,
        redirect:state.user.redirect
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signup:(data)=>dispatch(actionCreators.SignUP(data)),
        reset:()=>dispatch(actionCreators.Reset())
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUP);