import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {currencies} from "../../util/currencies";

interface TableCurrencyInputProps {
    id: string,
    label: string,
    width: number,
    value: number,
    currency: string,
    error: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TableCurrencyInput: React.FC<TableCurrencyInputProps> = (
    {
        id,
        label,
        width,
        value,
        currency,
        error,
        onChange
    }
) => {
    const currencyLabel = currencies.find(cl => cl.value === currency);
    return (
        <FormControl fullWidth sx={{m: 1}} variant="standard">
            <InputLabel
                htmlFor={id} error={error}>{label}</InputLabel>
            <Input
                sx={{width: {width}}}
                id={id}
                startAdornment=
                    {
                        <InputAdornment position="start">{currencyLabel ? currencyLabel.label : ""}</InputAdornment>
                    }
                value={value}
                name={id}
                error={error}
                onChange={onChange}
            />
        </FormControl>
    )
};

export default TableCurrencyInput;
