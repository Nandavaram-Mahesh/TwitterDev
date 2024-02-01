"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
class JWTService {
    static generateTokenForUser(user) {
        const payload = {
            id: user.id,
            email: user.email
        };
        const jwtToken = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRETE_TOKEN);
        return jwtToken;
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRETE_TOKEN);
    }
}
exports.JWTService = JWTService;
