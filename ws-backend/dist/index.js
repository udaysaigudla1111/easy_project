"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./prisma"));
dotenv_1.default.config();
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
const checkUser = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        return userId;
    }
    catch (error) {
        return null;
    }
};
const joinRoom = (ws, parsedData, users, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.room.findFirstOrThrow({
            where: {
                id: parsedData.roomId
            },
        });
    }
    catch (error) {
        ws.send(JSON.stringify({
            message: "Room name does not exist!!! disconnecting the connection"
        }));
        ws.close();
        return;
    }
    users.forEach((user) => {
        if (user.userId === userId && !user.rooms.includes(parsedData.roomId)) {
            user.rooms.push(parsedData.roomId);
        }
    });
});
const leaveRoom = (ws, parsedData, users, userId) => {
    users.forEach((user) => {
        if (user.userId === userId) {
            user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
        }
    });
};
const chat = (ws, parsedData, users, userId) => __awaiter(void 0, void 0, void 0, function* () {
    users.forEach((user) => {
        if (user.userId !== userId && user.rooms.includes(parsedData.roomId)) {
            user.ws.forEach((ws) => {
                ws.send(JSON.stringify({
                    type: 'chat',
                    message: parsedData.message,
                    roomId: parsedData.roomId
                }));
            });
        }
    });
    yield prisma_1.default.chatHistory.create({
        data: {
            message: parsedData.message,
            userId,
            roomId: parsedData.roomId,
        }
    });
});
wss.on('connection', function connection(ws, request) {
    var _a;
    const url = request.url;
    if (!url || !process.env.JWT_SECRET) {
        ws.close();
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = (_a = queryParams.get('token')) !== null && _a !== void 0 ? _a : "";
    const userId = checkUser(token);
    if (!userId) {
        ws.close();
        return;
    }
    let userFound = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
            users[i].ws.push(ws);
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        users.push({
            userId,
            rooms: [],
            ws: [ws]
        });
    }
    ws.on('error', console.error);
    ws.on('message', (data) => __awaiter(this, void 0, void 0, function* () {
        const parsedData = JSON.parse(data.toString()); // { type:'join_room',roomId:'chemistry class'}
        switch (parsedData.type) {
            case 'join_room':
                yield joinRoom(ws, parsedData, users, userId);
                break;
            case 'leave_room':
                leaveRoom(ws, parsedData, users, userId);
                break;
            case 'chat':
                yield chat(ws, parsedData, users, userId);
                break;
        }
    }));
    ws.send('something');
});
