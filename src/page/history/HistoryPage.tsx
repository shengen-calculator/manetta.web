import {CssBaseline, Link, ThemeProvider} from "@mui/material";
import * as React from "react";
import theme from "../../theme";
import Container from '@mui/material/Container';
import ButtonPanel from "../../component/ButtonPanel";
import menuItems from "../../component/menuItems";
import HistoryTable from "./HistoryTable";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import {
    AccountState,
    ApplicationState,
    HistoryState,
    ReportState, TagState
} from "../../redux/reducers/types";
import {
    GetRecentlyPostedAction,
    getRecentlyPostedRequest,
    RevertOperationAction,
    revertOperationRequest
} from "../../redux/actions/operationActions";
import {connect} from "react-redux";
import {useEffect} from "react";
import ReportDialog from "./ReportDialog";
import {Dayjs} from "dayjs";
import {
    GenerateReportAction,
    ReportPeriodExceededAction,
    generateReportRequest,
    reportPeriodExceeded
} from "../../redux/actions/reportActions";
import RevertDialog from "./RevertDialog";
import {
    GetAccountsAction,
    getAccountsRequest
} from "../../redux/actions/accountActions";
import {
    GetTagsAction,
    getTagsRequest
} from "../../redux/actions/tagActions";
import {getHandlers, keyMap} from "../../component/KeyMapHandlers";
import {HotKeys} from "react-hotkeys";
import {useNavigate} from "react-router-dom";


interface HistoryPageProps {
    getRecentlyPostedRequest: (params: GetRecentlyPostedParams) => GetRecentlyPostedAction,
    revertOperationRequest: (params: RevertOperationParams) => RevertOperationAction,
    generateReportRequest: (params: GenerateExpensesReportParams) => GenerateReportAction,
    reportPeriodExceeded: (params: ReportPeriodExceededParams) => ReportPeriodExceededAction,
    getAccountsRequest: () => GetAccountsAction,
    getTagsRequest: () => GetTagsAction,
    report: ReportState,
    history: HistoryState,
    tag: TagState,
    account: AccountState
}

type ReportDialogStatus = {
    isOpen: boolean,
    startDate: number,
    endDate: number,
    tags: string[]
}

type RevertDialogStatus = {
    isOpen: boolean,
    row: PostedOperation
}

