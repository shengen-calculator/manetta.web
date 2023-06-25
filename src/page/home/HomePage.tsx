import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Header from '../../component/Header';
import MainPanel from './MainPanel';
import AccountSummary from './AccountSummary';
import Footer from '../../component/Footer';
import theme from "../../theme";
import OperationTemplate from "./OperationTemplate";
import menuItems from "../../component/menuItems";

const mainFeaturedPost = {
    title: 'Manetta Accounting',
    description:
        "The newest accounting system based on tags",
    image: 'https://source.unsplash.com/featured',
    imageText: 'Manetta Accounting',
};

const accountsInfo: AccountInfo[] = [
    {
        title: 'Privat EUR',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        accountName: "PRIVAT-EUR",
        imagePath: "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/privat.png?alt=media&token=2dc3db88-6bc1-4538-9475-3cbcd41d183f"
    },
    {
        title: 'Mono EUR',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        accountName: "PAYO",
        imagePath: "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/mono.jpg?alt=media&token=a379c39d-68fa-4c81-ad88-94b8a8db3c4f",
    },
    {
        title: 'OTP Black',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        accountName: "OTP-BLACK-UAH",
        imagePath: "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/otp.png?alt=media&token=e0966191-3e21-459e-bc4f-27b943ffc318",
    },
];

const templates: OperationTemplate[] = [
    {
        title: 'EUR => UAH',
        description:
            'Currency exchange operation template.',
    },
    {
        title: 'Communal payments',
        description:
            'Monthly payment for the electricity, gas...',
    },
];

export default function HomePage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="MANETTA" menuItems={menuItems} />
                <main>
                    <MainPanel post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {accountsInfo.map((acc) => (
                            <AccountSummary key={acc.accountName} account={acc} />
                        ))}
                    </Grid>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                    </Grid>
                    <Divider />
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                    </Grid>
                    <Grid container spacing={4}>
                        {templates.map((post) => (
                            <OperationTemplate key={post.title} post={post} />
                        ))}
                    </Grid>
                </main>
            </Container>
            <Footer
                description="Accounting it's easy!"
            />
        </ThemeProvider>
    );
}
