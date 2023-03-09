import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCustomerCart } from "../../redux/action/cartAction";

const YourOrder = () => {
  const cartProduct = useSelector((state) => state.authReducerCart.cartList);
  const account = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerCart(account.id));
  }, []);
  const handleDelete = (cart) => {
    dispatch(deleteCart(cart.id));
    dispatch(getCustomerCart(account.id));
  };
  const BuyProduct = () => {
    return cartProduct.map((cart, index) => (
      <>
        <div className="container " key={cart.id}>
          <div className="row py-4">
            <div className="col-md-2 buyProduct_item">{index + 1}</div>
            <div className="col-md-2 buyProduct_item">
              <img src={cart.image} alt={cart.title} height={50} width={50} />
            </div>
            <div className="col-md-2 buyProduct_item">
              {cart.quantity * cart.price}$
            </div>
            <div className="col-md-2 buyProduct_item">{cart.quantity}</div>
            <div className="col-md-2 buyProduct_item">
              <button
                className=" btn btn-outline-dark btn-delete px-4 py-2 me-2"
                onClick={() => {
                  handleDelete(cart);
                }}
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
      <div className="container product_item ">
        <div className="col-md-12 buyProduct_item header header_order">
          Đơn Sản Phẩm Bạn Đã Đặt
        </div>
        <div className="row py-4 buyProduct">
          <div className="col-md-2 buyProduct_item">STT</div>
          <div className="col-md-2 buyProduct_item">IMAGE</div>
          <div className="col-md-2 buyProduct_item  ">PRICE</div>
          <div className="col-md-2 buyProduct_item">QUANTITY</div>
        </div>
        {BuyProduct()}
      </div>
    </>
  );
};

export default YourOrder;
