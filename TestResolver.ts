import { Resolver, Query, Arg } from "type-graphql";
import { TestService } from "./TestService";

@Resolver()
export class TestResolver {
    private readonly testService: TestService = new TestService();
    
    @Query(returns => String, { nullable: true })
    async find(@Arg("code", {nullable: false}) code: string): Promise<string> {
        return await this.testService.getTest(code);
    }
}