import React from 'react'
import { Flip, ToastContainer, Zoom } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
// import conf  from '../conf/conf';
import { env_variables } from '../utils';

function Signup()
{
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }


  const handleSignup = async (e) =>
  {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password)
    {
      return handleError('name, email and password are required')
    }
    
    try {

      const url = `${env_variables.BASE_URL}/auth/signup`
      
      console.log(env_variables.BASE_URL)
      console.log("url",url)
      // const url = 'http://localhost:8080/auth/signup'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      
      const result = await response.json() 
      console.log("Result of signup", result)

      const {success, message, error} = result

      if(success) {
        handleSuccess(result.message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
      else if(error) {
        let ErrDetails = error.details[0].message
        handleError(ErrDetails)
      }
      else
      {
        handleError(result.message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
      

    } catch (error) {
      handleError('Error Ocurred in API call')
    }
  }


  return (
    <div className='w-full min-h-screen text-center text-white bg-slate-900 flex'>
      <div className='container content-center'>
        <h1 className='mb-2 text-xl font-bold'>Signup</h1>
        <form onSubmit={handleSignup}>
          <div className='my-3'>
            <label className='mr-6' htmlFor='name'>Name</label>
            <input
              onChange={handleChange}
              className='bg-slate-800 h-8 p-1 text-white rounded-md'
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name...'
              value={signupInfo.name}
            />
          </div>
          <div className='my-3'>
            <label className='mr-6' htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              className='bg-slate-800 h-8 p-1 text-white rounded-md'
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <div >
            <button className='rounded-lg text-white bg-lime-700 p-2 m-4 hover:bg-green-300 hover:text-slate-950' type='submit'>Signup</button>

          </div>
          <span className='text-sm'>Already have an account ?
            <Link className='pl-2 text-blue-500 hover:text-lg' to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer position='top-left' theme='dark' autoClose={1500} transition={Zoom} />
    </div>
  )
}

export default Signup
