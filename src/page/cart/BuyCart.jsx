import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  decrease,
  DelCart,
  increase,
} from "../../redux/slice/sliceProduct";

const BuyCart = () => {
  const account = useSelector((state) => state.authReducer.user)
  const handleBuyProduct = () => {
    {
      account !== null
        ? alert("mua thanh cong")
        : alert("vui lòng qua trang login để đăng nhập :))");
    }
  };
  const stateCart = useSelector(
    (state) => state.authReducerProduct.productByCategory
  );
  const BuyProduct = () => {
    return stateCart.map((cart, index) => (
      <>
        <div className="container " key={cart.id}>
          <div className="row py-4">
            <div className="col-md-3 buyProduct_item">{index + 1}</div>
            <div className="col-md-3 buyProduct_item">
              <img src={cart.image} alt={cart.title} height={50} width={50} />
            </div>
            <div className="col-md-3 buyProduct_item">{cart.count}</div>
            <div className="col-md-3 buyProduct_item">
              {cart.count * cart.price}$
              
            </div>
          </div>
        </div>
        
      </>
    ));
  };

  const Cart = () => {
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
              <img src={cart.image} alt={cart.title} height={200} width={200} />
            </div>
            <div className="col-md-6 ">
              <h5 className="text-uppercase text-black-50">{cart.category}</h5>
              <h5 className="display-5">{cart.title}</h5>
              <h5 className="display-6 fw-bold my-4">${cart.price} $</h5>
              <button
                onClick={() => handleIncrease(cart)}
                className=" btn btn-outline-dark px-4 py-2 me-2"
              >
                +
              </button>
              <span className="numberOf">{cart.count}</span>

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
        <div className="container product_item ">
        <div className="col-md-12 buyProduct_item header">
            Sản phẩm bạn đã chọn
        </div>
        <div className="row py-4 buyProduct">
          <div className="col-md-3 buyProduct_item">STT</div>
          <div className="col-md-3 buyProduct_item">IMAGE</div>
          <div className="col-md-3 buyProduct_item">QUANTITY</div>
          <div className="col-md-3 buyProduct_item  ">TOTAL</div>
        </div>
        {BuyProduct()}
        <div className="row py-4 buyProduct">
          <div className="col-md-12 buyProduct_item">
            ALL TOTAL = {}
          </div>
        </div>
       <div className=" py-4 buyProduct"> 
        <button 
          className="btn btn-outline-dark py-2 buyProduct"
          onClick={() => handleBuyProduct()}
        >
          Buy Product
        </button></div>
        </div>
      </div>
    </>
  );
};

export default BuyCart;
