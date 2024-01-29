import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../helpers/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const productContext = createContext();
export const useProducts = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  oneProduct: {},
  categories: [],
  pages: 13,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload.results };
    case ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneProduct: action.payload };
    case ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const navigate = useNavigate();
  //! Config
  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };
  //! CREATE
  const createProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${API}/products/`, newProduct, getConfig());
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  //! CATEGORIES
  const getCategories = async () => {
    const res = await axios(`${API}/category/list/`, getConfig());
    dispatch({
      type: ACTIONS.GET_CATEGORIES,
      payload: res.data.results,
    });
  };
  //! GET
  const getProducts = async () => {
    try {
      const { data } = await axios(
        `${API}/products/${window.location.search}`,
        getConfig()
      );
      dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //! DELETE
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}/`, getConfig());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  //! GET_ONE_PRODUCT
  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}/products/${id}/`, getConfig());
      dispatch({
        type: ACTIONS.GET_ONE_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //! EDIT
  const editItem = async (id, newProduct) => {
    try {
      await axios.patch(`${API}/products/${id}/`, newProduct, getConfig());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const values = {
    categories: state.categories,
    getCategories,
    createProduct,
    getProducts,
    products: state.products,
    pages: state.pages,
    deleteItem,
    getOneProduct,
    oneProduct: state.oneProduct,
    editItem,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
