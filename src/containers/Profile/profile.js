import React, { Component } from 'react'
import classes from './profile.css'
import Input from '../../components/UI/Input/Input';
import updateObject from '../../shared/updateObject';
import Button from '../../components/UI/Button/Button';
import AxiosInstance from '../../axios/axiosInstance'
import Toast from '../../components/UI/Toast/toast';
import {connect} from 'react-redux'
import validate from '../../shared/validate'


class profile extends Component {
  state={
    file :'',
    imgsrc : null,
    msg : null , 
    formData :{
        name :{
           eleType : 'text',
           eleConfig :{
              type : 'text',
              placeholder : 'John'
           },
           value: '',
           validation :{
            min : 7,
            max : 25
           },
           valid:true,
           changed: false
          
        },
        password:{
          eleType : 'text',
          eleConfig:{
            type : 'text',
            placeholder : 'password'
          },
          value : '',
          validation : {
            min : 7,
            max : 25
          },
          valid:true,
          changed: false
        },
        ConfirmPassword:{
          eleType : 'text',
          eleConfig:{
            type : 'text',
            placeholder : 'confirm password'
          },
          value : '',
          validation : {
            min : 7,
            max : 25
          },
          valid:true,
          changed: false
        }
    } ,
     isValid : false
  }

  changeHandler = (e , id) =>{
      const updatedForm = updateObject( this.state.formData ,{
           [id] : updateObject(this.state.formData[id] ,{
            value : e.target.value,
            changed:validate(e.target.value,this.state.formData[id].validation)
          })
      } )
      
    let validity=false;
    for(let v in this.state.formData){
        validity = this.state.formData[v].changed || validity
    }
    this.setState({formData:updatedForm,isValid:validity})
  }


  ToastHider = ()=>{
    setTimeout(()=>{
      this.setState({msg : null})
    },3000)
  }

  uploadImage = async () =>{
    const data = new FormData()
    data.append("avatar" , this.state.file )
    AxiosInstance.post('/users/me/avatar' , data , {
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization' : this.props.token
        }
    })
    .then(res=> {
      this.setState({msg : 'Profile Updated Successfully'}) 
      this.ToastHider()
    })    
.catch(err=> this.setState({msg : null}))
  }

    componentDidMount(){
      AxiosInstance.get('/users/me/'+this.props.id+'/avatar')
        .then(res=> this.setState({imgsrc:'/users/me/'+this.props.id+'/avatar'}) )
        .catch(err=>this.setState({imgsrc:null}))


      AxiosInstance.get('/users/me',{
        headers:{
          'Authorization': this.props.token
        }
      })
      .then(res=>{
        let newData = null
        for(let v in this.state.formData){
          newData = updateObject(this.state.formData , {
              [v] : updateObject(this.state.formData[v],{
                value : res.data[v]
              })
          })
          break;
        }
        this.setState({formData : newData})
      })
    }


    submitHandler = (e)=>{
        e.preventDefault();
        let formData = {}
        for(let v in this.state.formData){
            if(this.state.formData[v].changed )
            formData[v] = this.state.formData[v].value
        }

        if(formData['password'] !== formData['ConfirmPassword'] ) return this.setState({msg:'Password Must be same!'})
        delete formData['ConfirmPassword']
        AxiosInstance.patch('/users/update', formData , {
            headers:{
              'Authorization': this.props.token
            }
        })
        .then(res=> {
          this.setState({msg : 'Profile Updated Successfully'}) 
          this.ToastHider()
    })
        .catch(err=> this.setState({msg : null}))
        
    }

  render() {
    let data =[]
    for(let v in this.state.formData){
      data.push({
          key : v,
          title : v,
          config : this.state.formData[v]
      })
    }

    const imagePreviwer = (e) =>{
      if(e.target.files[0].size > 1048576 ){
        this.setState({error:'Image size is too large max size is 1mb' , imgsrc : null })
        return 
      }

      this.setState({imgsrc : URL.createObjectURL(e.target.files[0]) , file : e.target.files[0] })
  }

    return (
        <React.Fragment>
          <Toast show = {this.state.msg} > {this.state.msg? this.state.msg : 'Something Went Wrong' } </Toast>
        <div className={classes.profile}>
            <div className={classes.error}>{this.state.error}</div>
          <div className={classes.ProfileImg}>
            <img src={this.state.imgsrc ?  this.state.imgsrc : null   } alt="Upload img here" id={'ImageFile'} />
            <input type="file" onChange = { (e)=>imagePreviwer(e) } />
            <button className={classes.Button} onClick={this.uploadImage} disabled={this.state.imgsrc === null} > upload </button>
          </div>

          <form className = {classes.form} onSubmit={(e)=>this.submitHandler(e)}>
            {
              data.map(value=>{
                return(
                <Input 
                  key={value.key}
                  type={value.config.eleType}
                  eleconfig = {value.config.eleConfig}
                  value = {value.config.value}
                  label = {value.title}
                  change = { (e)=>this.changeHandler(e , value.title ) }
                />
                )})
            }
            <Button type='Success' className={classes.Btn} disable={this.state.isValid} > Update </Button>
          </form>
    
        </div>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state =>{
  return{
    token : state.user.token,
    id:state.user.id
  }
}

export default connect(mapStateToProps)(profile);