import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/Green Vintage Illustrative Food Logo (2).png";
import Productfromdata from '../Components/Productfromdata'
import {
  UilShoppingCart,
  UilSearch,
  UilArrowCircleDown,
} from "@iconscout/react-unicons";
import { motion } from "framer-motion";

import {
  UilBars,
  UilTimes,
  UilTruck,
  UilTrees,
  UilShoppingBag,
} from "@iconscout/react-unicons";
function Products() {
  const navigate = useNavigate("");
  const productsData = [
    {
      id: 1,
      name: "Fruits",
      image:
        "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg?t=st=1719064484~exp=1719068084~hmac=6757ec208c07a6ddeada53506e531bb87a50b36d5492b5ae1f38b714656722f9&w=900",
    },
    {
      id: 2,
      name: "Vegetables",
      image:
        "https://img.freepik.com/free-photo/top-view-assortment-vegetables-paper-bag_23-2148853335.jpg?t=st=1719064520~exp=1719068120~hmac=88036125a9c1744f10b99cf6fa235b3a46637c61d5d317e55514a8caaecad113&w=900",
    },
    {
      id: 3,
      name: "Dairy",
      image:
        "https://img.freepik.com/free-photo/milk-glass-bottle-background-farm_1142-40886.jpg?t=st=1719064549~exp=1719068149~hmac=344bd7d5c47a84ca603dc0d622ebf3a1703d753ad330f94e612a0ae8b9142413&w=740",
    },
    {
      id: 4,
      name: "Pulses",
      image:
        "https://img.freepik.com/free-photo/top-view-different-lentils-mini-white-spice-bowls-black-stone-table-vertical_176474-2189.jpg?t=st=1719064575~exp=1719068175~hmac=31efd6d405aacc08078607937ab6153ee4d4458bcea589c0dbf77391b7afbc8f&w=360",
    },
    {
      id: 5,
      name: "Cereals",
      image:
        "https://img.freepik.com/premium-photo/wheat-grain-bag_54391-136.jpg?w=900",
    },
  ];



  const [showFruits, setShowFruits] = useState(false);

  const handleShopNow = (category) => {
    if (category === "Fruits") {
      setShowFruits(true);
    } else {
      setShowFruits(false);
    }
  };
  const userName = JSON.parse(localStorage.getItem('user'));
  const [range, setRange] = useState(50);
  const handleRange = (e) => {
    setRange(e.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="flex justify-between p-5">
         <div className="flex justify-evenly space-x-2">
         <motion.div
            className="bg-green-700 p-1 rounded-full cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              onClick={() => navigate("/")}
              src={image}
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            
          </motion.div>
          <p   style={{ fontFamily: "'Unbounded', sans-serif" }} className="text-green-800 text-2xl mt-2   items-center  font-bold">Prakrutik Aahar Kendra</p>

         </div>

                   <motion.div
            className="flex space-x-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search here"
                className="border text-center w-28 md:w-52 sm:w-72 border-green-600 rounded-full py-2 px-4"
              />
              <UilSearch className="text-green-700 h-8 w-8 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <UilShoppingCart
              className="text-green-700 h-8 w-8 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
          </motion.div>
        </nav>
      </header>
      <div className="flex">
        {/* <motion.aside
          className="w-64 p-5 border-r bg-white shadow-md"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Categories</h3>
            <ul>
              {['Fruits', 'Vegetables', 'Dairy', 'Pulses', 'Cereals'].map(category => (
                <li key={category} className="flex items-center mb-2">
                  <input type="checkbox" id={category.toLowerCase()} name={category.toLowerCase()} className="mr-2"/>
                  <label htmlFor={category.toLowerCase()}>{category}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Price</h3>
            <input type="range" min="0" max="100" className="w-full" value={range} onChange={handleRange} />
            <div className="flex justify-between text-sm mt-2">
              <span>₹0</span>
              <span>₹{range}</span>
              <span>₹100</span>
            </div>
          </div>
        </motion.aside> */}
        <main className="flex-1 space-y-5 p-2">
          <div className="relative text-center items-center justify-center">
            <motion.img
              className="h-[400px] w-full rounded-md object-cover"
              src="https://img.freepik.com/free-photo/top-view-vegetables-fruits-bag_23-2148949707.jpg?t=st=1719064999~exp=1719068599~hmac=73f0365230da771bd2e62b9c201d771cfc333ec8c985781ae0a8328d5a7b2f2d&w=1060"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              className="absolute top-10 right-20 text-gray-800 text-lg font-medium text-shadow-md p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Grocery & Herbs
              {userName && (
                        <div className="flex  items-center mt-2">
                            <h2 className=" mr-96">Welcome, {userName}!</h2>

                        </div>
                    )}
            </motion.p>
            <motion.p
              className="absolute top-20 right-20 text-gray-800 text-2xl font-medium text-shadow-md p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              <p className="text-justify">Discover the Pure Organic Shop</p>
            </motion.p>
            <motion.p
              className="absolute top-20 right-20 text-gray-800 text-2xl font-medium text-shadow-md p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              <p className="text-justify">Discover the Pure Organic Shop</p>
            </motion.p>


            <motion.p
              className="absolute bottom-24 right-20 text-xl bg-green-700 rounded-lg text-white p-1 flex items-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => navigate("/shop")}
            >
              Shop Now <UilArrowCircleDown className="ml-2" />
            </motion.p>
            
          <motion.p
              className=" absolute top-[86%] w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => navigate("/shop")}
            >
              <>
              <div className="px-10 ml-10 mr-10 rounded-md   shadow-lg bg-white py-14 flex justify-evenly">
              <div className="">
                <UilShoppingBag className="ml-10  bg-[#96dc39]  rounded-md" />
                <p className=""> Free Shipping</p>
              </div>
              <div>
                <UilTrees className="ml-10 bg-[#FF8E8F] rounded-md" />
                <p>100% Natural </p>
              </div>
              <div>
                <UilTruck className="ml-10 bg-[#FFDE95] rounded-md" />
                <p>Fast Delivery</p>
              </div>
              <div>
                <img
                  src="https://cdn-icons-png.freepik.com/256/5928/5928557.png?ga=GA1.1.2096347703.1710152248"
                  alt=""
                  className="h-6 w-6 ml-16 bg-emerald-300 rounded-md"
                />
                <p>Curated Products </p>
              </div>
            </div>
</>
            </motion.p>

          </div>


          
<div className="py-32">
  
<h1 className="text-2xl font-semibold mb-5">Products</h1>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.3,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {productsData.map((product) => (
              <motion.div
                key={product.id}
                className="border p-1 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <a
                  onClick={() => handleShopNow(product.name)}
                  className="group relative block cursor-pointer"
                >
                  <div className="relative h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-medium text-white">
                      {product.name}
                    </h3>
                    <span className="mt-3 inline-block bg-white text-black px-5 py-2 text-xs font-medium uppercase tracking-wide">
                      Shop Now
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
          {showFruits && (
            <>
<Productfromdata/>
            </>
          )}
</div>
<div>
  <div></div>
<div className="relative h-[400px] w-full  overflow-hidden">
  <motion.img
    className="h-full w-full object-cover"
    src="https://img.freepik.com/premium-photo/mixed-various-spices-white-background_693630-3582.jpg?w=900"
    alt="Banner"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  />
  <div className="absolute inset-0 bg-black opacity-50"></div>
  
  <div className="absolute inset-2  border-2 border-white opacity-50"></div>
  
  <p className="absolute top-[40%] text-4xl text-white font-bold left-[35%] "   style={{ fontFamily: "'Playwrite NL', sans-serif" }}>Spices and Seasonings </p>
  <button className="absolute bottom-[35%] bg-amber-500 text-sm w-52  text-white left-[44%] h-10 p-1 rounded">Shop Now</button>
</div>

</div>
        </main>
      </div>
    </div>
  );
}

export default Products;
