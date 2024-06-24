import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const images = [
    'https://img.freepik.com/free-photo/variety-legumes-top-view_1127-174.jpg?t=st=1719052479~exp=1719056079~hmac=b7d500138a101707b48866a4d342ab9fc077fa36198716ad58cd4fee56b9e1eb&w=900',
    'https://img.freepik.com/free-vector/colored-realistic-pear-apple-composition-whole-sliced-pears-apples-different-varieties-vector-illustration_1284-79885.jpg?t=st=1719052415~exp=1719056015~hmac=03ac6776f6792b9ce36eb1ec0a4977345263933d01840f06196db1208c6f05d6&w=740',
    'https://img.freepik.com/free-photo/top-view-arrangement-with-grains-bags_23-2148289429.jpg?t=st=1719052620~exp=1719056220~hmac=d15ede7744b2131eaa303db5a831211c18019c9d50a20e203f790ab1c2dcb573&w=900',
    'https://img.freepik.com/free-vector/vegetables-realistic-composition-white-background-with-tomato-onion-sweet-hot-pepper-eggplant_1284-16242.jpg?t=st=1719052442~exp=1719056042~hmac=d6496841d8cd275ad3c2ba04294a8acdef19b82240ea10d73a711212704b2bc4&w=740',
    'https://s3.ap-south-1.amazonaws.com/media.netpebecho.com/localshouts/photos/category/1554214913oil%20and%20shee.jpg',
    'https://storage.googleapis.com/shy-pub/56199/cat/1627206542492_58274_cat.jpg',
    'https://m.media-amazon.com/images/I/51TrhC6Cu5L._AC_UF1000,1000_QL80_.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO3dDZeblQ7khNZFR5fum_sg8UTNg7iYSz8Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXwdd5sEXx9iLlnka0jWUTu9Z9Wzep1UNsXA&s',
 
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: 'linear', 
  };

  return (
    <div className="px-4 py-7 space-y-8 h-[400px] ">
        <p className='text-3xl px-7 text-gray-800 font-semibold '>Explore Categories</p>
      <Slider {...settings} className=' py-4  rounded-md ml-[2%]'>
      
        {images.map((src, index) => (
          <div key={index} className="p-2">
            <img src={src} alt={`Carousel ${index}`} className="w-52 h-52 object-cover rounded-md" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'gray',
        right: '-25px',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'gray',
        left: '-25px',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

export default Carousel;
