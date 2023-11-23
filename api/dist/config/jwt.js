"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const secret = process.env.JWT_SECRET || "s";
class JwtAdapter {
    static generateToken(payload) {
        const jwt = (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: "8h" });
        return jwt;
    }
    static verifyToken(jwt) {
        try {
            (0, jsonwebtoken_1.verify)(jwt, secret);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.JwtAdapter = JwtAdapter;
