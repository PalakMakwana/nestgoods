import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import image from "../images/Green Vintage Illustrative Food Logo (2).png";
import { UilShoppingCart, UilHome,UilSignOutAlt } from "@iconscout/react-unicons";
import { UilHistory } from "@iconscout/react-unicons";
import toast from "react-hot-toast";

const Nav = ({ toggleCart, toggleOrderHistory, toggleHome }) => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedin");
        navigate("/");
        toast.success("User Logged Out");
      })
      .catch((error) => {
        console.log("Error during logout:", error.message);
      });
  };

  const handleCartToggle = () => {
    setShowCart(!showCart);
    setShowOrderHistory(false);
    toggleCart(!showCart);
  };

  const handleOrderHistoryToggle = () => {
    setShowOrderHistory(!showOrderHistory);
    setShowCart(false);
    toggleOrderHistory(!showOrderHistory);
  };

  const handleHomeClick = () => {
    setShowCart(false);
    setShowOrderHistory(false);
    toggleHome(true);
  };

  return (
    <div>
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
            <div
              onClick={handleHomeClick}
              className=" text-gray-800 py-1 cursor-pointer px-4 rounded-full flex"
            >

              <p className="text-gray-800 hover:transition hover:scale-110 hover:text-amber-600 hover:font-bold  ">Home</p>
            </div>

            <div
              onClick={handleCartToggle}
              className=" text-gray-800 py-1 cursor-pointer px-4 rounded-full flex"
            >

              <p className="text-gray-800 hover:transition hover:scale-110 hover:text-amber-600 hover:font-bold   ">Cart</p>
            </div>

            <div
              onClick={handleOrderHistoryToggle}
              className=" text-gray-800 py-1 cursor-pointer px-4 rounded-full flex"
            >

              <p className=" text-gray-800 hover:transition hover:scale-110 hover:text-amber-600 hover:font-bold  ">Order History</p>
            </div>

     <div  onClick={handleLogout} className=" text-gray-800    py-1 cursor-pointer px-4 rounded-full flex">

     <p className=" text-gray-800 hover:transition hover:scale-110 hover:text-amber-600 hover:font-bold   ">Logout</p>
     </div>
          </motion.div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
