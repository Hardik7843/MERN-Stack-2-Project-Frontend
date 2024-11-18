import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Home, Signup, Login, Products } from './pages/index'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} />}/>
        
        <Route path='/products' element={<Products/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
