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
const Test_1 = require("./Test");
async function setUpServer() {
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
        cache: false,
        errorFormatter: (error) => {
            console.log("Begin of formatter");
            console.log(error);
            let testError = error;
            testError.statusCode = 400;
            testError.data = { message: "error test" };
            console.log("Middle of formatter: testError");
            console.log(testError);
            console.log("End of formatter");
            return testError;
        }
    });
    server.setErrorHandler((error, request, reply) => {
        console.log("Begin of handler");
        console.log(error);
        const testError = {
            test: "error handler test"
        };
        console.log("End of handler");
        reply.send(testError);
    });
    let port = 8082;
    server.listen(port).then((url) => {
        console.info("Server is running at ", url, "/playground");
    });
}
async function loadData() {
    let testData = new Test_1.Test();
    testData.code = "test";
    await Test_1.TestModel.create(testData);
}
setUpServer();
