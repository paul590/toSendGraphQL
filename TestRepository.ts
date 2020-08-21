import { Test, TestModel } from "./Test";

export class TestRepository {

    async findByCode(input: string): Promise<Test[]> {
        return await TestModel.find({ code: input });
    }

    async saveCode(test: Test): Promise<Test>{
        return await TestModel.create(test);
    }

}