import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ProductForm from "./ProductForm";
import all from '../images/All Products.png';

const ProductFromData = ({ showActions }) => {
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEdit, setIsEdit] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ProductData"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductData(data);
        setFilterData(data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilterData(productData);
    } else {
      setFilterData(productData.filter((product) => product.category === category));
    }
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditProductData(product);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ProductData", id));
      setProductData(productData.filter((product) => product.id !== id));
      setFilterData(filterData.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      const productRef = doc(db, "ProductData", updatedProduct.id);
      await updateDoc(productRef, updatedProduct);
      setProductData(productData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
      setFilterData(filterData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
      setIsEdit(false);
      setEditProductData(null);
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const categories = [
    { name: 'all', image: all },
    { name: 'fruits', image: 'https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg' },
    { name: 'vegetables', image: 'https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg' },
    { name: 'cereals', image: 'https://img.freepik.com/premium-photo/wheat-grain-bag_54391-136.jpg' },
    { name: 'pulses', image: 'https://img.freepik.com/free-photo/top-view-different-lentils-mini-white-spice-bowls-black-stone-table-vertical_176474-2189.jpg' },
    { name: 'dairy', image: 'https://img.freepik.com/free-photo/milk-glass-bottle-background-farm_1142-40886.jpg' }
  ];

  return (
    <div className="p-5">

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`cursor-pointer p-2 rounded-lg border ${selectedCategory === category.name ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => handleFilter(category.name)}
          >
            <img src={category.image} alt={category.name} className="w-full h-24 object-cover shadow-lg rounded-lg" />
            <p className="text-center mt-2">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filterData.map((product) => (
          <article key={product.id} className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            {product.image && (
              <img
                src={product.image}
                alt={product.ItemName}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg text-white font-semibold">{product.ItemName}</h2>
                <p className="block text-xs text-white/90 mt-2">
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
                <p className="block text-xs text-white/90 mt-1">
                  <span className="font-semibold">Weight:</span> {product.weight}
                </p>
                <p className="block text-xs text-white/90 mt-1">
                  <span className="font-semibold">Price:</span> ₹{product.price}
                </p>
               {showActions &&( <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      {isEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <ProductForm initialValues={editProductData} handleSave={handleSave} isEdit={isEdit} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setIsEdit(false);
                setEditProductData(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFromData;
