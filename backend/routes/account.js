const Router=require("express")
const zod=require('zod')
const { default: mongoose } = require('mongoose');
const authMiddleware = require("../middleware/middleware.js")
const { Account } = require("../models/accountManagement.js")
const {User}= require("../models/user.model.js")

const router=Router()

router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({userId:req.userId})
    if(!account){
        return res.status(411).json({message:"Internal Error"})
    }
    res.status(200).json({message:"fetched",balance:account.balance})
})


const sendUserIdObject=zod.object({
    email:zod.string().email()
})

router.post("/userid",authMiddleware,async(req,res)=>{
    const {success} = sendUserIdObject.safeParse(req.body)
    if(!success){
        return res.status(400).json({message:"Invalid email."})
    }
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(200).json({message:"User doesn't exists."})
    }
    res.status(200).json({messaage:"User id found.",id:user._id})
})

const transferObject=zod.object({
    to:zod.string(),
    amount:zod.string()
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    const {success}= transferObject.safeParse(req.body)
    if(!success){
        return res.status(400).json({message:"Invalid account",success:false})
    }
    const transactionConfig = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
        maxCommitTimeMS: 1000
      };
    session.startTransaction(transactionConfig);
    const {to,amount}=req.body
    const parsedAmount=parseFloat(amount)
    const account=await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.balance<parsedAmount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance",
            success:false
        })
    }

    const toAccount= await Account.findOne({userId:to}).session(session)
    
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid Account.",
            success:false
        })
    }

    await Account.findOneAndUpdate({userId:req.userId},{$inc:{balance:-parsedAmount}}).session(session)
    await Account.findOneAndUpdate({userId:to},{$inc:{balance:parsedAmount}}).session(session)

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful",
        success:true
    })
})

// async function transfer(req){
//     const session=await mongoose.startSession()
//     const transactionConfig = {
//         readPreference: 'primary',
//         readConcern: { level: 'local' },
//         writeConcern: { w: 'majority' },
//         maxCommitTimeMS: 1000
//       };
//     session.startTransaction(transactionConfig);
//     const {to,amount}=req.body
//     const parsedAmount=parseFloat(amount)
//     const account=await Account.findOne({userId:req.userId}).session(session)

//     if(!account || account.balance<parsedAmount){
//         await session.abortTransaction();
//         return res.status(400).json({
//             message: "Insufficient balance"
//         })
//     }

//     const toAccount= await Account.findOne({userId:to}).session(session)
    
//     if(!toAccount){
//         await session.abortTransaction()
//         return res.status(400).json({
//             message:"Invalid Account."
//         })
//     }

//     await Account.findOneAndUpdate({userId:req.userId},{$inc:{balance:-parsedAmount}}).session(session)
//     await Account.findOneAndUpdate({userId:to},{$inc:{balance:parsedAmount}}).session(session)

//     await session.commitTransaction();
//     res.status(200).json({
//         message: "Transfer successful"
//     })
// }

// transfer({
//     body:{
//         to:"65d9eb282474662f11aff90e",
//         amount:"500"
//     },
//     userId:"65d9eba42474662f11aff917"
// })
// transfer({
//     body:{
//         to:"65d9eb282474662f11aff90e",
//         amount:"100"
//     },
//     userId:"65d9eba42474662f11aff917"
// })

module.exports=router