import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { middleware } from './middleware';
const app = express();
dotenv.config();

app.use(express.json())

app.post("/signup",(req,res)=>{
    
})

app.post("/signin",(req,res)=>{

    if(!process.env.JWT_SECRET)
    {
        return res.status(500).json({
            error:"JWT secret not found"
        })
    }

    const userId=1;
    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET)

    return res.status(200).json({
        token
    })

})

app.post("/create-room",middleware,(req:any,res)=>{



})

app.listen(3000,()=>{
    console.log(`http-server is listening on port ${3000}`);
})