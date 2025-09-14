import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { middleware } from "./middleware";
import { z } from "zod";
import prismaClient from "./prisma";
import bcrypt from 'bcrypt'
const app = express();
dotenv.config();

app.use(express.json());

app.post("/signup", async (req, res) => {

  const requiredBody = z.object({
    email: z.string().min(3).max(20),
    name: z.string(),
    password: z.string(),
  });

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Incorrect Inputs",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(parsedBody.data.password,10);
  try {
   const user = await prismaClient.user.create({
      data: {
        email: parsedBody?.data.email,
        password: hashedPassword,
        name: parsedBody.data.name,
      },
    });

    res.status(200).json({
      message: "User signup successfully!!",
      email: req.body.email,
    });
    return;
  } catch (error: any) {
    res.status(400).json({
      message: "User already exists please do signin",
    });
  }
});

app.post("/signin", async (req, res) => {

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: "JWT secret not found",
    });
  }

  const {email,password} = req.body;

  const requiredBody = z.object({
    email:z.string().min(3).max(20),
    password:z.string()
  })

  const parsedBody = requiredBody.safeParse(req.body)

  if(!parsedBody.success)
  {
    res.status(400).json({
        message:"Incorrect Inputs!!"
    })
  }

  const user = await prismaClient.user.findFirst({
    where:{
        email:parsedBody.data?.email
    }
  })
  if(user===null){
    res.status(400).json({
        message:"User not found please do signin"
    })
    return
  }else{
    console.log(user.password);
    
  const isPasswordMatched = await bcrypt.compare(password,user.password)
  if(!isPasswordMatched)
  {
        res.status(400).json({
            message:"Incorrect password, please enter the correct password!!!"
        })
  }
  const token = jwt.sign(
    {
        userId:user.id
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    token,
  });

  }
});

app.post("/create-room", middleware, async(req: any, res) => {

    const requiredBody = z.object({
        slug:z.string().min(3).max(20)
    })

    const parsedBody = requiredBody.safeParse(req.body);

    if(!parsedBody.success)
    {   
        res.status(400).json({
            message:"Incorrect Inputs"
        })
        return;
    }

    const userId = req.userId;
    try {
     const room = await prismaClient.room.create({
       data: {
         slug: parsedBody.data.slug,
         adminId: userId,
       },
     });
     res.status(200).json({
        message:`Room ${parsedBody.data.slug} is created!!`,
        roomId:room.id
     })
     return;
    } catch (error) {
        res.status(400).json({
            message:`Room name ${parsedBody.data.slug} already exists!!!`,
        })
        return;
    }

});


app.get("/chats/:roomId",middleware,async (req,res)=>{

  const roomId = Number(req.params.roomId);

 const messages  = await prismaClient.chatHistory.findMany({
    where:{
      roomId:roomId
    },
    include:{
      user:{
        select:{
          name:true
        }
      }
    },
    orderBy:{
      id:'desc'
    },
    take:50
  })

  res.status(200).json({
    messages
  })

})


app.listen(3000, () => {
  console.log(`http-server is listening on port ${3000}`);
});
