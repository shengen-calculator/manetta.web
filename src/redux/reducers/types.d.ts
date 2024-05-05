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

type AccountState = {
    status: ItemStatus,
    items: Array<Account>
}

type HistoryState = {
    isReverting: boolean
    entries: Array<PostedOperation>
    cursor: string
}

interface RateState {
    status: ItemStatus,
    items: CurrencyRate[]
}

interface GroupState {
    status: ItemStatus,
    items: Array<Group>
}

type ReportState = {
    url: string
}

type ApplicationState = {
    authentication: AuthenticationState,
    operations: OperationState,
    account: AccountState,
    group: GroupState,
    rate: RateState,
    tags: Array<Array<string>>,
    history: HistoryState,
    message: MessageState,
    report: ReportState,
    apiCallsInProgress: number
}

