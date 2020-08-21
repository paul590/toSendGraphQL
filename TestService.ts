import { TestRepository } from "./TestRepository";
import { Test } from "./Test";
import { assert } from "console";
import { TestInput } from "./TestInput";

export class TestService {
private readonly repo: TestRepository = new TestRepository();

    async getTest(code: string): Promise<Test[]> {
        return await this.repo.findByCode(code);
    }

    async save(input: TestInput): Promise<Test>{
        assert(input);
        let test = await this.getTest(input.code);
        console.log(test);
        if(test && test.length > 0) {
            throw new Error("Test already exists");
        }
        let t = new Test();
        t.code = input.code;
        return await this.repo.saveCode(t);
    }
}