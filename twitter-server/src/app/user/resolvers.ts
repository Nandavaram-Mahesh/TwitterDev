import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { prismaClient } from '../../db';
import { JWTService } from '../../utils/jwt';
import { GoogleTokenResult, MyContext } from '../../utils/interfaces';



const queryResolvers={

    verifyAndGenerateToken:async (parent:any,{token}:{token:string})=>{ 
        
        const googleAuthToken = token
        
        // const googleOAuthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
        // googleOAuthURL.searchParams.set('id_token',googleAuthToken)

        const googleOAuthURL =`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`

        const {data} = await axios.get<GoogleTokenResult>(googleOAuthURL,{
            responseType:"json"
        })

    
        
        const existingUser = await prismaClient.user.findUnique({
            where:{email:data.email}
        })

        

        if(!existingUser){  
             await prismaClient.user.create({
                data:{
                    email:data.email,
                    firstName:data.given_name,
                    lastName:data.family_name,
                    profileImageUrl:data.picture
            }

            })
        }
         
        const userInDb = await prismaClient.user.findUnique({
            where:{email:data.email}
        })

            
        if(!userInDb) throw new Error("User Not Found In DB")

        const userToken = JWTService.generateTokenForUser(userInDb)
       
        return userToken 
    },
    getCurrentUser:async(parent:any,args:any,context:MyContext)=>{
        const id =  context.user?.id
        if(!id) return null
        const user = await prismaClient.user.findUnique({where:{id}})
        return user
    },
    getUserById:async(parent:any,{id}:{id:string},context:MyContext)=>{
        const user = await prismaClient.user.findUnique({where:{id}})
        return user
    }

}

export const resolvers = {queryResolvers}