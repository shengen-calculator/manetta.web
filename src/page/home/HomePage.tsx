import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Header from "../../component/Header";
import MainPanel from "./MainPanel";
import AccountSummary from "./AccountSummary";
import Footer from "../../component/Footer";
import theme from "../../theme";
import OperationTemplate from "./OperationTemplate";
import menuItems from "../../component/menuItems";
import { getHandlers, keyMap } from "../../component/KeyMapHandlers";
import { HotKeys } from "react-hotkeys";
import { useNavigate } from "react-router-dom";
import FromTemplateDialog from "./FromTemplateDialog";
import {
  createFromTemplateRequest,
  CreateFromTemplateAction,
} from "../../redux/actions/operationActions";
import { connect } from "react-redux";

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

const templates: OperationTemplate[] = [
  {
    title: "EUR => UAH",
    description: "Currency exchange operation template.",
    tags: ["exchange"],
  },
  {
    title: "Apartment electricity",
    description: "Monthly payment for the electricity",
    tags: ["expenses", "apartment", "electricity"],
  },
  {
    title: "Apartment gas",
    description: "Monthly payment for the gas",
    tags: ["expenses", "apartment", "naftogaz"],
  },
  {
    title: "House gas",
    description: "Monthly payment for the gas",
    tags: ["expenses", "house", "naftogaz"],
  },
];

type FromTemplateDialogStatus = {
  isOpen: boolean;
  tags: string[];
  title: string;
};

interface HomePageProps {
  createFromTemplateRequest: (
    params: CreateFromTemplateParams,
  ) => CreateFromTemplateAction;
}

const HomePage: React.FC<HomePageProps> = ({ createFromTemplateRequest }) => {
  const navigate = useNavigate();

  const [fromTemplateDialogStatus, setFromTemplateDialogStatus] =
    React.useState<FromTemplateDialogStatus>({
      isOpen: false,
      tags: [],
      title: "",
    });

  const openFromTemplateDialog = (title: string, tags: string[]): void => {
    setFromTemplateDialogStatus({
      ...fromTemplateDialogStatus,
      isOpen: true,
      tags,
      title,
    });
  };

  const handleFromTemplateDialogCancel = () => {
    setFromTemplateDialogStatus({
      ...fromTemplateDialogStatus,
      isOpen: false,
    });
  };

  const createOperations = (tags: string[]) => {
    createFromTemplateRequest({
      tags,
    });
    setFromTemplateDialogStatus({
      ...fromTemplateDialogStatus,
      isOpen: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <FromTemplateDialog
          isOpen={fromTemplateDialogStatus.isOpen}
          onCancel={handleFromTemplateDialogCancel}
          title={fromTemplateDialogStatus.title}
          tags={fromTemplateDialogStatus.tags}
          onCreate={createOperations}
        />
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
            <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
            <Divider />
            <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
            <Grid container spacing={4}>
              {templates.map((template) => (
                <OperationTemplate
                  key={template.title}
                  template={template}
                  open={openFromTemplateDialog}
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
// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = {
  createFromTemplateRequest,
};

export default connect(null, mapDispatchToProps)(HomePage);
