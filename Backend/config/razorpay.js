import Razorpay from "razorpay";



console.log(process.env.RAZORPAY_KEY_ID)
const razorpay = new Razorpay({
    key_id: "rzp_test_SyceqEsGbzI4Am",
    key_secret: "lK7TfuMWwOo6B1aNNSEqkuCD",
});

export default razorpay;