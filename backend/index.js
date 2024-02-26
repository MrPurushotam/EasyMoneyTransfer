const express = require("express");
const {connect} = require("./db/index.js");
const rootRouter = require("./routes/index.js");
const cors=require("cors")
const app=express()

// its connecting databse

require("dotenv").config()
connect()
app.use(express.json())
app.use(cors())

app.use("/api/v1",rootRouter)
// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/account/balance (get)
// /api/v1/account/transfer

// :TODO: left here check for signup and signin and balance and transfer
app.listen(3000,()=>console.log("up on 3000"))