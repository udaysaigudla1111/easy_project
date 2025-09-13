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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("./prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(20),
        name: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(400).json({
            message: "Incorrect Inputs",
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(parsedBody.data.password, 10);
    try {
        const user = yield prisma_1.default.user.create({
            data: {
                email: parsedBody === null || parsedBody === void 0 ? void 0 : parsedBody.data.email,
                password: hashedPassword,
                name: parsedBody.data.name,
            },
        });
        res.status(200).json({
            message: "User signup successfully!!",
            email: req.body.email,
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            message: "User already exists please do signin",
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            error: "JWT secret not found",
        });
    }
    const { email, password } = req.body;
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(20),
        password: zod_1.z.string()
    });
    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(400).json({
            message: "Incorrect Inputs!!"
        });
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: (_a = parsedBody.data) === null || _a === void 0 ? void 0 : _a.email
        }
    });
    if (user === null) {
        res.status(400).json({
            message: "User not found please do signin"
        });
        return;
    }
    else {
        console.log(user.password);
        const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatched) {
            res.status(400).json({
                message: "Incorrect password, please enter the correct password!!!"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            token,
        });
    }
}));
app.post("/create-room", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        slug: zod_1.z.string().min(3).max(20)
    });
    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(400).json({
            message: "Incorrect Inputs"
        });
        return;
    }
    const userId = req.userId;
    try {
        const room = yield prisma_1.default.room.create({
            data: {
                slug: parsedBody.data.slug,
                adminId: userId,
            },
        });
        res.status(200).json({
            message: `Room ${parsedBody.data.slug} is created!!`,
            roomId: room.id
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            message: `Room name ${parsedBody.data.slug} already exists!!!`,
        });
        return;
    }
}));
app.listen(3000, () => {
    console.log(`http-server is listening on port ${3000}`);
});
