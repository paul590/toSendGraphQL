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
const Database_1 = require("./Database");
const Test_1 = require("./Test");
async function setUpServer() {
    const db = new Database_1.Database();
    await db.setup();
    const schema = await type_graphql_1.buildSchema({
        resolvers: [TestResolver_1.TestResolver],
        validate: true
    });
    const server = fastify_1.default({ logger: true });
    server.register(fastify_gql_1.default, {
        schema,
        jit: 1,
        path: "/",
        graphiql: "playground",
        errorHandler: false,
        cache: false
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
    await loadData();
}
async function loadData() {
    let testData = new Test_1.Test();
    testData.code = "test";
    await Test_1.TestModel.create(testData);
}
setUpServer();
