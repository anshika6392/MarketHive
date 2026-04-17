import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.requester._id;

    try {

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product dosen't exist in DB" });
        }

        // ✅ 3. Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // 👉 If cart doesn't exist → create new
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{
                    product: productId,
                    quantity: 1,
                    price: product.price
                }],
                totalPrice: product.price
            });

            await cart.save();

            return res.status(201).json({ message: "Cart created and product added", cart });
        }

        // ✅ 4. Check if product already in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // 👉 Product already exists → increase quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // 👉 New product → push
            cart.items.push({
                product: productId,
                quantity: 1,
                price: product.price
            });
        }

        // ✅ 5. Recalculate total price
        let total = 0;
        cart.items.forEach(item => {
            total += item.quantity * item.price;
        });

        cart.totalPrice = total;

        await cart.save();

        return res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteItem=async(req,res)=>{
    const{productId}=req.params;
    const userId=req.requester._id;


    // find the cart by the help of the user id
const cart=await Cart.findById(userId);
if(!cart){
    return res.status(401).json({message:"there is no cart"});
}


// find the item if it is present in the cart or not
    const item=await Cart.findOne({"items.product":productId});
    if(!item){
        // console.log("cart m delete hua");
        return res.status(404).json({message:"no item in the cart to delete"});
    }

    if(!userId){
        return res.status(401).json({message:"unauthorized to delete product from cart"});
    }

   const deletedItem=await Cart.updateOne(
  { user: userId },
  { $pull: { items: { product: productId } } }
);

return res.status(200).json({message:"item deleted successfully"});

}