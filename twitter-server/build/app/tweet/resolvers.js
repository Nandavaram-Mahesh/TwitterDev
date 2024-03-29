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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../db");
const queryResolvers = {
    getAllTweets: () => __awaiter(void 0, void 0, void 0, function* () {
        const tweets = yield db_1.prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } });
    })
};
const mutationResolvers = {
    createTweet: (parent, { payload }, cxt) => __awaiter(void 0, void 0, void 0, function* () {
        if (!cxt.user)
            throw new Error("You are not authorized");
        const tweet = yield db_1.prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageUrl: payload.imageUrl,
                author: { connect: { id: cxt.user.id } }
            }
        });
        return tweet;
    })
};
const extraResolvers = {
    Tweet: {
        author: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield db_1.prismaClient.user.findUnique({ where: { id: parent.authorId } });
            return author;
        })
    }
};
exports.resolvers = { mutationResolvers, extraResolvers, queryResolvers };
