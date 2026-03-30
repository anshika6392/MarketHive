import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],

    rating: {
        type: Number,
        default: 0,
    },

    numofReviews: {
        type: Number,
        default: 0,
    },

    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: user,
        },
        name: String,
        rating: Number,
        comment: String,
    }],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model("product", productSchema);
export default Product