const Router=require('express')
const zod=require("zod")
const { User } = require('../models/user.model.js')
const authMiddleware = require('../middleware/middleware.js')

const router=Router()
const newdataObject=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.use(authMiddleware)
router.route("/").post(async (req,res)=>{
    const {success}=newdataObject.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},req.body);
    res.json({
        message:"Update successful"
    })
})

module.exports=router