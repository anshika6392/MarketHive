import mongoose from "mongoose";
import User from "./userModel.js";

const addressSchema = new mongoose.Schema({


    // connecting user model(table) to address model(table)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    houseName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    alternateMobile: {
        type: String
    },
    addressType: {
        type: String,
        enum: ["home", "work"],
        default: "home"
    }

})

const Address = mongoose.model("Address", addressSchema);
export default Address;
