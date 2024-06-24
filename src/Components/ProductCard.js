import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
        <img src={product.image} alt='' className='h-20 w-20'/>
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-700"><span className="font-medium">Category:</span> {product.category}</p>
      <p className="text-gray-700"><span className="font-medium">Weight:</span> {product.weight} kg</p>
      <p className="text-gray-700"><span className="font-medium">Price per kg:</span> ${product.price}</p>
    </div>
  );
};

export default ProductCard;
