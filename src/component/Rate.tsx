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
    abbr: string,
    rate: number
}

const Rate: React.FC<RateProps> = (
    {
        rates,
        abbreviations
    }
) => {

    const [rateDialogStatus, setRateDialogStatus] = React.useState<RateDialogStatus>({
        isOpen: false,
        abbr: "",
        rate: 0
    });

    const openRateDialog = () => {
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: true
        });
    };

    const handleRateDialogCancel = () => {
        setRateDialogStatus({
            ...rateDialogStatus,
            isOpen: false
        });
    };

    return (
        <React.Fragment>
            {
                abbreviations.map(abbr => {
                    const labelAbbr = abbr === "UAH" ? "EUR" : abbr;
                    const currency = currencies.find(c => c.value === labelAbbr);
                    return (
                        <Button onClick={openRateDialog} size="small">
                            {`${currency ?
                                currency.label : labelAbbr} ${
                                rates[abbr] ?
                                    rates[abbr].rate / 100 : 0.00}`}
                        </Button>
                    )
                })
            }
            <RateDialog
                isOpen={rateDialogStatus.isOpen}
                onCancel={handleRateDialogCancel}
                save={()=>{}}
            />
        </React.Fragment>
    )
}

export default Rate;