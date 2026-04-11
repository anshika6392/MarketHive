import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        console.log("mai niklaa gaddi leke")
        // destructure data from frontend
        const { name, description, price, image, category } = req.body;

        // validations
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "fill all the entries" });
        }


        //    create product
        const createProduct = await Product.create({
            name,
            description,
            price,
            image,
            seller: req.requester._id,
            category,
        });

        res.status(200).json({ message: "Product created successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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