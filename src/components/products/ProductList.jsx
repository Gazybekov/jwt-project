import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { getProducts, products, pages } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getProducts();
  }, []);

  const getPagesCount = () => {
    const pageCountArr = [];
    for (let i = 1; i <= pages; i++) {
      pageCountArr.push(i);
    }
    return pageCountArr;
  };

  if (currentPage < 1) {
    setCurrentPage(1);
  }
  if (currentPage > pages) {
    setCurrentPage(pages);
  }
  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);
  return (
    <div>
      <h1>PRODUCT LIST</h1>
      {products.map((elem) => (
        <ProductItem elem={elem} key={elem.id} />
      ))}
      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        {getPagesCount().map((item) =>
          item === currentPage ? (
            <Pagination.Item
              onClick={() => setCurrentPage(item)}
              active
              key={item}
            >
              {item}
            </Pagination.Item>
          ) : (
            <Pagination.Item onClick={() => setCurrentPage(item)} key={item}>
              {item}
            </Pagination.Item>
          )
        )}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ProductList;
