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
    status: ItemStatus,
}

type AccountState = {
    status: ItemStatus,
    items: Array<Account>
}

type HistoryState = {
    status: ItemStatus,
    items: Array<PostedOperation>
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

type TagState = {
    status: ItemStatus,
    items: Array<Array<string>>
}

type ApplicationState = {
    authentication: AuthenticationState,
    operation: OperationState,
    account: AccountState,
    group: GroupState,
    rate: RateState,
    tag: TagState,
    history: HistoryState,
    message: MessageState,
    report: ReportState,
    apiCallsInProgress: number
}

