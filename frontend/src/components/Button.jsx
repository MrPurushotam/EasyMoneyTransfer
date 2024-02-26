import React from 'react'

const Button = ({name,type,onClick,className}) => {
  return (
    <div className={`${className} block my-2`}>
      <button onClick={onClick} className={`w-full p-2 font-bold ${type==="primary"?"bg-black text-white hover:bg-gray-700 ":type==="logout"?"bg-red-600 text-white hover:bg-red-700 ":"bg-green-500 text-white hover:bg-green-600"} rounded-md`} >{name || "no val provided"}</button>
    </div>
  )
}

export default Button
