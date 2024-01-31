import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { User } from './user';

dotenv.config({
    path: "./.env",
  });

export async function initializeServer(){

    const app = express()
    // middlewares
    app.use(express.json())
    app.use(cors ())

    // 

    const server = new ApolloServer({
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
    

   app.use('/graphql',expressMiddleware(server))

    
   return app
}