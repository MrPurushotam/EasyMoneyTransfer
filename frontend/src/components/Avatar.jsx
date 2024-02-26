import React from 'react'

const Avatar = ({text}) => {
  return (
    <>
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-green-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{text.substring(0,2) || "NA"}</span>
        </div>
   </>
  )
}

export default Avatar
