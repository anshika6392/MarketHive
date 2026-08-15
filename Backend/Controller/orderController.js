import Order from "../models/orderModel.js";

export const getOrderByUser=async(req,res)=>{
    try {

        const userId = req.requester._id;

        const order = await Order.find({ userId: userId }).populate("products.productId");
        if (!order) {
            return res.status(200).json({ message: "there is no order" });
        }

        return res.status(200).json({ message: "data fetched successfully", order });
    } catch (error) {
        return res.status(501).json({ message: error });
    }
}