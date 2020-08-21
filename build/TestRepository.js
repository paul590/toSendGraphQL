"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRepository = void 0;
const Test_1 = require("./Test");
class TestRepository {
    async findByCode(input) {
        return await Test_1.TestModel.find({ code: input });
    }
    async saveCode(test) {
        return await Test_1.TestModel.create(test);
    }
}
exports.TestRepository = TestRepository;
