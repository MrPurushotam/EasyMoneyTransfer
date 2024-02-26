import React from 'react'
import Avatar from './Avatar'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
const AppBar = ({currentUser}) => {
    const navigate=useNavigate()
  return (
    <div className='flex justify-between flex-row p-5 border-b-2 items-center'>
        <Link to='/dashboard'><img src={"../assets/favicon_io/android-chrome-192x192.png"} alt='EasyMoneyTransfer' className='font-bold' /></Link>
        <div className='font-bold text-2xl flex items-center'>
            <Button name={"Logout"} type={"logout"} onClick={(e)=>{window.localStorage.removeItem("token"); navigate("/signin")}} className={"mx-2"} />
            <div className='mx-2' >
                Hello {currentUser.username || "NA"} <Avatar text={currentUser.username?currentUser.username.substring(0,2) : "NA"} />
            </div>
        </div>
  </div>
)
}

export default AppBar
