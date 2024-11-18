import React from 'react'
import { Flip, ToastContainer, Zoom } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

import { env_variables } from '../utils';

function Login()
{
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  
  const navigate = useNavigate();
  const handleChange = (e) =>
    {
      const { name, value } = e.target;
      // console.log(name, value);
      const copyLoginInfo = { ...LoginInfo };
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
    }
    
    const handleLogin = async (e) => {
      e.preventDefault();
      const {email, password } = LoginInfo;
      
      if( !email || !password ) {
        handleError("Email and Password are required for login !")
      }
      
      try {
      const url = `${env_variables.BASE_URL}/auth/login`
      // const authUrl = 'http://localhost:8080/auth/login'
      const response = await fetch(url, {
        method : "POST",
        headers : {
          "Content-Type" : 'application/json'
        },
        body : JSON.stringify(LoginInfo)
      })

      const result = await response.json()

      const {message, error, success, jwtToken} = result

      if(success) {
        localStorage.setItem('AuthToken',jwtToken);
        localStorage.setItem('email', result.email);
        localStorage.setItem('username', result.name);
        navigate('/products')
      }
      else if(error) {
        let ErrDetails = error.details[0].message;
        handleError(ErrDetails);
      }
      else {
        handleError(message)
      }

    } catch (error) {
      handleError("Error Occurred in API call")
    }
  }
  return (
    <div className='w-full min-h-screen text-center text-white bg-slate-950 flex'>
      <div className='container content-center'>
        <h1 className='mb-2 text-xl font-bold'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='my-3'>
            <label className='mr-6' htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              className=' bg-slate-800 h-8 p-1 text-white rounded-md'
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={LoginInfo.email}
            />
          </div>
          <div className='my-3'>
            <label className='mr-6' htmlFor='password'>Password</label>
            <input
              onChange={handleChange}
              className='bg-slate-800 h-8 p-1 text-white rounded-md'
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={LoginInfo.password}
            />
          </div>
          <div >
            <button className='rounded-lg text-white bg-lime-700 p-2 m-4 hover:bg-green-300 hover:text-slate-950' type='submit'>Login</button>

          </div>
          <span className='text-sm'>Don't Have an Account
            <Link className='ml-2 text-blue-500 hover:text-lg' to="/signup">Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer position='top-left' theme='dark' autoClose={1500} transition={Zoom} />
    </div>
  )
}

export default Login
