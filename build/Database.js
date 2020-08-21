"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const typegoose_1 = require("@typegoose/typegoose");
class Database {
    async setup() {
        const mongod = new mongodb_memory_server_1.MongoMemoryServer();
        const uri = await mongod.getUri();
        const dbName = await mongod.getDbName();
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName,
            bufferCommands: false,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: true,
            bufferMaxEntries: 0,
            connectTimeoutMS: 1000,
            socketTimeoutMS: 30000
        };
        console.log(`Connecting to DB: ${uri}...`);
        await typegoose_1.mongoose.connect(uri, options).catch(err => {
            console.error(`Error connecting to DB: ${uri}`, err);
            process.exit(1);
        });
        console.log(`connected to DB: ${uri}`);
    }
    async disconnect() {
        await typegoose_1.mongoose.disconnect();
    }
}
exports.Database = Database;
