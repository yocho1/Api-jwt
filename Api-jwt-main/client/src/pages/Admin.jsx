import React from 'react'
import axios from 'axios'
function Admin()
{
  const initialState = {
    email: '',
    password:'',
    name:'',
    role:'User'
  }
  const [dataRegister,setDataRegister] = React.useState(initialState)
  const handelSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register',dataRegister)
      res && console.log(res.data);
    } catch (error) {
      error && console.log(error.response)
    }
   
  }
  // const [error,setError] = React.useState('')
  const handelChange = (e)=>{
    const {name,value} = e.target
    setDataRegister({...dataRegister,[name]:value})
  }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="email" name="email" id="" placeholder="email" onChange={handelChange} />
        <br/>
        <input type="text" name="name" id="" placeholder="name"  onChange={handelChange} />
        <br/>
        <select name="role" onChange={handelChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Tech">Tech</option>
        </select>
        <br/>
        <input type="password" name="password" placeholder="password"  id="" onChange={handelChange} />
        <br/>
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Admin
