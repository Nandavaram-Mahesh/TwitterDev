export const queries=`#graphql
    verifyAndGenerateToken(token:String!):String
    getCurrentUser:User
    getUserById(id:ID!):User
`