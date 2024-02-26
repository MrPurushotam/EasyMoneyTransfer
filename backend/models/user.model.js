const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
   },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required: true,
        minLength: 6
    },
    firstname:{
        type:String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname:{
        type:String,
        required: true,
        trim: true,
        maxLength: 50
    }
})
// we ain't hashing password here 
userSchema.methods.checkPassword=function(password){
    return (this.password==password)
}

const User = mongoose.model("User",userSchema);

module.exports={User}
