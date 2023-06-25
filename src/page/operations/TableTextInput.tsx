import * as React from "react";
import TextField from "@mui/material/TextField";

interface TableTextInputProps {
    id: string,
    label: string,
    width: number,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TableTextInput: React.FC<TableTextInputProps> = (
    {
        id,
        label,
        width,
        value,
        onChange
    }
) => {
    return (
        <TextField
            id={id}
            sx={{width: {width}}}
            value={value}
            label={label}
            variant="standard"
            name={id}
            onChange={onChange}
        />
    )
};

export default TableTextInput;

