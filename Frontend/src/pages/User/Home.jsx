import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slide from '../../components/Slide';

const Home = () => {

  const url = import.meta.env.VITE_URL;

  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const result = await axios.get(`${url}/api/category/getAllCategories`, { withCredentials: true });
      // credentials= browser se cookie nikl ke request me attach ho jati h
      console.log(result.data);
      setCategories(result.data.data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className='h-screen w-full pt-24'>

      <div className='flex justify-center items-center'>
        <Slide />
      </div>

      <div>
        <h1>Categories</h1>
        {/* <p>{categories[0]?.name}</p>
        <p>{categories[1]?.name}</p>
        <p>{categories[2]?.name}</p>
        <p>{categories[3]?.name}</p>
       */}
        <div className='flex gap-4'>

          {categories.map((cat, i) => (
            <div key={i}>{cat.name}</div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;

