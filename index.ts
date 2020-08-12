import "reflect-metadata";
import { buildSchema } from "type-graphql";
import fastify from "fastify";
import GQL from "fastify-gql";
import { TestResolver } from "./TestResolver";

async function setUpServer(){

    const schema = await buildSchema({
        resolvers: [TestResolver],
        validate: true
    })

    const server = fastify();
    server.register(GQL, {
        schema,
        jit: 1,
        path: "/",
        graphiql: "playground",
        errorHandler: false
    })
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

}

setUpServer();