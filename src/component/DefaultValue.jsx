import React from 'react'
import Footer from './Footer'
import NavBar from './Navbar'

const DefaultValue = ({children}) => {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
    </>
  )
}

export default DefaultValue