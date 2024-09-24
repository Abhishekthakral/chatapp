import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchemas=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    phone:{
        type:String,
        unique:true,
        required:true,
    },
    fullName:{
        type:String,
        lowercase:true,
    },
    profile:{
        type:String
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }],
    refreshToken:{
        type:String
    }
    
},{
    timestamps:true,
});

UserSchemas.pre("save",async(next)=>{
    if(!this.isModified(password)) return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})

UserSchemas.methods.IsPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchemas.methods.generateAccessToken=async()=>{
    return await jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESSTOKEN_SECRET,
        {
            expiresIn:process.env.ACCESSTOKEN_EXPIRY
        }
    )
}

UserSchemas.methods.generateRefreshToken=async()=>{
    return await jwt.sign({
        _id:this._id,
    },
    process.env.REFRESHTOKEN_SECRET,
    {
        expiresIn:process.env.REFRESHTOKEN_EXPIRY
    }
)
}
export const User=mongoose.model("User",UserSchemas);