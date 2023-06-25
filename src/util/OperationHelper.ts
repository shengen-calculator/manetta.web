class OperationHelper {
    static getActualDate = (items: Array<Operation>): string => {
        const operations = [...items];
        operations.sort((a, b) => a.created - b.created);
        if (!operations.length) {
            return new Date().toISOString().slice(0, 10);
        }
        const operation = operations.pop();
        return operation && operation.date ?
            new Date(operation.date).toISOString().slice(0, 10) : "";
    };

    static getActualAccount = (items: Array<Operation>, accounts: Array<Account>): string => {
        const operations = [...items];
        operations.sort((a, b) => a.created - b.created);
        if (!operations.length) {
            return accounts.length ? accounts[0].name : "";
        }
        const operation = operations.pop();
        return operation && operation.account ? operation.account : "";
    }
}

export default OperationHelper;
