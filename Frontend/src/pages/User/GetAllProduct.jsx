import axios from 'axios';
import React, { useState } from 'react';

const GetAllProduct = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            

            const response = await axios.get("http://localhost:5000/api/product/getAllProducts");

            console.log(response.data);
            setProducts(response.data.products);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className='mt-36'>
            <h1>All Products :</h1>

            <button onClick={getAllProducts} className='border'>
                getAllProd
            </button>

            {products?.map((p, i) => (
                <div key={i}>{p.name}</div>
            ))}
        </div>
    );
};

export default GetAllProduct;