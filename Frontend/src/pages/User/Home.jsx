import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slide from '../../components/Slide';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [randomProducts, setRandomProducts] = useState([]);

  const getRandomProducts = async () => {
    try {
      const result = await axios.get(`${url}/api/product/getRandomProducts`);
      setRandomProducts(result.data.data);
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <div className='h-screen pt-24 bg-white' >

      {/* slider */}
      <div>
        <Slide />
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-[85%]'>
          {/*  advertisement */}
          <img className='rounded-2xl' src="https://rukminim2.flixcart.com/fk-p-flap/3140/700/image/a77b1968d2473985.jpg?q=60" alt="error" />

          {/* suggestion */}
          <div>
            <h1 className='text-2xl p-2 mt-4 mb-4'>
              Suggested For You
            </h1>

            {/* <div className='flex border border-red-500'>
              {randomProducts.map((p, i) => {
                return (
                  <div key={i} className='border border-blue-500 m-2 p-2 flex flex-col w-[50%]'>
                    
                      <h1>{p.name}</h1>
                      <h2>{p.price}</h2>
                      <h2>{p.description}</h2>
                      <img src={p?.images[0]?.url} alt="" />                        
                  </div>

                )
              })}
            </div> */}

            <div className="w-full flex justify-center px-3 sm:px-6">
              <div className="w-full max-w-[1400px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" >

                {randomProducts.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 flex flex-col justify-between " 
                    onClick={() => navigate(`/productDetails/${p._id}`) // navigating to productDetails page by setting the productId to PATH (url)
                  }
                  >
                    {/* Image */}
                    <div className="relative h-[140px] sm:h-[160px] md:h-[180px] w-full overflow-hidden">
                      <img
                        src={p?.images[0]?.url}
                        alt={p.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex flex-col gap-2 flex-grow">
                      <h1 className="text-xs sm:text-sm font-semibold line-clamp-2">
                        {p.name}
                      </h1>

                      <h2 className="text-sm sm:text-lg font-bold text-green-600">
                        ₹{p.price}
                      </h2>

                      <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    {/* Button */}
                    <div className="p-3 pt-0">
                      <button className="w-full py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm font-medium hover:from-green-600 hover:to-green-700 transition" onClick={() => navigate(`/productDetails/${p._id}`)}>
                        Buy Now
                      </button>
                    </div>

                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default Home;

