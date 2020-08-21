import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { TestService } from "./TestService";
import { Test } from "./Test";
import { TestInput } from "./TestInput";

@Resolver()
export class TestResolver {
    private readonly testService: TestService = new TestService();
    
    @Query(returns => [Test], { nullable: true })
    async find(@Arg("code", {nullable: false}) code: string): Promise<Test[]> {
        return await this.testService.getTest(code);
    }

    @Mutation(returns => Test)
    async save(@Arg("input", { nullable: false },) input: TestInput): Promise<Test> {
        return await this.testService.save(input);
    }
}