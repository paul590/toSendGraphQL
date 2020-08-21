import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoose } from "@typegoose/typegoose";

export class Database {

    async setup() {
        const mongod = new MongoMemoryServer();

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
        await mongoose.connect(uri, options).catch(err => {
            console.error(`Error connecting to DB: ${uri}`, err);
            process.exit(1);
        });
        console.log(`connected to DB: ${uri}`);
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

}