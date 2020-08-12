"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const fastify_1 = __importDefault(require("fastify"));
const fastify_gql_1 = __importDefault(require("fastify-gql"));
const TestResolver_1 = require("./TestResolver");
async function setUpServer() {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [TestResolver_1.TestResolver],
        validate: true
    });
    const server = fastify_1.default();
    server.register(fastify_gql_1.default, {
        schema,
        jit: 1,
        path: "/",
        graphiql: "playground",
        errorHandler: false
    });
    server.setErrorHandler((error, request, reply) => {
        const testError = {
            test: "error handler test"
        };
        reply.send(testError);
    });
    let port = 8081;
    server.listen(port).then((url) => {
        console.info("Server is running at ", url, "/playground");
    });
}
setUpServer();
