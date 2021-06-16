import React from 'react'
import axios from 'axios' 
axios.defaults.withCredentials = true
function Login(props) {
  const initialState = {
    email: '',
    password:''
  }
  const [dataLogin,setDataLogin] = React.useState(initialState)
  const [error,setError] = React.useState('')
  const handelChange = (e)=>{
    const {name,value} = e.target
    setDataLogin({...dataLogin,[name]:value})
  }
  const handelSubmit= async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',dataLogin,{
        withCredentials:true
      })
      if(res){
        if(!res.data.enabled) props.history.push(`/changepassword/${res.data.id}`)
        if(res.data.isAuth && res.data.role === 'Admin') props.history.push('/admin')
        if(res.data.isAuth && res.data.role === 'User') props.history.push('/user')
        if(res.data.isAuth && res.data.role === 'Tech') props.history.push('/tech')
      }
    } catch (error) {
      error && setError(error.response.data);
    }

  }
  return (
    <div>
      <h1>Login</h1>
       {
         error && <p>{error}</p>
       }
       <form onSubmit={handelSubmit}>
         <input type="email" name="email" id=""  onChange={handelChange}/>
         <input type="password" name="password" id="" onChange={handelChange}/>
         <input type="submit" value="login"/>
       </form>
    </div>
  )
}

export default Login
