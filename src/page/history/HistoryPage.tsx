import { CssBaseline, Link, ThemeProvider } from "@mui/material";
import * as React from "react";
import theme from "../../theme";
import Container from '@mui/material/Container';
import ButtonPanel from "../../component/ButtonPanel";
import menuItems from "../../component/menuItems";
import HistoryTable from "./HistoryTable";
import Header from "../../component/Header";
import Footer from "../../component/Footer";


export default function HistoryPage() {
    const panelButtons: PanelButton[] = [{
        btnText: "REPORT",
        disabled: false,
        onClick: () => {}
    }];
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <ButtonPanel buttons={panelButtons} />
                    <HistoryTable/>
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
}
