import jwt  from "jsonwebtoken"
import { JWT_SECRETE_TOKEN } from "./constants";
import { User } from "@prisma/client";
import { JWTUser } from "./interfaces";



class JWTService{
    public static generateTokenForUser(user:User){

        const payload:JWTUser = {
            id:user.id,
            email:user.email
        }

        const jwtToken = jwt.sign(payload,JWT_SECRETE_TOKEN)
        
        return jwtToken
    }

    public static decodeToken(token:string){
        return jwt.verify(token,JWT_SECRETE_TOKEN) as JWTUser
    }
}

export {JWTService}