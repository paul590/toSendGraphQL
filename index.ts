import "reflect-metadata";
import { buildSchema } from "type-graphql";
import fastify, { FastifyError } from "fastify";
import { GraphQLError } from "graphql";
import GQL from "fastify-gql";
import { TestResolver } from "./TestResolver";
import { Test, TestModel } from "./Test";

async function setUpServer(){

    const schema = await buildSchema({
        resolvers: [TestResolver],
        validate: true
    })

    const server = fastify({logger: true});
    server.register(GQL, {
        schema,
        jit: 1,
        path: "/",
        graphiql: "playground",
        errorHandler: false,
        cache: false,
        errorFormatter: (error: FastifyError | GraphQLError | Error) => {
            console.log("Begin of formatter");
            console.log(error);
            let testError = error as any;
            testError.statusCode = 400;
            testError.data = {message: "error test"};
            console.log("Middle of formatter: testError");
            console.log(testError);
            console.log("End of formatter");
            return testError;
        }
    } as any);
    server.setErrorHandler((error, request, reply) => {
        console.log("Begin of handler");
        console.log(error);
        const testError = {
            test: "error handler test"
        }
        console.log("End of handler");
        reply.send(testError);
    });

    let port = 8082;
    server.listen(port).then((url) => {
        console.info("Server is running at ", url, "/playground");
    });
}

async function loadData() {
    let testData = new Test();
    testData.code = "test";

    await TestModel.create(testData);
}

setUpServer();