const HistoryPage: React.FC<HistoryPageProps> = (
    {
        getRecentlyPostedRequest,
        generateReportRequest,
        revertOperationRequest,
        getAccountsRequest,
        getTagsRequest,
        reportPeriodExceeded,
        history,
        report,
        tag,
        account
    }
) => {

    const switchDay = 12;
    const reportPeriodLimitDays = 365;
    const panelButtons: PanelButton[] = [{
        btnText: "REPORT",
        tooltip: "Hot key: Alt (option) + P",
        disabled: false,
        onClick: () => {
            openReportDialog();
        }
    }];

    let isDataRequested = false;

    useEffect(() => {
        if (!isDataRequested) {
            isDataRequested = true;
            getRecentlyPostedRequest({
                startCursor: ""
            });
            getAccountsRequest();
            getTagsRequest();
        }
    }, []);

    useEffect(() => {
        if (!history.isReverting && !isDataRequested) {
            getRecentlyPostedRequest({
                startCursor: ""
            })
        }
    }, [history.isReverting]);

    useEffect(() => {
        if(report.url) {
            window.location.href = report.url;
        }
    }, [report.url]);

    const navigate = useNavigate();

    const [reportDialogStatus, setReportDialogStatus] = React.useState<ReportDialogStatus>({
        isOpen: false,
        startDate: 0,
        endDate: 0,
        tags: []
    });

    const [revertDialogStatus, setRevertDialogStatus] = React.useState<RevertDialogStatus>({
        isOpen: false,
        row: {
            id: 0,
            date: "",
            account: "",
            docNumber: 0,
            equivalent: 0,
            balance: 0,
            description: "",
            sum: 0,
            tags: [],
            isReverted: false,
            isRevertOperation: false
        }
    });

    const showMore = (): void => {
        getRecentlyPostedRequest({
            startCursor: history.cursor
        })
    };

    const getDefaultDate = (): [number, number] => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getDate() < switchDay ? date.getMonth() - 1 : date.getMonth();
        const firstDay = new Date(year, month, 1, 16);
        const lastDay = date.getDate() < switchDay ?
            new Date(year, month + 1, 0, 16) : date;
        return [firstDay.getTime(), lastDay.getTime()];
    };

    const openReportDialog = () => {
        setReportDialogStatus({
            ...reportDialogStatus,
            isOpen: true,
            startDate: getDefaultDate()[0],
            endDate: getDefaultDate()[1]
        });
    };

    const openRevertDialog = (row: PostedOperation) => {
        if (row.isReverted || row.isRevertOperation) {
            return;
        }
        setRevertDialogStatus({
            ...revertDialogStatus,
            isOpen: true,
            row
        });
    };

    const handleReportDialogCancel = () => {
        setReportDialogStatus({
            ...reportDialogStatus,
            isOpen: false
        });
    };

    const handleRevertDialogCancel = () => {
        setRevertDialogStatus({
            ...revertDialogStatus,
            isOpen: false
        });
    };

    const handleDateChange = (value: Dayjs | null, name: string): void => {
        setReportDialogStatus(prev => ({
            ...prev,
            [name]: (value && value.isValid()) ? value.valueOf() : null
        }));
    };

    const handleTagsChange = (tags: string[]): void => {
        setReportDialogStatus(prev => ({
            ...prev,
            tags
        }))
    };

    const revertOperation = (row: PostedOperation) => {
        revertOperationRequest({
            docNumber: row.docNumber
        });
        setRevertDialogStatus({
            ...revertDialogStatus,
            isOpen: false
        });
    };

    const generateReport = () => {
        if (reportDialogStatus.endDate - reportDialogStatus.startDate > reportPeriodLimitDays * 24 * 60 * 60 * 1000) {
            reportPeriodExceeded({
                daysLimit: reportPeriodLimitDays
            })
        } else {
            generateReportRequest({
                startDate: new Date(reportDialogStatus.startDate).toISOString().slice(0, 10),
                endDate: new Date(reportDialogStatus.endDate).toISOString().slice(0, 10),
                tags: reportDialogStatus.tags
            });
            setReportDialogStatus({
                ...reportDialogStatus,
                isOpen: false
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <ReportDialog
                    isOpen={reportDialogStatus.isOpen}
                    startDate={reportDialogStatus.startDate}
                    endDate={reportDialogStatus.endDate}
                    onCancel={handleReportDialogCancel}
                    onChange={handleDateChange}
                    onTagsChange={handleTagsChange}
                    onReport={generateReport}
                    allTags={tag.items}
                />
                <RevertDialog
                    isOpen={revertDialogStatus.isOpen}
                    onCancel={handleRevertDialogCancel}
                    onSubmit={revertOperation}
                    row={revertDialogStatus.row}
                />
                <HotKeys handlers={getHandlers(navigate, null)} keyMap={keyMap}>
                    <Header title="MANETTA" menuItems={menuItems}/>
                    <main>
                        <ButtonPanel buttons={panelButtons}/>
                        <HistoryTable rows={history.entries} accounts={account.items} handleOpenRevertDialog={openRevertDialog}/>
                        <Link
                            component="button"
                            variant="body2"
                            sx={{ml: 2, mt: 4}}
                            onClick={showMore}
                        >
                            Show more rows...
                        </Link>
                    </main>
                </HotKeys>
            </Container>
            <Footer
                description="Accounting it's easy!"
            />
        </ThemeProvider>
    );
};

const mapStateToProps = (state: ApplicationState) => {
    return {
        history: state.history,
        report: state.report,
        account: state.account,
        tag: state.tag
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getRecentlyPostedRequest,
    getAccountsRequest,
    getTagsRequest,
    generateReportRequest,
    revertOperationRequest,
    reportPeriodExceeded
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPage)
