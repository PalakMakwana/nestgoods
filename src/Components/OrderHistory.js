

import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        const q = query(collection(db, 'Orders'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (!orders.length) {
    return <p className="text-center">No orders found.</p>;
  }

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-4">
            <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
            <p className="text-sm text-gray-600">Address: {order.address}</p>
            <p className="text-sm text-gray-600">Phone: {order.phoneNumber}</p>
            <div className="mt-2">
              <h4 className="text-md font-semibold">Items:</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.ItemName} - {item.weight} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 font-semibold">
              Total: ${order.total}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
