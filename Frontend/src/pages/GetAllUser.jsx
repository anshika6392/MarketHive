import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetAllUser = () => {

    const [data, setData] = useState([]);

    const getAllUsers = async () => {

        const response = await axios.get('http://localhost:5000/api/user/getAllUser');
        // console.table(response.data);
        console.table(response.data)
        setData(response.data);

    }

    // useEffect(() => {
    //     getAllUsers();
    // }, []);


    return (
        <div className='mt-64'>
            <h1>All Users</h1>
            <button onClick={getAllUsers} className='border bg-red-500 '>Get ALL Users</button>
            {data.map((m)=>(
                <div>{m.name}</div>
            ))}

        </div>
    )
}




export default GetAllUser