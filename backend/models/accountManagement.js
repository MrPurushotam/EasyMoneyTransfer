const mongoose=require("mongoose")

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    balance:{
        type:Number,
        default:0,
        required: true
    }
})

const Account=mongoose.model("Account",accountSchema)
module.exports={Account}
