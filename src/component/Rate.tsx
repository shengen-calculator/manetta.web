import * as React from "react";
import Button from "@mui/material/Button";
import {currencies} from "../util/currencies";
import RateDialog from "./RateDialog";
import {CreateRateAction} from "../redux/actions/rateActions";

interface RateProps {
    rates: CurrencyRate[],
    abbreviations: string[],
    createRate: (params: CreateRateParams) => CreateRateAction
}

type RateDialogStatus = {
    isOpen: boolean,
    isError: boolean,
    abbr: string,
    currency: string,
    rate: string
}

const Rate: React.FC<RateProps> = (
    {
        rates,
        abbreviations,
        createRate,
    }
) => {

    const [rateDialogStatus, setRateDialogStatus] = React.useState<RateDialogStatus>({
        isOpen: false,
        isError: false,
        abbr: "",
        currency: "",
        rate: ""
    });

    const openRateDialog = (abbr: string, currency: string, rate: string) => {
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: true,
            isError: false,
            abbr,
            currency,
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
        createRate({
            rate: Math.round(Number(rateDialogStatus.rate) * 100),
            currency: rateDialogStatus.currency
        });
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: false
        });
    }

    return (
        <React.Fragment>
            {
                abbreviations.map(curAbbr => {
                    const label = curAbbr === "UAH" ? "EUR" : curAbbr;
                    const symbol = currencies.find(c => c.value === label);
                    const item = rates.find(r => r.currency === curAbbr);
                    const rate = item ? item.rate / 100 : "--.--";
                    return (
                        <Button key={curAbbr} onClick={() =>
                            openRateDialog(label, curAbbr, rate.toString())} size="small">
                            {`${symbol ? symbol.label : label} ${rate}`}
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
