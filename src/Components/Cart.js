import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { db } from "../Firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const Cart = ({ onClose }) => {
  const { isEmpty, updateItemQuantity, removeItem, cartTotal, emptyCart } = useCart();
  const { currentUser } = useAuth();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (snap) => {
      const alldata = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(alldata);
    });
    return () => unsubscribe();
  }, []);

  if (isEmpty) {
    return (
      <div className="text-center">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
          className="w-48 h-48 mx-auto"
          alt="Empty Cart"
        />
        <p className="mt-4 text-xl">Empty Cart</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!address || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    const order = {
      userId: currentUser.uid,
      items,
      address,
      phoneNumber,
      total: cartTotal,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "Orders"), order);
      emptyCart();
      alert("Order placed successfully");
      onClose();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <div></div>
      <div className="p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            &times;
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {items
            .filter((data) => data.User_uid === currentUser.uid)
            .map((item) => (
              <li key={item.id} className="py-4 flex space-x-4">
                <img
                  src={item.image}
                  alt={item.ItemName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.ItemName}</h3>
                  <p className="text-sm text-gray-600">{item.weight}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    ${item.price}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded-l-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded-r-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              </li>
            ))}
        </ul>
        <div className="mt-4">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md"
            onClick={handleCheckout}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
