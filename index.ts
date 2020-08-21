import "reflect-metadata";
import { buildSchema } from "type-graphql";
import fastify from "fastify";
import GQL from "fastify-gql";
import { TestResolver } from "./TestResolver";
import { Database } from "./Database";
import { Test, TestModel } from "./Test";

async function setUpServer(){

    const db = new Database();
    await db.setup();

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
        cache: false
    });
    server.setErrorHandler((error, request, reply) => {
        const testError = {
            test: "error handler test"
        }
        reply.send(testError);
    });

    let port = 8081;
    server.listen(port).then((url) => {
        console.info("Server is running at ", url, "/playground");
    });

    await loadData();
}

async function loadData() {
    let testData = new Test();
    testData.code = "test";

    await TestModel.create(testData);
}

setUpServer();