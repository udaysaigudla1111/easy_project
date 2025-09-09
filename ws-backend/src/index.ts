import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {

  const url = request.url;
  if(!url||!process.env.JWT_SECRET){
    ws.close();
    return
  } 

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('name') ?? "";

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET) as jwt.JwtPayload
    const userId = decoded.userId
  } catch (error) {
    ws.close();
    return;
  }

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});