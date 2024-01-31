import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { prismaClient } from '../../db';


interface GoogleTokenResult{

        iss?:string;
        nbf?:number;
        aud?:string;
        sub?:string;
        email:string;
        email_verified:boolean;
        azp?:string;
        name?:string;
        picture?:string;
        given_name:string;
        family_name?:string;
        iat?:number;
        exp?:number;
        jti?:string;
        alg?:string;
        kid?:string;
        typ?:string
}
const queries={
    verifyGoogleToken:async (parent:any,{token}:{token:string})=>{ 
        const googleAuthToken = token
        const googleOAuthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
        googleOAuthURL.searchParams.set('id_token',googleAuthToken)

        const {data} = await axios.get<GoogleTokenResult>(googleOAuthURL.toString(),{
            responseType:"json"
        })

        const userExists = await prismaClient.user.findUnique({
            where:{email:data.email}
        })

        if(!userExists){
             await prismaClient.user.create({
                data:{
                    email:data.email,
                    firstName:data.given_name,
                    lastName:data.family_name,
                    profileImageUrl:data.picture
            }

            })
        }


       
        return "ok" 
    }
}

export const resolvers = {queries}