import React from "react";
import { useDispatch } from "react-redux";
import { renderPageProduct } from "../redux/slice/productSlice";
const Paginatinal = ({ data }) => {
  const dispatch = useDispatch();
  const active = false;
  const totalPage = Math.ceil(data.length / 10);
  const handlePageNumber = (number) => {
    dispatch(renderPageProduct(number));
    active=true
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
      <div className="previous">{"<"}</div>
      {renderNumberPage()}
      <div className="previous">{`>`}</div>
    </div>
  );
};

export default Paginatinal;
