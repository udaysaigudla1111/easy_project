import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { middleware } from "./middleware";
import { z } from "zod";
import prismaClient from "./prisma";
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

  try {
    await prismaClient.user.create({
      data: {
        email: parsedBody?.data.email,
        password: parsedBody.data.password,
        name: parsedBody.data.name,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: "User already exists please do signin",
    });
  }
});

app.post("/signin", (req, res) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: "JWT secret not found",
    });
  }

  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    token,
  });
});

app.post("/create-room", middleware, (req: any, res) => {});

app.listen(3000, () => {
  console.log(`http-server is listening on port ${3000}`);
});
