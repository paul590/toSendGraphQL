export class TestService {
    async test(code: string): Promise<String> {
        if(code == "test") {
            throw new Error("Error test");
        }
        return "Test";
    }
}