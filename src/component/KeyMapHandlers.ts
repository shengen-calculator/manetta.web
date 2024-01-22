export const getHandlers = (navigate: any) => {
    return  {
        GO_HOME: (event: KeyboardEvent | undefined) => navigate("/"),
        GO_OPERATIONS: (event: KeyboardEvent | undefined) => navigate("/operations"),
        GO_GROUPS: (event: KeyboardEvent | undefined) => navigate("/groups"),
        GO_HISTORY: (event: KeyboardEvent | undefined) => navigate("/history"),
        GO_RATES: (event: KeyboardEvent | undefined) => navigate("/rates")
    };
};

export const keyMap = {
    GO_HOME: "option+h",
    GO_OPERATIONS: "option+o",
    GO_GROUPS: "option+g",
    GO_HISTORY: "option+s",
    GO_RATES: "option+r"
};
