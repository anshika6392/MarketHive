import mongoose from "mongoose"
import bcryptjs from 'bcryptjs'

 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default:""
    },
    type:{
        type:String,
        enum:["user","seller","admin"],
        default:"user"
    }
},{ timestamps: true });

// hash password
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcryptjs.hash(this.password,10);
})

//check password by comparing hash vallue with the entered plain password
userSchema.methods.matchPassword=async function(enteredPassword){
    return  await bcryptjs.compare(enteredPassword,this.password);
}

const User=mongoose.model("user",userSchema);
export default User;
