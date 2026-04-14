import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
items:[{
     product:ObjectId,
     quantity:Number,
     price:Nu

}]







}
)