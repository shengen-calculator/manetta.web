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
    HistoryState
} from "../../redux/reducers/types";
import {
    GetRecentlyPostedAction,
    getRecentlyPostedRequest
} from "../../redux/actions/operationActions";
import {connect} from "react-redux";
import {useEffect} from "react";
import ReportDialog from "./ReportDialog";
import {Dayjs} from "dayjs";


interface HistoryPageProps {
    getRecentlyPostedRequest: (params: GetRecentlyPostedParams) => GetRecentlyPostedAction,
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
        history
    }
) => {

    const switchDay = 12;
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
        if (reportDialogStatus.endDate - reportDialogStatus.startDate > 92 * 24 * 60 * 60 * 1000) {
            alert(reportDialogStatus.endDate - reportDialogStatus.startDate);
        } else {
            alert(reportDialogStatus.startDate + " => " + reportDialogStatus.endDate);
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
        history: state.history
    }
};

// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
    getRecentlyPostedRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryPage)
