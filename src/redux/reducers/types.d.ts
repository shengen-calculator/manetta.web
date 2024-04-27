import {VariantType} from "notistack";

type AuthenticationRole = "ADMIN" | "BOOKER" | "NOT_AUTHORIZED";

type AuthenticationState = {
    role: AuthenticationRole,
    logging: boolean,
    registering: boolean,
    error: string
}

type MessageState = {
    type: VariantType
    text: string
}

type OperationState = {
    items: Array<Operation>
    isLoaded: boolean
}

type AccountBalance = {
    accountName: string
    balance: number
}

type AccountState = {
    items: Array<Account>
    balances: AccountBalance[]
}

type HistoryState = {
    isReverting: boolean
    entries: Array<PostedOperation>
    cursor: string
}

type ReportState = {
    url: string
}

type ApplicationState = {
    authentication: AuthenticationState,
    operations: OperationState,
    accounts: AccountState,
    groups: Array<Group>,
    rates: Rates,
    tags: Array<Array<string>>,
    history: HistoryState,
    message: MessageState,
    report: ReportState,
    apiCallsInProgress: number
}

