import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { decrease, DelCart, increase } from "../../redux/slice/authSliceProduct";



const BuyCart = () => {
  const account= useSelector(state=> state.authReducer.user)
  const handleBuyProduct = ()=>{
    {account !== null ? alert("mua thanh cong") : alert("vui lòng qua trang login để đăng nhập :))")}
  }
  const Cart = () => {
    const stateCart = useSelector(
      (state) => state.authReducerProduct.productByCategory
    );
    // const count = useSelector((state)=> state.listCart.count);
    const dispatch = useDispatch();
    const handleIncrease = (cart) => {
      dispatch(increase(cart));
    };
    const handleDecrease = (cart) => {
      dispatch(decrease(cart));
    };
    const handleDelete = (product) => {
      dispatch(DelCart(product));
    };
    return stateCart.map((cart) => (
      <>
        <div className="container py-5" key={cart.id}>
          <div className="row py-4">
            <div className="col-md-6">
              <img src={cart.image} alt={cart.title} height={400} width={400} />
            </div>
            <div className="col-md-6 ">
              <h4 className="text-uppercase text-black-50">{cart.category}</h4>
              <h1 className="display-5">{cart.title}</h1>
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
              <button
                className=" btn btn-outline-dark btn-delete px-4 py-2 me-2"
                onClick={() => handleDelete(cart)}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </>
    ));
  };
  return (
    <>
      <div>
        <Cart />
        <button className="btn btn-outline-dark px-4 py-2 buyProduct"  onClick={()=>handleBuyProduct()}>
          Buy Product
        </button>
      </div>
    </>
  );
};

export default BuyCart;
