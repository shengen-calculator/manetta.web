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
    GO_HOME: "1",
    GO_OPERATIONS: "2",
    GO_GROUPS: "3",
    GO_HISTORY: "4",
    GO_RATES: "5",
    OPEN_POST_SEPARATE: "option+p",
    OPEN_POST_SINGLE: "option+l"
};
