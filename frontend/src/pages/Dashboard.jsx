import React,{useEffect, useRef, useState} from 'react'
import User from '../components/User'
import axios from 'axios'
import AppBar from '../components/AppBar'
const Dashboard = () => {
  const [balance,setBalance]= useState()
  const [currentUser,setCurrentUser]=useState({_id:null,username:null,firstname:null,lastname:null,email:null})
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/account/balance",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then(res=>{
      setBalance(res.data.balance)
    })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/getuser",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).then(res=>{
      setCurrentUser(res.data.user)
    })
  },[])
  return (
    <div className='flex flex-col w-full h-[100vh] border-2'>
      <AppBar currentUser={currentUser} />
      <div className='font-bold my-3 text-2xl' >Your Balance: ₹ { balance || "NA" }</div>
      <User currentUser={currentUser} />
    </div>
  )
}

export default Dashboard
