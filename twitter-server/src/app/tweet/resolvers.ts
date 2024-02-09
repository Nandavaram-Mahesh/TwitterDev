import { Tweet } from "@prisma/client"
import { prismaClient } from "../../db"
import { MyContext } from "../../utils/interfaces"
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface createTweetData{
    content:string
    imageUrl?:string
}

const queryResolvers ={
    getAllTweets:async()=>{
        const tweets = await prismaClient.tweet.findMany({orderBy:{createdAt:"desc"}})
    }
}

const mutationResolvers ={
    createTweet:async (parent:any,{payload}:{payload:createTweetData},cxt:MyContext)=>{
        if(!cxt.user) throw new Error("You are not authorized")
        
        const tweet = await prismaClient.tweet.create({
            data:{
                content:payload.content,
                imageUrl:payload.imageUrl,
                author:{connect:{id:cxt.user.id}}
            }
        })
        return tweet
    }
}

const extraResolvers={
    Tweet:{
        author:async(parent:Tweet)=>{
            const author = await prismaClient.user.findUnique({where:{id:parent.authorId}})
            return author
        }
    }
}

export const resolvers ={mutationResolvers,extraResolvers,queryResolvers}