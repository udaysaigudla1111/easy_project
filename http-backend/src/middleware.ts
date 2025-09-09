import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const middleware = (req:any,res:Response,next:NextFunction)=>{

    const token = req.headers["token"] as string; 
    if(!process.env.JWT_SECRET)
    {
        return res.status(500).json({
            message:"JWT SECRET is not configured"
        })
    }
    if(token)
    {
        try 
        {
            const decoded = jwt.verify(token,process.env.JWT_SECRET) as jwt.JwtPayload
            req.userId = decoded.userId;
            next();
        } catch (error) {
        
        return res.status(400).json({
            message:"Invalid token/token has expired"
        })
            
        }
    }
    return res.status(400).json({
        message:"Token not found"
    })

}