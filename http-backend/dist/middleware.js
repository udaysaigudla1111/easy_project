"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    const token = req.headers["token"];
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "JWT SECRET is not configured"
        });
    }
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
        catch (error) {
            return res.status(400).json({
                message: "Invalid token/token has expired"
            });
        }
    }
    else {
        return res.status(400).json({
            message: "Token not found",
        });
    }
};
exports.middleware = middleware;
