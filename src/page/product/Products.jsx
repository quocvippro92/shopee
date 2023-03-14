import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  changePagination,
  filterCategory,
} from "../../redux/slice/sliceProducts";
import { fetchProducts } from "../../redux/action/productAction";

const Products = () => {
  const products = useSelector((state) => state.authReducerProducts.products);
  const pagination = useSelector(
    (state) => state.authReducerProducts.pagination
  );
  console.log(pagination.total);
  const productPagination = useSelector(
    (state) => state.authReducerProducts.pagination
  );
  const search = useSelector((state) => state.authReducerProducts.search);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
    setLoading(false);
  }, [pagination, search]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    dispatch(filterCategory(cat));
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filterProduct("");
            }}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filterProduct("men's clothing");
            }}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filterProduct("women's clothing");
            }}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filterProduct("jewelery");
            }}
          >
            Jewelery{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filterProduct("electronics");
            }}
          >
            Electronic
          </button>
        </div>
        {products.map((product, index) => {
          return (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 text-center p-4 ">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text  lead fw-bold">${product.price}</p>
                  <NavLink
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
          <Pagination
            onChange={(page, pageSize) => {
              dispatch(changePagination({ page: page, limit: pageSize }));
            }}
            current={Number(productPagination.page)}
            total={Number(productPagination.total)}
            pageSize={Number(productPagination.limit)}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
