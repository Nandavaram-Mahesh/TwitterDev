"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeServer = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./user");
const jwt_1 = require("../utils/jwt");
const tweet_1 = require("./tweet");
dotenv_1.default.config({
    path: "./.env",
});
function initializeServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // middlewares
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        // 
        const server = new server_1.ApolloServer({
            typeDefs: `
            ${user_1.User.userTypes}
            ${tweet_1.Tweet.tweetTypes}

            type Query{
                ${user_1.User.queries}
                ${tweet_1.Tweet.queries}
            }

            type Mutation{
                ${tweet_1.Tweet.tweetMutations}
            }
           
        `,
            resolvers: Object.assign({ Query: Object.assign(Object.assign({}, user_1.User.resolvers.queryResolvers), tweet_1.Tweet.resolvers.queryResolvers), Mutation: Object.assign({}, tweet_1.Tweet.resolvers.mutationResolvers) }, tweet_1.Tweet.resolvers.extraResolvers),
        });
        yield server.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, { context: ({ req, res }) => __awaiter(this, void 0, void 0, function* () { return ({ user: req.headers.authorization ? jwt_1.JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]) : "" }); }) }));
        return app;
    });
}
exports.initializeServer = initializeServer;
