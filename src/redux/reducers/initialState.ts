import {ApplicationState} from "./types";

const initialState: ApplicationState = {
    authentication: {
        role: "NOT_AUTHORIZED",
        logging: false,
        registering: false,
        error: ""
    },
    message: {
        type: "info",
        text: ""
    },
    operations: {
        isLoaded: false,
        items: []
    },
    history: {
        entries: [],
        cursor: ""
    },
    accounts: {
        items: [],
        balances: []
    },
    groups: [],
    tags: [],
    report: {
        url: ""
    },
    apiCallsInProgress: 0
};

export default initialState;
