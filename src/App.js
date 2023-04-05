import React from "react";
import axios from "axios";
import "./App.css"



const { useState, useEffect } = React;

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    price: "",
    description: "",

  });

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    }
    fetchProducts();
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  function handleAddProduct(event) {
    event.preventDefault();
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: Date.now(),
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
      },
    ]);
    setNewProduct({
      name: "",
      price: "",
      description: "",
    });
  }

  function handleEditProduct(event, id) {
    event.preventDefault();
    const editedProduct = products.find((product) => product.id === id);
    setEditProduct({
      id: editedProduct.id,
      name: editedProduct.name,
      price: editedProduct.price,
      description: editedProduct.description,
    });
  }

  function handleUpdateProduct(event) {
    event.preventDefault();
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editProduct.id ? editProduct : product
      )
    );
    setEditProduct({
      id: null,
      name: "",
      price: "",
      description: "",
    });
  }

  function handleDeleteProduct(event, id) {
    event.preventDefault();
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  }

  return (
    <div className="container">
      <h1 className="title">Add Product</h1>
      <form className="form" onSubmit={handleAddProduct}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form>


      <h1>Update Product</h1>

      {editProduct.id && (
        <form className="form" onSubmit={handleUpdateProduct}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editProduct.name}
            onChange={(event) =>
              setEditProduct((prevProduct) => ({
                ...prevProduct,
                name: event.target.value,
              }))
            }
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={editProduct.price}
            onChange={(event) =>
              setEditProduct((prevProduct) => ({
                ...prevProduct,
                price: event.target.value,
              }))
            }
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={editProduct.description}
            onChange={(event) =>
              setEditProduct((prevProduct) => ({
                ...prevProduct,
                description: event.target.value,
              }))
            }
          />
          <button type="submit">Update Product</button>
        </form>
      )}


      <h1>Products list</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button onClick={(event) => handleEditProduct(event, product.id)}>
              Edit
            </button>
            <button onClick={(event) => handleDeleteProduct(event, product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    
    </div>
  );
}

export default App;