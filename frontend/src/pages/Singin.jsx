import React, { useState } from 'react'
import Title from '../components/Title'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import DIrectTo from '../components/DIrectTo'
import { useNavigate } from 'react-router-dom'
import { ToastMessage } from '../App'
import axios from 'axios'
const Singin = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const ButtonClicked=async ()=>{
    const res=await axios.post("http://localhost:3000/api/v1/user/signin",{
      email,password
    })
    if(res.data?.token){
      window.localStorage.setItem("token",res.data.token)
      ToastMessage("User logged in!")
      navigate("/dashboard")
    }else{
      ToastMessage(`Some error occured: ${res.message}`)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-700'>
        <div className='w-2/5 text-sm md:w-1/3 md:text-lg h-fit rounded-lg bg-white p-3'>
          <Title title={"Signin"} subtitle={"Enter your information to login to  your account"} />
          <InputBox name={"email"} placeholder={"JohnnySins@hotmail.com"} label={"Email"} type={"email"} onChange={(e)=>{setEmail(e.target.value)}} />
          <InputBox name={"password"} placeholder={"XXXXXXXXX"} label={"Password"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} />
          <Button name={"Signin"} onClick={ButtonClicked} type={"primary"} />
          <DIrectTo message={"Don't have an account?"} to={"Create now"} toLink={"/signup"} onClick={ButtonClicked} />
        </div>
    </div>
  )
}

export default Singin
