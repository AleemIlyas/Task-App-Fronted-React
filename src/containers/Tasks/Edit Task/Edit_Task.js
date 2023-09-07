import React,{useState , useEffect } from 'react';
import classes from './Edit_Task.css'
import {useParams} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import Toast from '../../../components/UI/Toast/toast';
import updateObject from '../../../shared/updateObject'
import validator from '../../../shared/validate'
import AxiosInstance from '../../../axios/axiosInstance'

function Edit(props) {
  const [valid,setValid] = useState(false)
  const [show,setShow] = useState(false)
  const [message, setMessage ] = useState(null)
    const [form,setForm] = useState(
      {
          title:{
            type:'text',
            eleConfig:{
              type:'text',
              placeholder:'Go for a walk',
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
              placeholder:'Go for a walk at 12 PM daily'
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
                {value:"false",displayValue:'false'},
                {value:"true",displayValue:'true'},
              ]
            },
            value:'false',
            validation:{}
          }
          }
    )
    let {id}=useParams()
    let forms=[]
    for(let element in form){
      forms.push({
        id: element,
        label:element,
        config: form[element]
      })
    }
    useEffect(()=>{
        const fetchTask = (cb)=>{
        const token = localStorage.getItem('token')
        AxiosInstance.get('/task/'+id,{
            headers :{
                'Authorization' : token
            }
        })
        .then(res=>{
          cb(res.data);
        })
        .catch(err=>err)
      }

      fetchTask((data)=>{
        let formData = {...form}
          for(let v in form){
           let formElement = updateObject(formData[v],{
                value : data[v],
                valid:true
            })
            formData = updateObject(formData  , {
                [v] : formElement
            })
          }
          setForm(formData)
      });
    },[id])

    const submitHandler = (e)=>{
      e.preventDefault()
      let data = {}
      for(let v in form){
          data[v] = form[v].value
      }
      const token = localStorage.getItem('token')
      AxiosInstance.patch('/task/'+id , data , {
        headers :{
          'Authorization' : token
      }
      }).then(res=>{
        setMessage('Task is Updated Successfully')
        setShow(true)
        hideToast();
      })
      .catch(err=>{
        setMessage('Something went wrong Unable to update')
        setShow(true)
        hideToast();
      })
    }

    const hideToast = ()=>{
      setTimeout(()=>{
        setShow(false)
      }, 2000)
    }

    const changeHanlder=(e,id)=>{
      let data=updateObject(form,{
        [id]:updateObject(form[id],{
        value:e.target.value,
        valid:validator(e.target.value,form[id].validation)
      })
    })
      let isVlaid = true
      for(let v in data){
        isVlaid = isVlaid && data[v].valid
      }
      setValid(isVlaid)
      setForm(data)
    }
  return (
    <React.Fragment>
    <Toast show={show} className={classes.Toast}>{message}</Toast>
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
          <Button type='Success' disable={valid} >Update</Button>
        </form>
    </div>
    </React.Fragment>
  )
}


export default Edit;