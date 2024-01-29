import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { createProduct, categories, getCategories } = useProducts();
  console.log(categories);
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("image", img);
    newProduct.append("category", category);
    createProduct(newProduct);
    navigate("/products");
  };
  return (
    <div>
      <h2>Add Product</h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="text"
      />
      <input
        onChange={(e) => setImg(e.target.files[0])}
        placeholder="img"
        type="file"
        accept="image/"
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Choose category</option>
        {categories.map((elem) => (
          <option value={elem.id} key={elem.id}>
            {elem.title}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Add Product</button>
    </div>
  );
};

export default AddProduct;
