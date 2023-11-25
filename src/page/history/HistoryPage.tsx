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
    ApplicationState,
    HistoryState, ReportState
} from "../../redux/reducers/types";
import {
    GetRecentlyPostedAction,
    getRecentlyPostedRequest
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


interface HistoryPageProps {
    getRecentlyPostedRequest: (params: GetRecentlyPostedParams) => GetRecentlyPostedAction,
    generateReportRequest: (params: GenerateExpensesReportParams) => GenerateReportAction,
    reportPeriodExceeded: (params: ReportPeriodExceededParams) => ReportPeriodExceededAction,
    report: ReportState,
    history: HistoryState
}

type ReportDialogStatus = {
    isOpen: boolean,
    startDate: number,
    endDate: number
}

const HistoryPage: React.FC<HistoryPageProps> = (
    {
        getRecentlyPostedRequest,
        generateReportRequest,
        reportPeriodExceeded,
        history,
        report
    }
) => {

    const switchDay = 12;
    const reportPeriodLimitDays = 180;
    const panelButtons: PanelButton[] = [{
        btnText: "REPORT",
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
            })
        }
    }, []);

    useEffect(() => {
        if(report.url) {
            window.location.href = report.url;
        }
    }, [report.url]);


    const [reportDialogStatus, setReportDialogStatus] = React.useState<ReportDialogStatus>({
        isOpen: false,
        startDate: 0,
        endDate: 0
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
        const firstDay = new Date(year, month, 1);
        const lastDay = date.getDate() < switchDay ?
            new Date(year, month + 1, 0) : date;
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

    const handleReportDialogCancel = () => {
        setReportDialogStatus({
            ...reportDialogStatus,
            isOpen: false
        });
    };

    const handleDateChange = (value: Dayjs | null, name: string): void => {
        setReportDialogStatus(prev => ({
            ...prev,
            [name]: (value && value.isValid()) ? value.valueOf() : null
        }));
    };

    const generateReport = () => {
        if (reportDialogStatus.endDate - reportDialogStatus.startDate > reportPeriodLimitDays * 24 * 60 * 60 * 1000) {
            reportPeriodExceeded({
                daysLimit: reportPeriodLimitDays
            })
        } else {
            generateReportRequest({
                startDate: new Date(reportDialogStatus.startDate).toISOString().slice(0, 10),
                endDate: new Date(reportDialogStatus.endDate).toISOString().slice(0, 10)
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
                    onReport={generateReport}
                />
                <Header title="MANETTA" menuItems={menuItems}/>
                <main>
                    <ButtonPanel buttons={panelButtons}/>
                    <HistoryTable rows={history.entries}/>
                    <Link
                        component="button"
                        variant="body2"
                        sx={{ml: 2, mt: 4}}
                        onClick={showMore}
                    >
                        Show more rows...
                    </Link>
                </main>
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
        report: state.report
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getRecentlyPostedRequest,
    generateReportRequest,
    reportPeriodExceeded
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPage)
