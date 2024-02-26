import React,{useEffect, useState} from 'react'
import InputBox from './InputBox'
import Button from './Button'
import Avatar from './Avatar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const User = ({currentUser}) => {
    const [searchPrompt,setSearchPrompt]=useState(null)
    const [users,setUsers]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const getData=setTimeout(()=>{
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchPrompt}`).then(
                res=>{
                    if(res.data?.users){
                        setUsers(currentUser._id && res.data.users.filter(user=>{
                                    return user._id!=currentUser._id 
                                }))
                    }else{
                        setUsers([])
                    }
                })
            },200)
            return ()=>clearTimeout(getData)
    },[searchPrompt])

    const ButtonClicked=(user)=>{
        navigate(`/send?id=${user._id}&name=${user.username}`)
    }
  return (
    <div>
        <div className="my-2 font-bold text-2xl">
        <p className="text-bold text-3xl my-1">Users</p>
        <InputBox label={""} name={"searchprompt"} onChange={(e)=>setSearchPrompt(e.target.value)} placeholder={"Search User"} type={"text"}  />
        <div className='my-1 border-[0.2vh] border-gray-500 p-1 min-h-[7vh] h-fit'>
            {users?.length>0? users.map(user=>(
                <>
                <div key={user?._id} className='flex flex-row justify-between px-1 border-2 border-black w-full ' >
                    <div className='mx-2 flex flex-row items-center'>
                        <Avatar text={user?.username.toUpperCase()} />
                        <p className='font-bold mx-2'>{user?.username}</p>
                    </div>
                    <Button name={"Send Money"} onClick={()=>ButtonClicked(user)} type={"secondary"} />
                </div>
                </>
            )):null}
        </div>
      </div>

    </div>
  )
}

export default User
