import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.requester._id;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: userId, products: [productId] });
            return res.status(201).json({ message: "Wishlist created & product added", wishlist });
        }

        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        wishlist.products.push(productId);
        await wishlist.save();
        return res.status(200).json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.requester._id;

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
        await wishlist.save();
        return res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const userId = req.requester._id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
        if (!wishlist) return res.status(200).json({ message: "Wishlist is empty", products: [] });
        return res.status(200).json({ message: "Wishlist fetched", products: wishlist.products });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};