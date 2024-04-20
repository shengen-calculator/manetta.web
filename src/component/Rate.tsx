import * as React from "react";
import Button from "@mui/material/Button";
import {currencies} from "../util/currencies";
import {Dialog} from "@mui/material";

interface RateProps {
    rates: Rates,
    abbreviations: string[]
}

const Rate: React.FC<RateProps> = (
    {
        rates,
        abbreviations
    }
) => {

    return (
        <React.Fragment>
            {
                abbreviations.map(abbr => {
                    const labelAbbr = abbr === "UAH" ? "EUR" : abbr;
                    const currency = currencies.find(c => c.value === labelAbbr);
                    return (
                        <Button size="small">
                            {`${currency ?
                                currency.label : labelAbbr} ${
                                rates[abbr] ?
                                    rates[abbr].rate / 100 : 0.00}`}
                        </Button>
                    )
                })
            }

        </React.Fragment>
    )
}

export default Rate;