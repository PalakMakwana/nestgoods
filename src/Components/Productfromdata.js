import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { UilFilter } from '@iconscout/react-unicons';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import ProductForm from "./ProductForm";
import all from "../images/All Products.png";
import { useCart } from "react-use-cart";
import Select from "react-select";
import { Link } from "react-router-dom";
import toast, { Toaster, ToastBar } from 'react-hot-toast';


const ProductFromData = ({ showActions, showWeight, showcart }) => {
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isEdit, setIsEdit] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [selectedWeightAndPrice, setSelectedWeightAndPrice] = useState({});
  const { addItem } = useCart();

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
    if (category === "all") {
      setFilterData(productData);
    } else {
      setFilterData(
        productData.filter((product) => product.category === category)
      );
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
      setProductData(
        productData.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setFilterData(
        filterData.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsEdit(false);
      setEditProductData(null);
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleWeightChange = (productId, selectedOption) => {
    setSelectedWeightAndPrice((prevState) => ({
      ...prevState,
      [productId]: selectedOption,
    }));
  };

  const handleAddToCart = (product) => {

    if (!auth.currentUser) {
      alert("Please log in to add items to the cart.");

      return;
    }

    const selectedOption = selectedWeightAndPrice[product.id];
    if (selectedOption) {
      addDoc(collection(db, "cart"), {
        ...product,
        price: selectedOption.price,
        weight: selectedOption.value,
        quantity: 1,
        User_uid: auth?.currentUser?.uid,
        User_name: auth?.currentUser?.displayName,
      })
        .then((res) => {
          console.log(res);
          toast.success('Items are added to cart')
        })
        .catch((err) => {
          console.log(err);
        });
      addItem({
        ...product,
        price: selectedOption.price,
        weight: selectedOption.value,
      });
    } else {
     toast.error('select weight & price ')
    }
  };

  const categories = [
    { name: "all", image: all },
    {
      name: "fruits",
      image: "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg",
    },
    {
      name: "vegetables",
      image: "https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg",
    },
    {
      name: "cereals",
      image: "https://img.freepik.com/premium-photo/wheat-grain-bag_54391-136.jpg",
    },
    {
      name: "pulses",
      image: "https://img.freepik.com/free-photo/top-view-different-lentils-mini-white-spice-bowls-black-stone-table-vertical_176474-2189.jpg",
    },
    {
      name: "dairy",
      image: "https://img.freepik.com/free-photo/milk-glass-bottle-background-farm_1142-40886.jpg",
    },
  ];

  return (
    <div className="p-5 space-y-5">
      <div className="flex text-gray-700 text-xl font-semibold space-x-2">
        <p>Filter</p><UilFilter />
      </div>
      <div className="grid h-[] grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`cursor-pointer p-2 rounded-lg text-xl border ${
              selectedCategory === category.name ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleFilter(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-24 object-cover shadow-lg rounded-lg"
            />
            <p className="text-center mt-2">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {filterData.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex flex-col justify-between"
          >
            <Link to={`/product/${product.id}`}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.ItemName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
            </Link>
            <div className="flex-grow">
              <h2 className="text-lg capitalize font-semibold text-gray-900">
                {product.ItemName}
              </h2>
              <p className="text-sm capitalize text-gray-600">
                <span className="capitalize font-semibold">Category:</span> {product.category}
              </p>
              {showWeight && (
                <Select
                  className="mt-2"
                  options={
                    product.weightAndPrice
                      ? product.weightAndPrice.map((item) => ({
                          value: item.weight,
                          label: `${item.weight} - ${item.price}`,
                          price: item.price,
                        }))
                      : []
                  }
                  onChange={(selectedOption) =>
                    handleWeightChange(product.id, selectedOption)
                  }
                />
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              {showcart && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
              {showActions && (
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <ProductForm
              initialValues={editProductData}
              handleSave={handleSave}
              isEdit={isEdit}
              handleCloseModal={() => {
                setIsEdit(false);
                setEditProductData(null);
              }}
            />
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
