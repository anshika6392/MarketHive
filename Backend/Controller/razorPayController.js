import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const order = await razorpay.orders.create({amount: amount * 100,currency: "INR",receipt: `receipt_${Date.now()}`});

        res.status(200).json({ success: true, order });

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};




export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      addressId,
      quantity,
      totalPrice,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    const order = await Order.create({
      userId: req.requester._id,

      products: [
        {
          productId,
          quantity,
          price: totalPrice / quantity,
        },
      ],

      addressId,

      totalAmount: totalPrice,

      paymentMethod: "Razorpay",

      paymentStatus: "Paid",

      orderStatus: "Placed",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      razorpaySignature: razorpay_signature,
    });

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};