import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType()
export class Test {
    @Field()
    @Property({ required: true })
    code!: string;
}

export const TestModel = getModelForClass(Test); 