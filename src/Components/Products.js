import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../images/Green Vintage Illustrative Food Logo (2).png";
import Productfromdata from "../Components/Productfromdata";
import {
  UilShoppingCart,
  UilSearch,
  UilArrowCircleDown,
} from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { auth } from '../Firebase';
import {
  UilBars,
  UilTimes,
  UilTruck,
  UilTrees,
  UilShoppingBag,
} from "@iconscout/react-unicons";
import { signOut } from "firebase/auth";
import { CartProvider, useCart } from "react-use-cart";
function Products() {
  const navigate = useNavigate("");
  const { addItem } = useCart();

  const handleLogout = () => {
    signOut(auth)
        .then(() => {
            localStorage.removeItem('loggedin');
            navigate('/');
            // toast.success('User Logged Out')
        })
        .catch((error) => {
            console.log('Error during logout:', error.message);
        });
};
// const userData = JSON.parse(localStorage.getItem("username"));
// const userName = userData ? userData.username : null;
  return (
    <div className="bg-gray-50 min-h-screen">
       <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="flex flex-wrap justify-between items-center p-2">
        <div className="flex items-center space-x-2">
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
          <p
            style={{ fontFamily: "'Unbounded', sans-serif" }}
            className="text-green-800 text-2xl mt-2 font-bold"
          >
            Prakrutik Aahar Kendra
          </p>
        </div>

        <motion.div
          className="flex space-x-4 items-center mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="border text-center w-28 sm:w-36 md:w-52 border-green-600 rounded-full py-2 px-4"
            />
            <UilSearch className="text-green-700 h-8 w-8 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2" />
          </div>
          <UilShoppingCart
            className="text-green-700 h-8 w-8 cursor-pointer"
            onClick={() => navigate("/cart")}
          />
         
          <Link to='/orderhistory' className="bg-gray-800 hover:bg-gray-500 text-white py-2 px-4 rounded-full">Order History</Link>
          <button
            className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </motion.div>
       
      </nav>
    </header>
      <div className="flex">
        <main className="flex-1 space-y-5 p-2">
          <div className="relative text-center items-center justify-center">
          <div className="flex space-x-4 relative overflow-hidden">
          <motion.img
              className="h-[410px] w-[580px]  shadow-lg  rounded-md object-cover"
              src="https://img.freepik.com/premium-photo/yellow-pineapple-background-social-media-advertising-fruit-citrus-vitamin-c-generative-ai_90099-9602.jpg?w=1060"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
           <div className="space-y-2">
           <motion.img
              className="h-[200px] shadow-lg rounded-md object-cover"
              src="https://img.freepik.com/free-photo/fresh-strawberries-wooden-table_1150-8053.jpg?t=st=1719680720~exp=1719684320~hmac=3752966fb37fa78c07d82f97cd13c65166c83cc4af3a80bd0df70163e6d8a684&w=900"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
              <motion.img
              className="h-[200px] w-[290px] shadow-lg rounded-md object-cover"
              src="https://img.freepik.com/premium-photo/blueberry-bliss-16k-uhd-cinematic-natural-color-wallpaper_1106493-26291.jpg?w=740"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1,opacity: 1, x:5  }}
              transition={{ duration: 0.5 }}
            />
           </div>
           
             <motion.img
              className="h-[410px] w-[340px] shadow-lg  rounded-md object-cover"
              src="https://img.freepik.com/premium-photo/fresh-piece-cheese_378630-5125.jpg?w=1060"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="absolute inset-0 rounded-lg  bg-black opacity-30"></div>
            <motion.p
              className="absolute top-4 left-10 text-gray-100 text-lg font-medium text-shadow-md p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Grocery & Herbs
            </motion.p>
            <motion.p
              className="absolute top-14 left-10 text-gray-200 text-2xl font-medium text-shadow-md p-2 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              <p className="text-justify">Discover the Pure Organic Shop</p>
            </motion.p> 
            <motion.p
              className="absolute bottom-24 left-12 text-xl bg-white rounded-lg text-green-700 p-1 flex items-center cursor-pointer"
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
                <div className="px-10 ml-10 mr-10 rounded-md shadow-lg bg-[#EEF7FF] py-14 flex justify-evenly">
                  <div className="">
                    <UilShoppingBag className="ml-10  bg-[#96DC39]  rounded-md" />
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
          <hr className="border-gray-500 "/>
            <h1 className="text-2xl font-semibold">Products</h1>
            <motion.div
              className=""
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
              <Productfromdata showActions={false}  showWeight={true}  showcart={true}/>
            </motion.div>
          </div>
          <hr className="border-gray-500 "/>
          <div>
            
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
              <p
                className="absolute top-[40%] text-4xl text-white font-bold left-[35%] "
                style={{ fontFamily: "'Playwrite NL', sans-serif" }}
              >
                Spices and Seasonings{" "}
              </p>
              <button className="absolute bottom-[35%] bg-amber-500 text-sm w-52  text-white left-[44%] h-10 p-1 rounded">
                Shop Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Products;