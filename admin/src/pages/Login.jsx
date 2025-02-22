import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState ("")
    const { setAdminToken, backendUrl } = useContext(AdminContext)

    const onSumbitHandler = async (e) => {
        e.preventDefault()

        try {
            // if (state === "Admin") {
                
            // }else{

            // }
            const { data } = await axios.post(backendUrl + "/api/admin/login", {
                email,
                password
            })
            if(data.success){
                // console.log(data.token)
                localStorage.setItem("admintoken", data.token)
                setAdminToken(data.token)
                toast.success("Login successfull!")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            
        }
    }
    
    return (
        <form onSubmit={onSumbitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-neutral-300 rounded-xl text-neutral-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'>
                <span className='text-primary'>{state}</span> Login
            </p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} className='border border-neutral-300 rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} className='border border-neutral-300 rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='cursor-pointer bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        </div>
        </form>
    )
}

export default Login
