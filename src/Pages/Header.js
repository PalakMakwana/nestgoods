import React from 'react';
import { motion } from 'framer-motion';
import { UilShoppingCart, UilSearch } from '@iconscout/react-unicons';

const Header = ({ handleLogout, navigate, image }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between p-5">
        <div className="flex items-center space-x-2">
          <motion.div
            className="bg-green-700 p-1 rounded-full cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              onClick={() => navigate('/')}
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
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
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
            onClick={() => navigate('/cart')}
          />
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
