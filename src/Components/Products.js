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
import Cart from './Cart';
import OrderHistory from './OrderHistory';
import { signOut } from "firebase/auth";
import { CartProvider, useCart } from "react-use-cart";
import Nav from './Nav'
function Products() {
  const navigate = useNavigate("");
  const { addItem } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const toggleCart = (status) => {
    setShowCart(status);
    setShowOrderHistory(false);
    setShowHome(false);
  };

  const toggleOrderHistory = (status) => {
    setShowOrderHistory(status);
    setShowCart(false);
    setShowHome(false);
  };

  const toggleHome = (status) => {
    setShowHome(status);

    setShowCart(false);
    setShowOrderHistory(false);
  };


  return (
    <div className="bg-gray-50 min-h-screen">
     <Nav toggleCart={toggleCart} toggleOrderHistory={toggleOrderHistory}  toggleHome={toggleHome} />
      <div className="flex">
        <main className="flex-1 space-y-5 p-2">

        {showCart ? (
            <Cart toggleHome={toggleHome} />
          ) : showOrderHistory ? (
            <OrderHistory />
          ) : showHome ? (
   <>
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
              className="h-[200px] w-[400px] ml-1 shadow-lg rounded-md object-cover"
              src="https://img.freepik.com/free-photo/fresh-strawberries-wooden-table_1150-8053.jpg?t=st=1719680720~exp=1719684320~hmac=3752966fb37fa78c07d82f97cd13c65166c83cc4af3a80bd0df70163e6d8a684&w=900"
              alt="Banner"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
              <motion.img
              className="h-[200px] w-[400px] shadow-lg rounded-md object-cover"
              src="https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_22726_16560822540037952.jpg"
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
   </>):(null)}
        </main>
      </div>
    </div>
  );
}
export default Products;