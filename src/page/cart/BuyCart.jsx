import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { NavLink, useParams } from "react-router-dom";
import {
  deleteCart,
  getCustomerCart,
  updateCart,
} from "../../redux/action/cartAction";
import { DelCart, increase } from "../../redux/slice/sliceProduct";
import { Button, Modal } from "antd";

const BuyCart = () => {
  const account = useSelector((state) => state.authReducer.user);
  const cartProduct = useSelector((state) => state.authReducerCart.cartList);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn có chắc muốn xóa sản phẩm ?");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerCart(account.id));
  }, []);
  const totalPrice = cartProduct.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );
  // const BuyProduct = () => {
  //   return cartProduct.map((cart, index) => (
  //     <>
  //       <div className="container " key={cart.id}>
  //         <div className="row py-4">
  //           <div className="col-md-2 buyProduct_item">{index + 1}</div>
  //           <div className="col-md-2 buyProduct_item">
  //             <img src={cart.image} alt={cart.title} height={50} width={50} />
  //           </div>
  //           <div className="col-md-2 buyProduct_item">{cart.size}</div>
  //           <div className="col-md-2 buyProduct_item">{cart.quantity}</div>
  //           <div className="col-md-2 buyProduct_item">{cart.color}</div>
  //           <div className="col-md-2 buyProduct_item">
  //             {cart.quantity * cart.price}$
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   ));
  // };

  const Cart = () => {
    // const count = useSelector((state)=> state.listCart.count);
    const handleIncrease = (cart) => {
      const cartId = cart.id;
      // Object.freeze(cart);
      const objCart = { ...cart };
      objCart.quantity = cart.quantity + 1;
      dispatch(updateCart({ cartId, objCart }));
      dispatch(getCustomerCart(account.id));
    };
    const handleDecrease = (cart) => {
      const cartId = cart.id;
      // Object.freeze(cart);
      const objCart = { ...cart };
      objCart.quantity = cart.quantity - 1;
      dispatch(updateCart({ cartId, objCart }));
      dispatch(getCustomerCart(account.id));
    };
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = (cart) => {
      setModalText("chời đợi trong giây lát");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        dispatch(deleteCart(cart.id));
        dispatch(getCustomerCart(account.id));
      }, 2000);
    };
    const handleCancel = () => {
      console.log("Clicked cancel button");
      setOpen(false);
    };
    // const handleDelete = (cart) => {
    //   dispatch(deleteCart(cart.id));
    //   dispatch(getCustomerCart(account.id));
    // };
    return cartProduct.map((cart) => (
      <>
        <div className="container py-5" key={cart.id}>
          <div className="row py-4">
            <div className="col-md-6">
              <img src={cart.image} alt={cart.title} height={200} width={200} />
            </div>
            <div className="col-md-6 ">
              <h5 className="text-uppercase text-black-50">{cart.category}</h5>
              <h5 className="display-5">{cart.title}</h5>
              <h5 className="display-5">
                <strong>Size:</strong> {cart.size}
              </h5>
              <h5 className="display-6 fw-bold my-4">${cart.price} $</h5>
              <button
                onClick={() => handleDecrease(cart)}
                className=" btn btn-outline-dark px-4 py-2 me-2"
              >
                -
              </button>
              <span className="numberOf">{cart.quantity}</span>
              <button
                onClick={() => handleIncrease(cart)}
                className=" btn btn-outline-dark px-4 py-2 me-2"
              >
                +
              </button>

              <Button type="primary" onClick={showModal}>
                Delete
              </Button>
              <Modal
                title="Alert"
                open={open}
                onOk={() => handleOk(cart)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal>
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
        <div className="row py-4 buyProduct">
          <div className="col-md-12 buyProduct_item">
            INTO MONEY = {totalPrice}$
          </div>
        </div>
        <div className=" py-4 buyProduct">
          <NavLink to="/delivery">
            <button
              className="btn btn-outline-dark py-2 buyProduct"
              // onClick={() => handleBuyProduct()}
            >
              Buy Product
            </button>
          </NavLink>
        </div>
        {/* <div className="container product_item ">
          <div className="col-md-12 buyProduct_item header">
            Sản phẩm bạn đã chọn
          </div>
          <div className="row py-4 buyProduct">
            <div className="col-md-2 buyProduct_item">STT</div>
            <div className="col-md-2 buyProduct_item">IMAGE</div>
            <div className="col-md-2 buyProduct_item">SIZE</div>
            <div className="col-md-2 buyProduct_item">QUANTITY</div>
            <div className="col-md-2 buyProduct_item">COLOR</div>
            <div className="col-md-2 buyProduct_item  ">TOTAL</div>
          </div>
          {BuyProduct()}
          <div className="row py-4 buyProduct">
            <div className="col-md-12 buyProduct_item">
              INTO MONEY = {totalPrice}$
            </div>
          </div>
          <div className=" py-4 buyProduct">
            <NavLink to="/delivery">
              <button
                className="btn btn-outline-dark py-2 buyProduct"
                // onClick={() => handleBuyProduct()}
              >
                Buy Product
              </button>
            </NavLink>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BuyCart;
