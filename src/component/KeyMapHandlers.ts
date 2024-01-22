export const getHandlers = (navigate: any, dialog: any | null) => {
    return {
        GO_HOME: (event: KeyboardEvent | undefined) => navigate("/"),
        GO_OPERATIONS: (event: KeyboardEvent | undefined) => navigate("/operations"),
        GO_GROUPS: (event: KeyboardEvent | undefined) => navigate("/groups"),
        GO_HISTORY: (event: KeyboardEvent | undefined) => navigate("/history"),
        GO_RATES: (event: KeyboardEvent | undefined) => navigate("/rates"),
        OPEN_POST_SEPARATE: (event: KeyboardEvent | undefined) => {
            if (dialog) {
                dialog(false);
            }
        },
        OPEN_POST_SINGLE: (event: KeyboardEvent | undefined) => {
            if (dialog) {
                dialog(true);
            }
        }
    };
};

export const keyMap = {
    GO_HOME: "option+a",
    GO_OPERATIONS: "option+s",
    GO_GROUPS: "option+d",
    GO_HISTORY: "option+f",
    GO_RATES: "option+g",
    OPEN_POST_SEPARATE: "option+p",
    OPEN_POST_SINGLE: "option+o"
};
