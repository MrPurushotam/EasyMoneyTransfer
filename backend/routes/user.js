const zod=require("zod")
const Router=require("express");
const jwt=require("jsonwebtoken")
const { User } = require("../models/user.model.js");
const { JWT_SECRET } = require("../config.js");
const { Account } = require("../models/accountManagement.js");
const updateUser=require("./updateUser.js");
const authMiddleware = require("../middleware/middleware.js");

const router=Router()

const signupBody=zod.object({
    email:zod.string().email(),
    username:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string(),
})

router.route("/signup").post(async(req,res)=>{
    const {success}=signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Email already taken/ incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        $or:[
            {username:req.body.username},
            {email:req.body.email}
        ]
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }
    
    const user = await User.create({
        email:req.body.email,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    user.save()
    const userId = user._id;
    await Account.create({
        userId:userId,
        balance:1+Math.random()*10000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinObject=zod.object({
    email:zod.string().email(),
    password:zod.string()
})

router.route("/signin").post(async(req,res)=>{
    const {success}=signinObject.safeParse(req.body)
    if(!success){
        return res.status(411).json({message:"Incorrect inputs"})
    }
    const user=await User.findOne({email:req.body.email})
    if(!user.checkPassword(req.body.password)){
        return res.status(411).json({message:'Error while logging in'})
    }
    if(user){
        const token=jwt.sign({
            userId:user._id,
        },JWT_SECRET)
        return res.status(200).json({token:token})
    }
    return res.status(411).json({
        message:"Error while logging in"
    })
})

router.get("/getuser",authMiddleware,async (req,res)=>{
    try {
        const user= await User.findOne({_id:req.userId})
        res.status(200).json({user:{_id:user._id,username:user.username,firstname:user.firstname,lastname:user.lastname,email:user.email}})

    } catch (error) {
        console.log("Error occured ",error.message)
        res.status(500).json({message:`Error occured ${error.message}`})
    }
})

router.route("/bulk").get(async(req,res)=>{
    let filter= req.query.filter || ""
    if(!filter.trim()){
        return res.status(200).json({
            message:"No user found please check input data."
        })
    }
    let query = {};
    if (filter) {
        query.$or = [
            { firstname: filter },
            { lastname: filter },
            { email: filter }
        ];
    }
    try {
        const users=await User.find(query)
        if(users.length===0){
            return res.status(200).json({
                message:"No user found please check input data."
            })
        }
        res.status(200).json({
            users:users.map(user=>({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id
            }))
        })
    
    } catch (error) {
        console.log("error occured",error.message)
        res.status(500).json({message:"Error Occured"})
    }
})

router.use(updateUser) // updating  pass , firstname,lastname


module.exports = router;    