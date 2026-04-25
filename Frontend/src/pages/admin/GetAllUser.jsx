import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const GetAllUser = () => {

    const [data, setData] = useState([]);

    const getAllUsers = async () => {
        try {

            // const token = localStorage.getItem('token'); // is step me hmne localStorage se token manga

            // const config = {     // header se apna token bhejna ye ek purana method h aur less secure h 
            //     headers: {
            //         Authorization: `Bearer ${token}`  // is step me hamne required authorization header part ready kiya taaki hm ise req ke header part me bhej sake
            //     }
            // }
            
            const response = await axios.get('http://localhost:5000/api/user/getAllUser', {withCredentials:true});  // agr api protected h to hmne apna config api ke sath add kar diya 
            console.table(response.data)
            setData(response.data);
            toast.success("User Fetched")
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch Users")
        }

    }

    // useEffect(() => {
    //     getAllUsers();
    // }, []);


    return (
        <div className='mt-64'>
            <h1>All Users</h1>
            <button onClick={getAllUsers} className='border bg-red-500 '>Get ALL Users</button>
            {data.map((m) => (
                <div>{m.name}</div>
            ))}

        </div>
    )
}




export default GetAllUser