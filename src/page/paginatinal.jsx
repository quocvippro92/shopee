import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, renderPageProduct } from "../redux/slice/productSlice";
const Paginatinal = ({ data }) => {
  const dispatch = useDispatch();
  const totalPage = Math.ceil(data.length / 10);
  const handlePageNumber = (number) => {
    dispatch(renderPageProduct(number));
  };
  const renderNumberPage = () => {
    let pages = [];
    for (let page = 1; page <= totalPage; page++) {
      pages.push(<div className="number" onClick={() => handlePageNumber(page)}>{page}</div>);
    }
    return pages;
  };
  return (
    <div className="pageNumber">
      <div className="previous" >{"<"}</div>
      {renderNumberPage()}
      <div className="previous">{`>`}</div>
    </div>
  );
};

export default Paginatinal;
