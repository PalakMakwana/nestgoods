import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductFromData = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ProductData"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" p-5">
      <h1 className="text-2xl font-bold mb-4">Product Form Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {productData.map((product) => (
          <article
            key={product.id}
            className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.ItemName}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg text-white font-semibold">{product.ItemName}</h2>
                <p className="block text-xs text-white/90 mt-2">
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
                <p className="block text-xs text-white/90 mt-1">
                  <span className="font-semibold">Weight:</span> {product.weight.join(", ")}
                </p>
                <p className="block text-xs text-white/90 mt-1">
                  <span className="font-semibold">Price:</span> ${product.price}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductFromData;
