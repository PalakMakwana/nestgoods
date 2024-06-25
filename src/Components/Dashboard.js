import React, { useState } from "react";
import ProductForm from "./ProductForm";


function Dashboard() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="dashboard">
      <ProductForm addProduct={addProduct} />
      
    </div>
  );
}

export default Dashboard;
