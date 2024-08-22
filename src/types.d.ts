type RouteError = {
    statusText: string,
    message: string,
}

type FilterParams = {
    startDate: number,
    endDate: number,
    tags: string []
}

interface AuthenticationParams {
    email: string
    password: string
}

interface RegistrationParams {
    email: string
    password: string
}

interface TokenResult {
    claims: {
        role: string
    }
}

interface PostOperationsParams {
    postAsSingle: boolean,
    ids: string[]
}

interface GetRecentlyPostedParams {
    startCursor: string
}

interface GetReportRecordsParams {
    startCursor: string,
    filter: FilterParams
}

interface DeleteOperationParams {
    id: number
}

interface GenerateExpensesReportParams {
    startDate: string,
    endDate: string,
    tags: string[]
}

interface ReportPeriodExceededParams {
    daysLimit: number
}

interface GetAccountBalanceParams {
    accountName: string
}

interface OperationBase {
    id: number | undefined,
    date: number | string,
    account: string,
    group: string,
    created: number,
    description: string,
    sum: number,
    tags: string[]
}

interface UpdateOperationParams extends OperationBase {
    id: number
    date: string
}

interface RevertOperationParams {
    docNumber: number
}

interface CreateOperationParams extends OperationBase {
    id: undefined,
    date: string
}

interface Operation extends OperationBase {
    id: number,
    date: number
}

interface Group {
    name: string,
    tags: Array<string>
}

interface CreateGroupParams extends Group {
}

interface UpdateGroupParams extends Group {
}

interface DeleteGroupParams {
    name: string
}

interface CreateRateParams {
    rate: number,
    currency: string
}

interface Account  {
    name: string,
    isActive: boolean,
    currency: string,
    balance: number
}

type ItemStatus = "DEFINED" | "NOT_DEFINED" | "REQUESTED"
type InitStatus = "NOT_STARTED" | "STARTED" | "FINISHED"

interface Rate {
    rate: number,
    date: number
}

interface CurrencyRate extends Rate {
    currency: string
}

interface PanelButton {
    btnText: string,
    tooltip: string,
    disabled: boolean,
    isMarked: boolean,
    onClick: () => void
}

interface AccountInfo {
    title: string,
    description: string,
    imagePath: string,
    accountName: string
}

interface PostedOperation {
    id: number,
    date: string,
    created: number,
    account: string,
    docNumber: number,
    equivalent: number,
    balance: number,
    description: string,
    sum: number,
    tags: string[],
    isReverted: boolean,
    isRevertOperation: boolean
}

interface PostedOperationResult {
    id: string,
    date: number,
    created: number,
    account: string,
    docNumber: number,
    euro: number,
    balance: number,
    description: string,
    sum: number,
    tags: string[],
    isReverted: boolean,
    isRevertOperation: boolean
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof PostedOperation;
    label: string;
    numeric: boolean;
}

interface OperationTemplate {
    title: string,
    description: string,
}


