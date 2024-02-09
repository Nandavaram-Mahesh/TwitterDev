"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
exports.userTypes = `#graphql

type User{
    id:ID!
    firstName:String!
    lastName:String
    email:String!
    profileImageUrl:String
    tweets:[Tweet]
}

`;
