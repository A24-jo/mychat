import { sign, verify } from "jsonwebtoken"
import { config } from 'dotenv';

config()
const secret: string = process.env.JWT_SECRET || "s";

export class JwtAdapter {

    static generateToken(payload: Object): string {
        const jwt = sign(payload, secret, { expiresIn: "8h"})
        return jwt;
    }

    static verifyToken(jwt: string): boolean {
        try {
           verify(jwt, secret);
            return true;
        } catch (error) {
            return false
        }

    }
}