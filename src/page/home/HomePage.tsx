import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../../component/Header";
import MainPanel from "./MainPanel";
import AccountSummary from "./AccountSummary";
import Footer from "../../component/Footer";
import theme from "../../theme";
import menuItems from "../../component/menuItems";
import { getHandlers, keyMap } from "../../component/KeyMapHandlers";
import { HotKeys } from "react-hotkeys";
import { useNavigate } from "react-router-dom";

const mainFeaturedPost = {
    title: 'Manetta Accounting',
    description:
        "The newest accounting system based on tags",
    image: 'https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/bg%2Fthivagaran-lRtQOlk1uMo-unsplash.jpg?alt=media&token=e989869f-d85d-44d0-909f-7a971bc294ac',
    imageText: 'Manetta Accounting',
};

const accountsInfo: AccountInfo[] = [
  {
    title: "Privat EUR",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    accountName: "PRIVAT-EUR",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/privat.png?alt=media&token=2dc3db88-6bc1-4538-9475-3cbcd41d183f",
  },
  {
    title: "Mono EUR",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    accountName: "PAYO",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/mono.jpg?alt=media&token=a379c39d-68fa-4c81-ad88-94b8a8db3c4f",
  },
  {
    title: "OTP Black",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    accountName: "OTP-BLACK-UAH",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/manetta-2023.appspot.com/o/otp.png?alt=media&token=e0966191-3e21-459e-bc4f-27b943ffc318",
  },
];


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <HotKeys handlers={getHandlers(navigate, null)} keyMap={keyMap}>
          <Header title="MANETTA" menuItems={menuItems} />
          <main>
            <MainPanel post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {accountsInfo.map((accountInfo) => (
                <AccountSummary
                  key={accountInfo.accountName}
                  accountInfo={accountInfo}
                />
              ))}
            </Grid>
          </main>
        </HotKeys>
      </Container>
      <Footer description="Accounting it's easy!" />
    </ThemeProvider>
  );
};

export default HomePage;
