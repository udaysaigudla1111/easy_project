import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import prismaClient from './prisma'
dotenv.config()
const wss = new WebSocketServer({ port: 8080 });

interface User{
  userId:string,
  ws:WebSocket[],
  rooms:number[]
}

const users:User[] = []

const checkUser = (token:string):null|string=>{

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as jwt.JwtPayload
    const userId = decoded.userId;
    return userId;
  } catch (error) {
    return null;
  }

}

const joinRoom = async (ws:WebSocket,parsedData:{type:string,roomId:number},users:User[],userId:string)=>{

  try {
    await prismaClient.room.findFirstOrThrow({
      where: {
        id:parsedData.roomId
      },
    }); 
  } catch (error:any) {
    ws.send(JSON.stringify({
      message:"Room name does not exist!!! disconnecting the connection"
    }))
    ws.close();
    return;
  }

  users.forEach((user:User)=>{
    if(user.userId===userId&&!user.rooms.includes(parsedData.roomId))
    {
      user.rooms.push(parsedData.roomId)
    }
  })  

}

const leaveRoom = (ws:WebSocket,parsedData:{type:string,roomId:number},users:User[],userId:string)=>{

  users.forEach((user:User)=>{
      if(user.userId===userId)
      {
         user.rooms = user.rooms.filter((room:number)=> room!==parsedData.roomId)
      }
  })

}

const chat = async (ws:WebSocket,parsedData:{type:string,roomId:number,message:string},users:User[],userId:string)=>{

    users.forEach((user:User)=>{
        if(user.userId!==userId&&user.rooms.includes(parsedData.roomId))
        { 
          user.ws.forEach((ws:WebSocket)=>{
            ws.send(JSON.stringify({
              type:'chat',
              message:parsedData.message,
              roomId:parsedData.roomId
            }))
          })
        }
    })

    await prismaClient.chatHistory.create({
      data:{
        message:parsedData.message,
        userId,
        roomId:parsedData.roomId,
      }
    })

}

wss.on('connection', function connection(ws,request) {

  const url = request.url;
  if(!url||!process.env.JWT_SECRET){
    ws.close();
    return
  } 

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') ?? "";

  const userId = checkUser(token)

  if(!userId)
  {
    ws.close();
    return;
  }

  let userFound:boolean=false;
  for(let i=0;i<users.length;i++)
  {
      if(users[i].userId===userId)
      {
          users[i].ws.push(ws);
          userFound=true;
          break;
      }
  }
  if(!userFound)
  {
    users.push({
      userId,
      rooms:[],
      ws:[ws]
    })
  }

  ws.on('error', console.error);

 ws.on('message',async (data)=>{

    const parsedData = JSON.parse(data.toString()) // { type:'join_room',roomId:'chemistry class'}

    switch (parsedData.type) {
      case 'join_room':
      await joinRoom(ws,parsedData,users,userId);
      break;
      case 'leave_room':
      leaveRoom(ws, parsedData, users, userId);
      break;
      case 'chat':
      await chat(ws, parsedData, users, userId);
      break;
    }


 })

  ws.send('something');

});