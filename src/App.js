import React , { Suspense } from 'react'
import { useEffect } from 'react'
import './App.css';
import * as actionCreators from './store/index.js' 
import { connect } from 'react-redux'
import withRouter from './hoc/withRouter';
import Spinner from './components/UI/Spinner/spinner';
import { Routes , Route , Outlet , Navigate } from 'react-router-dom';
const ADDTask  = React.lazy(()=> import( './containers/Tasks/createTask/createTask'));
const Login = React.lazy(()=> import( './containers/Authecntication/Login/Login'))
const SignUP = React.lazy(()=> import( './containers/Authecntication/SignUP/SingUP'));
const LogOut = React.lazy(()=> import( './containers/Authecntication/LogOut/LogOut'));
const Profile = React.lazy(()=> import ('./containers/Profile/profile'));
const EditTask = React.lazy(()=> import('./containers/Tasks/Edit Task/Edit_Task') );
const Layout = React.lazy(()=> import ('./components/Layout/Layout'));
const Task = React.lazy(()=> import ('./containers/Tasks/Task'));


function App(props) {

  useEffect(()=>{
      props.autologin()
  })



  let routes = null
    
  if(props.isAuth){
        routes = (
        <React.Fragment>
          <Route path="/profile" element={ <Outlet/> } >
          <Route path="" index element={ <Profile /> }/>
          <Route path="LogOut" element={ <LogOut /> } />
          </Route>
        <Route path='/ADDTask' element={<ADDTask />}/>
      </React.Fragment>
        )
  }

  return (
    <Layout>
      <Suspense fallback = { <Spinner /> } >
      <Routes>
        <Route path="/"  element={ <Outlet/> } >
          <Route path="" index  element={ <Task {...props.routers}/> }/>
          <Route path=":id/edit" element={ <EditTask {...props.routers}/> } />
        </Route>
        <Route path="/login" element={ <Login  {...props.routers}/> } />
        <Route path="/SignUP" element={ <SignUP  {...props.routers}/> } />
        {routes}
        <Route path="*" element={ <Navigate to='/' replace='true' /> } />
      </Routes>
      </Suspense>
    </Layout>
  );
}

const mapStateToProps=(state)=>{
  return{
    isAuth:state.user.token !== null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    autologin:()=>dispatch(actionCreators.autoLogIN()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(App));
