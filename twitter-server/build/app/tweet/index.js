"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const types_1 = require("./types");
const resolvers_1 = require("./resolvers");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
exports.Tweet = { tweetTypes: types_1.tweetTypes, resolvers: resolvers_1.resolvers, tweetMutations: mutations_1.tweetMutations, queries: queries_1.queries };
