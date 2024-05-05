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
        isReverting: false,
        entries: [],
        cursor: ""
    },
    account: {
        status: "NOT_DEFINED",
        items: []
    },
    group: {
        status: "NOT_DEFINED",
        items: []
    },
    tags: [],
    rate: {
        status: "NOT_DEFINED",
        items: []
    },
    report: {
        url: ""
    },
    apiCallsInProgress: 0
};

export default initialState;
