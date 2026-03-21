import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

  const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const handleClick=async(e)=>{
  // to prevent the reload of the page
  e.preventDefault();
  try {
    const response=await axios.post('http://localhost:5000/api/user/addUser',{
      name,
      email,
      password
    });
    alert("successfully signup");
console.log(response);
    
  } catch (error) {
    console.log(error);
  }

}



  return (
    <div className='mt-40'>
        <form action="">
           <input type="text" placeholder='name' onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
             <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
             <button onClick={handleClick}>Login</button>
        </form>
    </div>
  )
}

export default SignUp