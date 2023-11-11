import { CssBaseline, Link, ThemeProvider } from "@mui/material";
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


interface HistoryPageProps {
    getRecentlyPostedRequest: (params: GetRecentlyPostedParams) => GetRecentlyPostedAction,
    history: HistoryState
}

type ReportDialogStatus = {
    isOpen: boolean,
    startDate: string,
    endDate: string
}

const HistoryPage: React.FC<HistoryPageProps> = (
    {
        getRecentlyPostedRequest,
        history
    }
) => {

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
        startDate: "",
        endDate: ""
    });

    const showMore = (): void => {
        getRecentlyPostedRequest({
            startCursor: history.cursor
        })
    };

    const openReportDialog = () => {
        setReportDialogStatus({
            ...reportDialogStatus,
            isOpen: true
        });
    };

    const handleReportDialogCancel = () => {
        setReportDialogStatus({
            ...reportDialogStatus,
            isOpen: false
        });
    };

    const generateReport = () => {
        alert("hello");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <ReportDialog
                    isOpen={reportDialogStatus.isOpen}
                    startDate={reportDialogStatus.startDate}
                    endDate={reportDialogStatus.endDate}
                    onCancel={handleReportDialogCancel}
                    onReport={generateReport}
                />
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <ButtonPanel buttons={panelButtons} />
                    <HistoryTable rows={history.entries} />
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
