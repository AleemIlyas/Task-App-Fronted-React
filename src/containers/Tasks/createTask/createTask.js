import React,{useState} from 'react';
import classes from './createTask.css'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/spinner'
import updateObject from '../../../shared/updateObject'
import validator from '../../../shared/validate'
import {connect} from 'react-redux'
import Toast from '../../../components/UI/Toast/toast';
import * as actionCreators from '../../../store/index'

function Create(props) {
    const [form,setForm] = useState(
      {
          title:{
            type:'text',
            eleConfig:{
              type:'text',
              placeholder:'Add task',
            },
            value:'',
            validation:{
              required:true
            },
            valid:false
          },
          description:{
            type:'textarea',
            eleConfig:{
              type:'textarea',
              placeholder:'Task description'
            },
            value:'',
            validation:{
              required:true
            },
            valid:false
          },
          complete:{
            type:'select',
            eleConfig:{
              Options:[
                {value:"True",displayValue:'True'},
                {value:"false",displayValue:'false'},
              ]
            },
            value:'true',
            validation:{},
          valid:true
          }
          }
    )

    const [validity , setValidity] = useState(false)
    let [hide,setHide] = useState(false)


    

    let forms=[]
    for(let element in form){
      forms.push({
        id: element,
        label:element,
        config: form[element],
      })
    }

    const submitHandler=(e)=>{
      e.preventDefault();
      let data = {}
      for(let v in form){
        data[v] = form[v].value
      }
      props.saveTask(data)
      setHide(true)
      setTimeout(()=>{
        setHide(false)
      },2000)
    }

    const changeHanlder=(e,id)=>{
      let data=updateObject(form,{
        [id]:updateObject(form[id],{
        value:e.target.value,
        valid:validator(e.target.value,form[id].validation)
      })
    })
      let isValid = true

      for(let v in form){
        isValid = form[v].valid && isValid
      }

      setValidity(isValid)
      setForm(data)
    }

    let component = (
      <div className={classes.form}>
      <form onSubmit={(e)=>submitHandler(e)}>
        {
          forms.map(element => {
          return (  
              <Input key={element.id}
              type={element.config.type}
              eleconfig={element.config.eleConfig}
              value={element.config.value}
              label={element.label} 
              change={(e)=>changeHanlder(e,element.id)} />
            )
          })
        }
        <Button type='Success' disable={validity} >ADD</Button>
      </form>
  </div>
)

    if(props.loading){
      component = <Spinner />
    }

    return (
      <>
      <Toast show={hide}>{props.error?'Something Went Wrong!':'Work added Successfully'}</Toast>
      {component}
  
      </>
    )

}

const mapStateToProps = (state)=>{
  return{
    task: state.task.tasks,
    error: state.task.error,
    loading : state.task.loading
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    saveTask:(data)=>dispatch(actionCreators.saveTask(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Create)