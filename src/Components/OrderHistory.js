import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const generateGoogleMapsLink = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${encodedAddress}`;
  };

  return (
    <div className="p-5 space-y-5">
      <h2 className="text-2xl font-bold">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 shadow-md">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                  <p className="text-gray-600">Placed at: {order.createdAt.toDate().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total: {order.total} rs</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <img src={item.image} alt={item.itemName} className="w-16 h-16 object-cover rounded-md mr-4" />
                      <div>
                        <p className="font-medium"> {item.ItemName}</p>
                        <p className="text-gray-600 ">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price: {item.price} rs</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">Phone Number: {order.phoneNumber}</p>
                <a
                  href={generateGoogleMapsLink(order.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  View in Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
