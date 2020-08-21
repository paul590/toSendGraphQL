import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class TestInput {
    @IsNotEmpty()
    @Field()
    code!: string;
}