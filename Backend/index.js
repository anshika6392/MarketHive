// import express from 'express';
// import userRouter from "./Routes/userRouter.js"
// import dotenv from "dotenv"
// dotenv.config();
// import connectDB from './config/dbconfig.js';

// const port = process.env.PORT
// const app=express();

// app.use(express.json());
// connectDB();

// // app.use("/user",userRouter);
// app.get("/",(req,res)=>{
//     res.send("backend is live");
// })

// app.listen(port,()=>{
//     console.log(`server is live on port ${port}`);
// })


import express from 'express';


const app=express();
const port=5000;
app.use(express.json());


app.get('/',(req,res)=>{
     res.send("i am backend ");
})



app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})