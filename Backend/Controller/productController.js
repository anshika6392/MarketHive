import Product from "../models/productModel";

export const  createProduct=async(req,res)=>{
    try {
        // destructure data from frontend
        const {name,description,price,image,seller,category}=req.body;

        // validations
        if(!name||!description||!price||!image||!seller||!category){
            return res.status(400).json({message:"fill all the entries"});
        }
    //    create product
    const createProduct=await Product.create({
        name,
        description,
        price,
        image,
        seller:req.user._id,
        category,
    });

    res.status(200).json({message:"Product created successfully"});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}