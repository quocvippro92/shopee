import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/action/productAction";
import { createCart } from "../../redux/action/cartAction";

const Product = () => {
  const product = useSelector((state) => state.authReducerProduct.product);
  const user = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct(id));
    setLoading(false);
  }, []);

  const [size, setSize] = useState("");
  const [color,setColor] = useState("")
  const handleClickSize = (e) => {
    const value = e.target.value;
    setSize(value);
  };
  const handleColor =(value)=>{
    console.log(value.target.value);
  }
  const handleAddCart = (product) => {
    console.log(product.size.value);
    if (user !== null) {
      dispatch(
        createCart({
          product_id: product.id,
          customer_id: user.id,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          title: product.title,
          image: product.image,
          size: size,
        })
      );
    } else {
      alert("vui lòng đăng nhập");
    }
  };
  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={80} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={180} />
          <div className="d-flex ">
            <Skeleton height={50} width={100} />
            <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
          </div>
        </div>
      </>
    );
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height={400}
            width={400}
          />
        </div>
        <div className="col-md-6 ">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5"> {product.title}</h1>
          <p className="lead fw-bold">
            Rating{product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <div>
            <select name="size" onChange={(value) => handleClickSize(value)}>
              <option>Size</option>
              <option value="X">X</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XS">XS</option>
            </select>
          </div>
          <div >
            <div className="color-item">màu sắc:</div>
            <div className="color">
              <div className="colorProduct " onClick={(value)=>handleColor(value)} >
                <label>{ product.mau && product.mau.xanh}</label>
                <img className="selectColor" src="/assets/anh2.jpg" alt="Background"/>
              </div>
              <div className="colorProduct">
                <div>nâu</div>
                <img className="selectColor" src="/assets/anh4.jpg" alt="Background"/>
              </div>
              <div className="colorProduct" >
                <div>kem</div>
                <img className="selectColor" src="/assets/anh3.jpg" alt="Background"/>
              </div>
              
              
            </div>
          </div>

          <h3 className="display-6 fw-bold my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <NavLink
            to={user === null ? "/login" : ``}
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => handleAddCart(product)}
          >
            Add to Cart
          </NavLink>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
