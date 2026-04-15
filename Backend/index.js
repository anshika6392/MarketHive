import express from 'express';
import connectDB from './config/dbconfig.js';
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config();

const app=express();
const port=5000;
app.use(express.json());

app.use(cors({
    origin: "*"
}));
connectDB();


app.get('/',(req,res)=>{
     res.send("i am backend ");
})

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);


app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})