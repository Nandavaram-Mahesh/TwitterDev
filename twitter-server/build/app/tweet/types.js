"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetTypes = void 0;
exports.tweetTypes = `#graphql
 
input CreateTweetData{
    content:String!
    imageUrl:String
}

type Tweet{
    id:ID!
    content:String!
    imageUrl:String
    author:User
}
`;
