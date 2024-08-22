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
    operation: {
        status: "NOT_DEFINED",
        items: []
    },
    history: {
        status: "NOT_DEFINED",
        items: [],
        isRecentlyPosted: true,
        filter: {
            startDate: 0,
            endDate: 0,
            tags: []
        },
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
    tag: {
        status: "NOT_DEFINED",
        items: []
    },
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
