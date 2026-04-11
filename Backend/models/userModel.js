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
// this.password= this yha current user document ko represent krta h (ham mongoose me data objects k form m save krte h ise lia uski fields ko access krne k lia ham this .password k use kr rhe h)
// 10 salt rounds 
// register k time jb new user save hoga
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcryptjs.hash(this.password,10);
})

// login k time
//check password by comparing hash vallue with the entered plain password
userSchema.methods.matchPassword=async function(enteredPassword){
    return  await bcryptjs.compare(enteredPassword,this.password);
}

const User=mongoose.model("User",userSchema);
export default User;
