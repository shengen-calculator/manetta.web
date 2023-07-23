type RouteError = {
    statusText: string,
    message: string,
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

interface DeleteOperationParams {
    id: string
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

interface UpdateOperationParams extends OperationBase{
    id: number
    date: string
}

interface CreateOperationParams extends OperationBase{
    id: undefined,
    date: string
}

interface Operation extends OperationBase{
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

interface Account  {
    name: string,
    isActive: boolean,
    currency: string
}

interface PanelButton {
    btnText: string,
    disabled: boolean,
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
    date: number,
    account: string,
    docNumber: number,
    equivalent: number,
    balance: number,
    description: string,
    sum: number,
    tags: string[]
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


