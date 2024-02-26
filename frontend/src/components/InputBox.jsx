import React from 'react'

const InputBox = ({name,type,placeholder,label,onChange,required}) => {
  return (
    <div className='my-2'>
        <label htmlFor={name} className='font-semibold text-xl' >{label}</label>
        <input type={type} name={name} placeholder={placeholder} onChange={onChange} className='w-full text-gray-600 border-2 border-gray-400 rounded-md p-2 text-xl' required={required || true} />
    </div>
  )
}

export default InputBox
