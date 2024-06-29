import React, { useState } from "react";
import ProductForm from "./ProductForm";
import Productfromdata from "./Productfromdata";
import Modal from 'react-modal';
import { UilTimes } from "@iconscout/react-unicons";

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


function Dashboard() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="dashboard ">
      <div>
        <div className="p-10 flex justify-between">
          <div>
        <button className="bg-gray-800 p-2  rounded-1 text-gray-100" onClick={openModal}>   ADD PRODUCT  </button>
        </div>        <div>
        <p className="p-2 text-xl font-semibold">Admin Dashboard</p>
        </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}><UilTimes /></button>

          <ProductForm handleCloseModal={closeModal} />
        </Modal>
      </div>
      <Productfromdata showActions={true}/>
    </div>
  );
}

export default Dashboard;
