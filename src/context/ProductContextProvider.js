import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../helpers/const";
import axios from "axios";

const productContext = createContext();
export const useProducts = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  oneProdcut: {},
  categories: [],
  pages: 6,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
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

  console.log(getConfig());

  const values = {
    categories: state.categories,
    getCategories,
    createProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
