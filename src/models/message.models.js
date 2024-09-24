import mongoose from 'mongoose';

const MessageSchema=new mongoose.Schema({
    text:{
        type:String
    },
    image:{
        type:String
    },
    video:{
        type:String
    },
    audio:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});

export const Message=mongoose.model("Message",MessageSchema);