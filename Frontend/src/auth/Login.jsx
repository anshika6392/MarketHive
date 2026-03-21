import React from 'react'
import { useState } from 'react';

const Login = () => {


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleClick=()=>{
   
}



    return (
        <div className='mt-40'>
            <form action="">
                <input type="text" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="text" placeholder="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                <button >Login</button>

            </form>
        </div>
        
    )
}

export default Login