import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

function PoductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'ProductData', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product data: ', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 space-y-5">
      <h1 className="text-4xl font-bold text-gray-800">{product.ItemName}</h1>
      <div className="flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0">
        <div className="md:w-1/2">
          {product.image && (
            <img
              src={product.image}
              alt={product.ItemName}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="md:w-1/2 space-y-4">
          <p className="text-lg">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="text-lg">
            <strong>Price:</strong> {product.price}
          </p>
          <p className="text-lg">
            <strong>Weight:</strong> {product.weight} 
          </p>
          <div className="mt-10">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </div>
        </div>
      </div>
     
    </div>
  );
}

export default PoductDetail;
