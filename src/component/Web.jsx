import React from 'react'
import { Outlet } from 'react-router-dom'
import DefaultValue from './DefaultValue'

const Web = () => {
  return (
    <DefaultValue>
        <Outlet/>
    </DefaultValue>
  )
}

export default Web