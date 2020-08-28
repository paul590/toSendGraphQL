export class TestService {

    async getTest(code: string): Promise<string> {
        throw new Error("Test error");
    }
}