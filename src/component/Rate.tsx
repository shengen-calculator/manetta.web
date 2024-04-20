import * as React from "react";
import Button from "@mui/material/Button";
import {currencies} from "../util/currencies";
import RateDialog from "./RateDialog";

interface RateProps {
    rates: Rates,
    abbreviations: string[]
}

type RateDialogStatus = {
    isOpen: boolean,
    isError: boolean,
    abbr: string,
    rate: string
}

const Rate: React.FC<RateProps> = (
    {
        rates,
        abbreviations
    }
) => {

    const [rateDialogStatus, setRateDialogStatus] = React.useState<RateDialogStatus>({
        isOpen: false,
        isError: false,
        abbr: "",
        rate: ""
    });

    const openRateDialog = (abbr: string, rate: string) => {
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: true,
            isError: false,
            abbr,
            rate
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setRateDialogStatus({
            ...rateDialogStatus,
            rate: value
        });
    };

    const handleRateDialogCancel = () => {
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: false
        });
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isNaN(Number(rateDialogStatus.rate)) || Number(rateDialogStatus.rate) === 0) {
            setRateDialogStatus({
                ...rateDialogStatus,
                isError: true
            });
            return;
        }
        console.log(`Abbr -> ${rateDialogStatus.abbr}`);
        console.log(`Rate -> ${rateDialogStatus.rate}`);
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: false
        });
    }

    return (
        <React.Fragment>
            {
                abbreviations.map(abbr => {
                    const labelAbbr = abbr === "UAH" ? "EUR" : abbr;
                    const currency = currencies.find(c => c.value === labelAbbr);
                    const rate = rates[abbr] ? rates[abbr].rate / 100 : 0.00;
                    return (
                        <Button onClick={() =>
                            openRateDialog(labelAbbr, rate.toString())} size="small">
                            {`${currency ? currency.label : labelAbbr} ${rate}`}
                        </Button>
                    )
                })
            }
            <RateDialog
                isOpen={rateDialogStatus.isOpen}
                onCancel={handleRateDialogCancel}
                onChange={handleChange}
                isError={rateDialogStatus.isError}
                abbr={rateDialogStatus.abbr}
                rate={rateDialogStatus.rate}
                onSave={(event: React.FormEvent<HTMLFormElement>) => {
                    handleSave(event);
                }}
            />
        </React.Fragment>
    )
}

export default Rate;