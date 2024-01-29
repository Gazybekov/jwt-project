import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { categories, getCategories, getOneProduct, oneProduct, editItem } =
    useProducts();
  const [title, setTitle] = useState(oneProduct.title);
  const [description, setDescription] = useState(oneProduct.description);
  const [price, setPrice] = useState(oneProduct.price);
  const [category, setCategory] = useState(oneProduct.category);
  const [img, setImg] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);
  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category);
    }
  }, [oneProduct]);

  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("category", category);
    if (img) {
      newProduct.append("image", img);
    }
    editItem(id, newProduct);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        type="text"
        value={title}
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        type="text"
        value={description}
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        type="text"
        value={price}
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
      <button onClick={handleClick}>Save</button>
    </div>
  );
};

export default EditProduct;
