import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import image from "../images/Green Vintage Illustrative Food Logo (2).png";
import { UilShoppingCart, UilBars, UilTimes,UilTruck  ,UilTrees,UilShoppingBag } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Carousel from "./Carousel";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "20px",
    width: "60%",
    backgroundColor: "#ffffff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "24px",
    color: "#666666",
  },
};

const menuItem = [
  { id: 1, title: "Home" },
  { id: 2, title: "Shop" },
  { id: 3, title: "About" },
  { id: 4, title: "Contact us" },
  { id: 5, title: "Login" },
];

const scrollToRef = (ref) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

function Landing() {
  const [navOpen, setNavOpen] = useState(false);
  const refs = useRef(menuItem.map(() => React.createRef()));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setShowLogin(true);
  }

  const navigate = useNavigate("");
  const handleMenuItemClick = (item, index) => {
    if (item.title === "Login") {
      openModal();
    } else {
      scrollToRef(refs.current[index]);
      if (navOpen) {
        setNavOpen(false);
      }
    }
  };

  return (
    <div className="text-xl space-y-4 bg-slate-100 mb-10">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <button style={customStyles.closeButton} onClick={closeModal}>
          <UilTimes />
        </button>
        <div>
          {showLogin ? (
            <Login setShowLogin={setShowLogin} />
          ) : (
            <Register setShowLogin={setShowLogin} />
          )}
        </div>
      </Modal>
      <div>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
           <div className="flex space-x-2 items-center">
           <div className="bg-green-700 p-1 rounded-full">
              <img src={image} alt="" className="h-10 w-10 rounded-full" />
            </div>
            <p   style={{ fontFamily: "'Unbounded', sans-serif" }} className="text-green-800 text-base font-bold">Prakrutik Aahar Kendra</p>
           </div>
            <div className="hidden md:flex space-x-5">
              {menuItem.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="nav-item text-base list-none text-gray-800 hover:text-green-700 px-3 py-2 rounded-full transition duration-300 transform hover:scale-110 cursor-pointer"
                  onClick={() => handleMenuItemClick(item, index)}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.title}
                </motion.li>
              ))}
            </div>
            <div className="">
              <UilShoppingCart
                className="text-green-700 h-8 w-8"
                onClick={() => navigate("/admin")}
              />
              <div className="md:hidden">
                <button onClick={() => setNavOpen(!navOpen)}>
                  {navOpen ? (
                    <UilTimes className="text-green-700 h-8 w-8" />
                  ) : (
                    <UilBars className="text-green-700 h-8 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {navOpen && (
              <motion.ul
                className="md:hidden flex flex-col items-center mt-4 space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {menuItem.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className="nav-item list-none text-gray-800 hover:text-green-700 px-3 py-2 rounded-full transition duration-300 transform hover:scale-110 cursor-pointer"
                    onClick={() => handleMenuItemClick(item, index)}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.title}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative" ref={refs.current[0]}>
        <img
          className="w-full lg:h-[500px] sm:h-48 md:h-96 rounded-t-3xl"
          src="https://img.freepik.com/premium-photo/banner-with-vegetables-copy-space-background-generative-aix9_195703-999.jpg?w=1060"
          alt=""
        />
        <motion.p
          className="absolute top-[30%] left-[10%] text-white italic font-semibold tracking-wider"
          style={{ fontFamily: "'Playwrite NL', sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          100% Organic
        </motion.p>
        <motion.p
          className="absolute top-[40%] lg:text-4xl sm:text-sm md:text-md left-[10%] text-black font-bold tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Healthy & Organic Farm Grocery
        </motion.p>
        <motion.p
          className="absolute top-[50%] lg:text-md sm:text-sm md:text-md left-[10%] text-black font-bold tracking-wider"
          style={{ fontFamily: "'PT Serif', sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          "From farm to table, bringing you the best of nature's bounty."
        </motion.p>

        <motion.button
          onClick={() => navigate("/products")}
          className="absolute top-[64%] lg:text-md sm:text-sm md:text-md left-[10%] text-black bg-white w-[14%] h-[6%] rounded-full font-bold tracking-wider"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Explore Products
        </motion.button>
      </div>
      <motion.div
        className="mt-10 h-[470px]"
        ref={refs.current[1]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel />
      </motion.div>

     
      <motion.div
        className="h-[600px] py-10"
        ref={refs.current[2]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-[200px] md:h-[300px] flex items-center justify-center  text-gray-800">
          <div className="sm:flex items-center max-w-screen-xl">
            <motion.div
              className="sm:w-1/2 p-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://img.freepik.com/premium-vector/vegetables-fruits-food-concept-illustration_958800-21608.jpg?w=900"
                alt=""
                className="mt-[10%] rounded-sm"
              />
            </motion.div>

            <motion.div
              className="sm:w-1/2 p-5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text space-y-4">
                <span
                  className="block font-bold text-gray-800 text-4xl"
                  style={{ fontFamily: "'Playwrite NL', sans-serif" }}
                >
                  Who we are{" "}
                  <span className="text-gray-800 animate-bounce ">?</span>
                </span>
                <p
                  className="text-lg text-gray-700"
                  style={{ fontFamily: "'PT Serif', sans-serif" }}
                >
                  Welcome to our farm grocery store, your one-stop destination
                  for fresh, healthy, and organic produce. We are passionate
                  about providing you with the finest selection of farm-fresh
                  fruits, vegetables, dairy products, and more. Our mission is
                  to promote sustainable and eco-friendly farming practices
                  while delivering the highest quality products to your
                  doorstep.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="h-[400px] py-10"
        ref={refs.current[2]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-[200px] md:h-[300px] flex items-center justify-center  text-gray-800">
          <div className="sm:flex items-center max-w-screen-xl">
            <div className="sm:w-1/2 p-10">
              <img
                src="https://img.freepik.com/free-photo/high-angle-beans-arrangement-concept_23-2148648539.jpg?t=st=1719135455~exp=1719139055~hmac=43e28a5e9bf6d4762b6cfd16f00f8a49b35af402b547dfa50cc2dcaa4c301d1a&w=360"
                alt=""
                className="mt-[10%] rounded-sm"
              />
            </div>
            <div className="sm:w-1/2 p-5">
              <div className="text space-y-4">
                <span className="text-gray-500 border-b-2 border-green-700 uppercase">
                  About us
                </span>
                <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                  About <span className="text-green-700">Our Store</span>
                </h2>
                <p className="text-green-900">
                  At
                  <span
                    style={{ fontWeight: "bold" }}
                    className="text-green-600"
                  >
                    {" "}
                    Food
                  </span>
                  , We are on a Mission to redefine your food experience.
                  Committed to provide a diverse range of fresh, organic
                  delights,
                  <span
                    style={{ fontWeight: "bold" }}
                    className="text-green-600"
                  >
                    We Prioritize health, sustainability and the joy of savoring
                    nature's best.
                  </span>
                  Join us in this journey towards wholesome living and
                  nourishment.
                </p>
                <div className="flex justify-between font-bold underline">
                  <p>Innovation</p>
                  <p>Easy to use</p>
                  <p>Selling Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className=" h-[600px]"
        ref={refs.current[3]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mt-[10%]">
          <div class="bg-gray-100 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <h2 class="text-base text-green-700 font-semibold tracking-wide uppercase">
                  Location
                </h2>
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Our Store
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  "Savor nature's goodness, delivered to your door. Shop organic
                  for a healthier, sustainable tomorrow."
                </p>
              </div>

              <div class="mt-10">
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <dt class="text-lg leading-6 font-medium text-gray-900">
                        Address
                      </dt>
                      <dd class="mt-2 text-base text-gray-500">
                        123 Main St, Suite 100
                        <br />
                        Anytown, USA 12345
                      </dd>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <dt class="text-lg leading-6 font-medium text-gray-900">
                        Phone number
                      </dt>
                      <dd class="mt-2 text-base text-gray-500">
                        (555) 555-5555
                      </dd>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <dt class="text-lg leading-6 font-medium text-gray-900">
                        Email
                      </dt>
                      <dd class="mt-2 text-base text-gray-500">
                        info@ourstore.com
                      </dd>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-green-700 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <dt class="text-lg leading-6 font-medium text-gray-900">
                        Store Hours
                      </dt>
                      <div class="mt-2 text-base text-gray-500">
                        Monday - Friday: 9am to 8pm
                        <br />
                        Saturday: 10am to 6pm
                        <br />
                        Sunday: 12pm to 4pm
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className=" h-[300px] flex justify-between  px-10"
        // ref={refs.current[3]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
         <div>
        <p   style={{ fontFamily: "'Unbounded', sans-serif" }} className="text-green-800 text-2xl   items-center py-10 font-bold">Prakrutik Aahar Kendra</p>
        </div> 
      <div className="flex space-x-40     justify-between">
      
      <div className="space-y-2">
        <div>
        <p className="text-xl font-semibold underline">Customer Care</p>
        </div>
        <div>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Help center</p>
        <p>Address Store</p>
        </div>
        </div>
        <div className="space-y-2">
          <div>
          <p className="text-xl underline font-semibold ">Quick Link</p>
          </div>
      <div>
      <ul className=" ">

{menuItem.map((item, index) => (
  <>
  
  <li
    key={item.id}
    className="text-gray-800  hover:text-green-700 rounded-full transition duration-300 transform hover:scale-110 cursor-pointer"
    onClick={() => handleMenuItemClick(item, index)}
  >

    {item.title}
  </li>
  </>
))}
</ul>
      </div>
        </div> 
      </div>
      </motion.div>
    </div>
  );
}

export default Landing;
