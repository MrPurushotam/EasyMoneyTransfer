import React from 'react'
import { Link } from 'react-router-dom'

const DIrectTo = ({to,toLink,message}) => {
  return (
    <>
      <p className='font-medium text-lg text-center'>{message}<Link to={toLink} className='underline'>{to}</Link></p>
    </>
  )
}

export default DIrectTo
