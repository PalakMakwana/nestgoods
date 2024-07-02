import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";

const Cart = ({ toggleHome }) => {
  const [cartData, setCartData] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { items, removeItem, emptyCart } = useCart();

  const navigate = useNavigate("");
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cart"));
      const data = querySnapshot.docs.map((doc) => ({
        docid: doc.id,
        ...doc.data(),
      }));

      const userCartData = data.filter(
        (item) => item.User_uid === auth.currentUser.uid
      );
      setCartData(userCartData);
    } catch (error) {
      console.error("Error fetching cart data: ", error);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await deleteDoc(doc(db, "cart", id));
      fetchCartData();
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const handleUpdateQuantity = async (docid, newQuantity) => {
    try {
      const itemDoc = doc(db, "cart", docid);
      const selectedProduct = cartData.find((data) => data.docid === docid);
      await updateDoc(itemDoc, {
        ...selectedProduct,
        quantity: selectedProduct.quantity + newQuantity,
      });
      fetchCartData();
    } catch (error) {
      console.error("Error updating item quantity: ", error);
    }
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const totalPrice = calculateTotalPrice();

      const orderData = {
        items: cartData,
        address: address,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
        total: totalPrice,
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order placed with ID: ", docRef.id);

      await Promise.all(
        cartData.map((item) => deleteDoc(doc(db, "cart", item.docid)))
      );
      emptyCart();
      setCartData([]);

      setShowCheckout(false);
      setAddress("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => total + parseInt(item.price) * item.quantity, 0);
  };

  return (
    <div className=" space-y-5">
      {cartData.length === 0 ? (
        <>
          <div className="text-center space-y-4">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
              className="mx-auto h-96 "
              alt="Your Cart is empty"
            />
            <p
              style={{ fontFamily: "'Unbounded', sans-serif" }}
              className="mt-4 text-xl text-[#26355D]"
            >
              Your Cart is empty!!
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex flex-col justify-between"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.ItemName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.ItemName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {item.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Weight:</span>{" "}
                    {item.weight}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Price:</span> {item.price}
                  </p>
                  <div className="text-sm space-x-3 text-gray-600">
                    <span className="font-semibold">
                      Quantity:{item?.quantity}
                    </span>

                    <button
                      className=" w-8 h-8 text-lg  rounded-sm border-2 border-rose-700 text-black"
                      onClick={() => {
                        if (item.quantity > 1) {
                          handleUpdateQuantity(item?.docid, -1);
                        }
                      }}
                    >
                      -
                    </button>
                    <button
                      className="w-8 h-8 text-lg rounded-sm border-2 border-rose-700 text-black"
                      onClick={() => {
                        handleUpdateQuantity(item?.docid, 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleRemoveFromCart(item.docid)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total Price: ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
            {!showCheckout && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
            {showCheckout && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border p-2 rounded mt-2"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
