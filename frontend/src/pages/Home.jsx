import React from 'react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
    
  return (
    <div className=" font-bold text-xl flex justify-center items-center h-[100vh] w-[100vw] ">
        <div className="w-2/5  h-2/5 justify-center items-center flex flex-col" >
            Hi there its home page EasyMoneyTransfer web app
            {localStorage.getItem("token")&& localStorage.getItem("token")!=""?
              <Button name={"Dashboard"} type={"primary"} onClick={()=>navigate("dashboard")} />
              :
              <>
                <Button name={"Signup"} type={"primary"} onClick={()=>navigate("signup")} />
                <Button name={"Signin"} type={"primary"} onClick={()=>navigate("signin")} />
              </>
            }
        </div>

    </div>
  )
}

export default Home
