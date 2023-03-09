import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { getCustomerCart } from "../../redux/action/cartAction";
import "./delivery.scss";
import axios from "axios";
import { Radio, Space } from "antd";
import { createProductAdmin } from "../../redux/action/actionProductAdmin";

const Delivery = () => {
  const cartProduct = useSelector((state) => state.authReducerCart.cartList);

  const account = useSelector((state) => state.authReducer.user);
  const totalPrice = cartProduct.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerCart(account.id));
  }, []);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      address: "",
      city: "",
      phone: "",
      ward: "",
      district: "",
      textarea: "",
    },
    validationSchema: yup.object().shape({
      firstname: yup
        .string()
        .min(5, "your name must be at least 5 characters!")
        .max(30, "your name must be under 30 characters")
        .required("you have not entered firstname"),
      address: yup.string().required("you have not entered address"),
      city: yup.string().required("you have not entered city"),
      ward: yup.string().required("you have not entered ward"),
      district: yup.string().required("you have not entered district"),
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required to enter number"),
      textarea: yup.string(),
    }),
    onSubmit: (values) => {
      const listProduct = cartProduct.map((product) => ({
        product_id: product.product_id,
        customer_id: product.customer_id,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        title: product.title,
        image: product.image,
        size: product.size,
        color: product.color,
      }));
      const cloneDataCreate = {
        email: account.email,
        name: values.firstname,
        phone: values.phone,
        address: values.address,
        city: values.city,
        district: values.district,
        ward: values.ward,
        textarea: values.textarea,
        product: listProduct,
        totalPrice: totalPrice + cod,
      };

      dispatch(createProductAdmin(cloneDataCreate));
    },
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [wards, setWards] = useState([]);
  const [cod, setCod] = useState(0);
  const handleCheckInput = (value) => {
    setCod(value.target.value);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://provinces.open-api.vn/api/p/",
    })
      .then((result) => {
        setProvinces(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://provinces.open-api.vn/api/d/",
    })
      .then((result) => {
        setDistricts(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://provinces.open-api.vn/api/w/",
    })
      .then((result) => {
        setWards(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const BuyProduct = () => {
    return cartProduct.map((cart, index) => (
      <div className="container-checkout" key={cart.id} name="cart">
        <div className="item-checkout row">
          <div className="col-md-4 col-ms-12 img-item">
            <img src={cart.image} alt={cart.title} height={120} width={120} />
          </div>
          <div className="col-md-4 col-ms-12 title-item">
            <p>{cart.title}</p>
          </div>
          <div className="col-md-4 col-ms-12 price-item">
            {cart.quantity * cart.price}$
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 checkout-left">
          <form onSubmit={formik.handleSubmit}>
            <div className="Contact-Info">
              <div className="row">
                <div className="col-md-6 col-ms-12">
                  <h4>Thông Tin Liên Hệ</h4>
                </div>
                {account === null ? (
                  <div className="col-md-6 col-ms-12">
                    <p>
                      bạn chưa có tài khoản? <a href="/login">Đăng Nhập</a>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={`${account.email}`}
                  />
                </div>
              </div>
            </div>
            <div className="delivery-address">
              <div>
                <h4>Địa chỉ giao hàng</h4>
              </div>
              <div>
                <div className="name">
                  <div className="name-left">
                    <input
                      className="ten"
                      name="firstname"
                      defaultValue={formik.values.firstname}
                      onChange={formik.handleChange}
                      type="text"
                      placeholder="Họ và tên"
                    />
                    <div>
                      {formik.errors.firstname && formik.touched.firstname && (
                        <p className="erro">{formik.errors.firstname}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    className="phone"
                    name="phone"
                    defaultValue={formik.values.phone}
                    onChange={formik.handleChange}
                    type="number"
                    placeholder="sdt liên hệ"
                  />
                  <div>
                    {formik.errors.phone && formik.touched.phone && (
                      <p className="erro">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    defaultValue={formik.values.address}
                    onChange={formik.handleChange}
                    className="address"
                    name="address"
                    type="text"
                    placeholder="địa chỉ Số nhà"
                  />
                  <div>
                    {formik.errors.address && formik.touched.address && (
                      <p className="erro">{formik.errors.address}</p>
                    )}
                  </div>
                </div>
                <select
                  className="country"
                  name="city"
                  placeholder="Quốc Gia"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.city}
                >
                  {provinces.map((province) => (
                    <option value={province.name} key={province.code}>
                      {province.name}
                    </option>
                  ))}
                  {formik.errors.city && formik.touched.city && (
                    <p className="erro">{formik.errors.city}</p>
                  )}
                </select>
                <select
                  className="country"
                  name="district"
                  placeholder="Quốc Gia"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.district}
                >
                  {districts.map((district) => (
                    <option value={district.name} key={district.code}>
                      {district.name}
                    </option>
                  ))}
                  {formik.errors.district && formik.touched.district && (
                    <p className="erro">{formik.errors.district}</p>
                  )}
                </select>
                <select
                  className="country"
                  name="ward"
                  placeholder="Quốc Gia"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.ward}
                >
                  {wards.map((ward) => (
                    <option value={ward.name} key={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                  {formik.errors.ward && formik.touched.ward && (
                    <p className="erro">{formik.errors.ward}</p>
                  )}
                </select>
                <textarea
                  name="textarea"
                  id="note"
                  className="field__input"
                  data-bind="note"
                  placeholder="Ghi chú"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </div>
            <div className="send">
              <button type="submit" className="btn btn-outline-dark btnSend">
                Đặt Hàng
              </button>
            </div>
          </form>
        </div>
        <div className="col-6 checkout-right">
          <BuyProduct />
          <Radio.Group onChange={handleCheckInput} value={cod}>
            <Space direction="vertical">
              <Radio value={5}>Vận chuyển chậm COD: 5$</Radio>
              <Radio value={10}>Vận chuyển nhanh COD: 10$</Radio>
            </Space>
          </Radio.Group>
          <div className="total">
            <div className="tong">
              <h3>Tổng</h3>
            </div>
            <div className="totalprice">
              <h3>{totalPrice + cod}$</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
