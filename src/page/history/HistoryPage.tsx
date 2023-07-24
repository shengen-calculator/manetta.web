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


interface HistoryPageProps {
    getRecentlyPostedRequest: (params: GetRecentlyPostedParams) => GetRecentlyPostedAction,
    history: HistoryState
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
        onClick: () => {}
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <ButtonPanel buttons={panelButtons} />
                    <HistoryTable rows={history.entries}/>
                    <Link
                        component="button"
                        variant="body2"
                        sx={{ml: 2, mt: 4}}
                        onClick={() => {
                            console.info("Add 10 rows.");
                        }}
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
