import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const Login = () => {


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleClick=async(e)=>{
   e.preventDefault();
   try {

    const response=await axios.post('http://localhost:5000/api/user/login',{
        email,
        password
    
    });
    console.log(response);
    alert("successfull Login");

   } catch (error) {
      console.log(error);
   }
   
}



    return (
        <div className='mt-40'>
            <form action="">
                <input type="text" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="text" placeholder="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={handleClick}>Login</button>

            </form>
        </div>
        
    )
}

export default Login