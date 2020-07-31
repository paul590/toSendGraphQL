"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
class TestService {
    async test(code) {
        if (code == "test") {
            throw new Error("Error test");
        }
        return "Test";
    }
}
exports.TestService = TestService;
