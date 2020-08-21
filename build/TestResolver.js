"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolver = void 0;
const type_graphql_1 = require("type-graphql");
const TestService_1 = require("./TestService");
const Test_1 = require("./Test");
const TestInput_1 = require("./TestInput");
let TestResolver = class TestResolver {
    constructor() {
        this.testService = new TestService_1.TestService();
    }
    async find(code) {
        return await this.testService.getTest(code);
    }
    async save(input) {
        return await this.testService.save(input);
    }
};
__decorate([
    type_graphql_1.Query(returns => [Test_1.Test], { nullable: true }),
    __param(0, type_graphql_1.Arg("code", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "find", null);
__decorate([
    type_graphql_1.Mutation(returns => Test_1.Test),
    __param(0, type_graphql_1.Arg("input", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TestInput_1.TestInput]),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "save", null);
TestResolver = __decorate([
    type_graphql_1.Resolver()
], TestResolver);
exports.TestResolver = TestResolver;
