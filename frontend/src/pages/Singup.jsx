import React, { useState } from 'react'
import Title from '../components/Title'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import DIrectTo from '../components/DIrectTo'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ToastMessage } from '../App'
const Singup = () => {
    const navigate=useNavigate()
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [username,setUsername]=useState("")

    const ButtonClicked=async ()=>{
      const res=await axios.post("http://localhost:3000/api/v1/user/signup",{
        username,firstname,lastname,email,password
      })
      if(res.data?.token){
        window.localStorage.setItem("token",res.data.token)
        ToastMessage("User created and logged in!")
        navigate("/dashboard")
      }else{
        ToastMessage(`Some error occured: ${res.message}`)
      }
    }
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-700'>
        <div className='w-2/5 text-sm md:w-1/3 md:text-lg h-fit rounded-lg bg-white p-3'>
          <Title title={"Singup"} subtitle={"Enter your information to create your account"} />
          <InputBox name={"firstname"} placeholder={"Johnny"} label={"First Name"} type={"text"} onChange={(e)=>{setFirstname(e.target.value)}} />
          <InputBox name={"lastname"} placeholder={"Sins"} label={"Last Name"} type={"text"} onChange={(e)=>{setLastname(e.target.value)}} />
          <InputBox name={"username"} placeholder={"Johnny01"} label={"Username"} type={"text"} onChange={(e)=>{setUsername(e.target.value)}} />
          <InputBox name={"email"} placeholder={"JohnnySins@hotmail.com"} label={"Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}} />
          <InputBox name={"password"} placeholder={"XXXXXXXXX"} label={"Password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} />
          <Button name={"Signup"} type={"primary"} onClick={ButtonClicked} />
          <DIrectTo message={"Already have an account?"} to={"Login"} toLink={"/signin"} />
        </div>
    </div>
  )
}

export default Singup
