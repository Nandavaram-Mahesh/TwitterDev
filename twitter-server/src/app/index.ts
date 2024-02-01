import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { User } from './user';
import { MyContext } from '../utils/interfaces';
import { JWTService } from '../utils/jwt';

dotenv.config({
    path: "./.env",
  });

  
export async function initializeServer(){

    const app = express()
    // middlewares
    app.use(express.json())
    app.use(cors ())

    // 
    

    const server = new ApolloServer<MyContext>({
        typeDefs:`
            ${User.types}
            type Query{
                ${User.queries}
            }
           
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
           
        },
      });
    
    await server.start()
    

   app.use('/graphql',expressMiddleware(server,{context: async ({ req, res }) => ({user: req.headers.authorization?JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]):""})}))

    
   return app
}