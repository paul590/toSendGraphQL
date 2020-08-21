"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const TestRepository_1 = require("./TestRepository");
const Test_1 = require("./Test");
const console_1 = require("console");
class TestService {
    constructor() {
        this.repo = new TestRepository_1.TestRepository();
    }
    async getTest(code) {
        return await this.repo.findByCode(code);
    }
    async save(input) {
        console_1.assert(input);
        let test = await this.getTest(input.code);
        console.log(test);
        if (test && test.length > 0) {
            throw new Error("Test already exists");
        }
        let t = new Test_1.Test();
        t.code = input.code;
        return await this.repo.saveCode(t);
    }
}
exports.TestService = TestService;
