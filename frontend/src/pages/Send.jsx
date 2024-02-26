import React, { useState } from 'react'
import Title from '../components/Title'
import Avatar from '../components/Avatar'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ToastMessage } from '../App'

const Send = () => {
  const navigate=useNavigate()
  const [amount,setAmount]=useState()
  const [searchParams]=useSearchParams()
  const id=searchParams.get("id")
  const name=searchParams.get("name")

  const ButtonClicked=async()=>{
    const res=await axios.post("http://localhost:3000/api/v1/account/transfer",{
      to:id,
      amount
    },{
      headers:{
        Authorization:"Bearer "+ window.localStorage.getItem("token")
      }
    })
    console.log(res.data)
    if(res.data.success){
      ToastMessage("Transaction Successful")
      navigate("/dashboard")
    }else{
      ToastMessage(res.data.message)
      navigate("/dashboard")
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100 '>
      <div className='w-2/5 font-semibold bg-white h-2/5 rounded-md p-2 border-2'>
        <Title title={"Send Money"} className={"mb-7"}/>
        <div className='flex flex-row items-center my-7 mx-2'>
          <Avatar text={name?.substring(0,2).toUpperCase() || ""} />
          <p className='font-bold mx-2 text-2xl' >{name || "na"}</p>
        </div>
        <InputBox label={"Amount (in Rs)"} name={"amount"} placeholder={"Enter amount"} type={"number"} onChange={(e)=>setAmount(e.target.value)} />
        <Button name={"Initate Transfer"} type={"secondary"} onClick={ButtonClicked} />
      </div>
    </div>
  )
}

export default Send
