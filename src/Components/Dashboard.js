import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";

function Dashboard() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="dashboard">
      <ProductForm addProduct={addProduct} />
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
