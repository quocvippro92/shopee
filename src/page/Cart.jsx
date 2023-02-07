import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { decrease, increase } from "../redux/slice/createrSlice";
const Cart = () => {
  const stateCart = useSelector((state) => state.listCart.listCart);
  // const count = useSelector((state)=> state.listCart.count);
  const dispatch = useDispatch();
  const handleIncrease = (cart) => {
    dispatch(increase(cart));
  };
  const handleDecrease = (cart) => {
    dispatch(decrease(cart));
  };
  return stateCart.map((cart) => (
    <>
      <div className="container py-5 ">
        <div className="row py-4">
          <div className="col-md-6">
            <img src={cart.image} alt={cart.title} height={400} width={400} />
          </div>
          <div className="col-md-6 ">
            <h4 className="text-uppercase text-black-50">{cart.category}</h4>
            <h1 className="display-5">
               {cart.title}
            </h1>
            <h3 className="display-6 fw-bold my-4">
              ${cart.price} x {cart.count} = {cart.count * cart.price} $
            </h3>
            <button
              onClick={() => handleIncrease(cart)}
              className=" btn btn-outline-dark px-4 py-2 me-2"
            >
              +
            </button>
            <button
              onClick={() => handleDecrease(cart)}
              className=" btn btn-outline-dark px-4 py-2 me-2"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  ));
};

export default Cart;
