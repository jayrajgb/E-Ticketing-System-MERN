import React, { useState } from 'react'

const Login = () => {
  
  const [state, setState] = useState("Sign Up")

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()

  }

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-neutral-200 rounded-xl text-gray-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book tickets!</p>
        {
          state === "Sign Up" && 
          <div className='w-full'>
            <p>Full Name</p>
            <input className='input-style' type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='input-style' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='input-style' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ? 
          <p>Already have an account? <span className='text-primary underline cursor-pointer' onClick={()=>setState("Login")}>Login Here</span></p>
          : 
          <p>Dont have an account? <span className='text-primary underline cursor-pointer' onClick={()=>setState("Sign Up")}>Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
