import Product from "../models/productModel.js";
import cloudinary from "cloudinary"

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const files = req.files;

        // validations
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Fill all the entries" });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Provide Product Images" });
        }

        // 🚀 parallel upload (fast)
        const uploads = files.map(file =>
            cloudinary.uploader.upload(file.path, { folder: "MarketHive" })
        );

        const uploadedImages = await Promise.all(uploads);
        const formattedImages = uploadedImages.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));

        // create product
        const data = await Product.create({
            name,
            description,
            price,
            seller: req.requester._id,
            category,
            images: formattedImages
        });

        res.status(200).json({
            message: "Product created successfully",
            data
        });

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {

        const { productId } = req.params;


        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product dosen't Exist in DB" });
        }


        if (req.requester.type != "admin" && req.requester._id.toString() !== product.seller._id.toString()) {
            return res.status(401).json({ message: "Not Authorized to delete" });
        }

        // Delete image from clodinary
        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map(img =>
                cloudinary.uploader.destroy(img.public_id)
            );
            await Promise.all(deletePromises);
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        return res.status(200).json({ message: "product is deleted", deletedProduct });

    } catch (error) {
        res.status(401).json({ message: "Something Went Wrong", error });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ message: "displayed", products });

    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error });
    }
}

export const getAllProductsBySeller = async (req, res) => {

    const { sellerId } = req.params;
    try {
        if (req.requester.type !== "admin" && req.requester._id.toString() !== sellerId) {
            return res.status(401).json({ message: "Not Authorized to see Products" });
        }

        const products = await Product.find({ seller: sellerId });

        res.status(200).json({ message: "Done", products });

    } catch (error) {
        res.status(400).json({ message: "Something Went Wrong" });
    }
}

export const deleteManyProducts = async (req, res) => {
    try {
        const { productIDs } = req.body;

        // ✅ 1. Validate input
        if (!Array.isArray(productIDs) || productIDs.length === 0) {
            return res.status(400).json({
                message: "productIDs must be a non-empty array",
            });
        }

        // assume req.user me login user ka data hai
        const user = req.requester;

        let deleteQuery = {};

        // ✅ 2. Role based authorization
        if (user.role === "admin") {
            // admin sab delete kar sakta hai
            deleteQuery = { _id: { $in: productIDs } };
        } else {
            // seller sirf apne products delete kare
            deleteQuery = {
                _id: { $in: productIDs },
                seller: user._id,
            };
        }

        // ✅ 3. Optional: check kitne products valid hain
        const productsToDelete = await Product.find(deleteQuery);

        if (productsToDelete.length === 0) {
            return res.status(403).json({
                message: "No valid products found to delete",
            });
        }

        // ✅ 4. Delete
        const result = await Product.deleteMany(deleteQuery);

        // ✅ 5. Response
        res.status(200).json({ message: "Products deleted successfully", deletedCount: result.deletedCount });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, discountPrice, category } = req.body;

        const product = await Product.findById(productId);

        // ✅ Product not found
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        // ✅ Authorization check
        if (
            req.requester.type !== "admin" &&
            req.requester._id.toString() !== product.seller.toString()
        ) {
            return res.status(401).json({ message: "Not Authorized to Update Product" });
        }

        // ✅ Build update object
        const updatedData = {};

        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (price) updatedData.price = price;
        if (discountPrice) updatedData.discountPrice = discountPrice;
        if (category) updatedData.category = category;

        // ✅ Correct update query
        const updated = await Product.updateOne(
            { _id: productId },
            { $set: updatedData }
        );

        res.status(200).json({
            message: "Product updated successfully",
            updated,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// getProductByCategory

// random products from all category max 20
export const getRandomProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8; // default 5

        const products = await Product.aggregate([  // functipn to get random product
            { $sample: { size: limit } }
        ]);

        return res.status(200).json({ message: "product fetched", count: products.length, data: products });

    } catch (error) {
        console.error("Random Products Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProductById=async(req,res)=>{
    
}

