import React, { useState, useContext, useEffect } from 'react';
import { useCart } from './CartContext';
import { db } from '../Firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import AuthContext from './AuthContext';

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useContext(AuthContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrderHistory, setIsOrderHistory] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Please log in to complete the purchase.");
      return;
    }
    try {
      const total = calculateSubtotal();
      const docRef = await addDoc(collection(db, 'Orders'), {
        userId: currentUser.uid,
        items: cartItems,
        address,
        phoneNumber,
        total,
        createdAt: new Date()
      });
      clearCart();
      console.log('Order placed with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const fetchOrderHistory = async () => {
    if (!currentUser) return;

    const q = query(collection(db, 'Orders'), where('userId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrderHistory(orders);
  };

  useEffect(() => {
    if (isOrderHistory) {
      fetchOrderHistory();
    }
  }, [isOrderHistory, currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setIsCheckout(!isCheckout)}
          >
            {isCheckout ? 'Cancel' : 'Checkout'}
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOrderHistory(!isOrderHistory)}
          >
            {isOrderHistory ? 'Back to Cart' : 'Order History'}
          </button>
        </div>
      </div>
      
      {!isOrderHistory ? (
        <div>
          <div className="mt-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-cover" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                  <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                      <button className="bg-gray-200 rounded-l-lg px-2 py-1" disabled>-</button>
                      <span className="mx-2 text-gray-600">{item.quantity}</span>
                      <button className="bg-gray-200 rounded-r-lg px-2 py-1" disabled>+</button>
                    </div>
                    <span className="ml-auto font-bold">${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center mt-8">
            <span className="text-gray-600 mr-4">Subtotal:</span>
            <span className="text-xl font-bold">${calculateSubtotal()}</span>
          </div>
          {isCheckout && (
            <div className="mt-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold my-4">Order History</h2>
          <div className="mt-8">
            {orderHistory.map(order => (
              <div key={order.id} className="border-b border-gray-400 py-4">
                <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                <p className="text-gray-600">Placed on: {new Date(order.createdAt.toDate()).toLocaleString()}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">Phone Number: {order.phoneNumber}</p>
                <p className="text-gray-600">Total: ${order.total}</p>
                <div className="mt-4">
                  <h4 className="text-md font-bold">Items:</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="flex flex-col md:flex-row py-2">
                      <div className="flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-4">
                        <h5 className="text-md font-bold">{item.title}</h5>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
