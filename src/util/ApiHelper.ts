class ApiHelper {
    static getIdFromResult = (data: any): string =>
    {
        try {
            const mutationResults: any[] = data.pop()["mutationResults"];
            const key: any = mutationResults.pop()["key"];
            const path: any[] = key["path"];
            const firstPath = path.pop();
            return firstPath["id"];
        } catch (e) {
            return "0";
        }
    }
}

export default ApiHelper;
