import React from 'react'
import Cart from './Cart'


const BuyCart = () => {
  return (
    <>
        <Cart/>
        <div><button
            className="btn btn-outline-dark px-4 py-2 buyProduct"
          >
           Buy Product
          </button></div>
    </>
  )
}

export default BuyCart
