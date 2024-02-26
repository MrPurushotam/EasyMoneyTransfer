import React from 'react'

const Title = ({title,subtitle,className}) => {
  return (
    <div className={`my-3 ${className}`}>
      <h1 className='text-center text-black font-semibold text-3xl mb-1'>{title}</h1>
      <p className='text-center text-gray-600 font-medium '>{subtitle}</p>
    </div>
  )
}

export default Title
