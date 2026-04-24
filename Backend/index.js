import express from 'express';
import connectDB from './config/dbconfig.js';
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import cors from 'cors';
import dotenv from "dotenv"
import cloud from './utils/cloudinary.js';
dotenv.config();
import upload from './middlewares/multer.js';
import cloudinary from "cloudinary"
import cookieParser from "cookie-parser"

const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
connectDB();


app.get('/', (req, res) => {
    res.send("i am backend ");
})

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);


app.post("/api/multer", upload.array('files', 5), async (req, res) => {

     try {
        if (!req.files || req.files.length === 0) {
            return res.json("No files uploaded");
        }

        console.log(req.body)


        let uploadedImages = [];

        for (let file of req.files) {
            // const result = await cloudinary.uploader.upload(file.path);
            // uploadedImages.push(result);
            console.log(file.path)
        }

        res.json(uploadedImages);

    } catch (error) {
        console.log(error);
        res.status(500).json("Error uploading files");
    }
});


app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})