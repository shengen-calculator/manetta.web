import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutoCompleteInputProps {
    id: string,
    label: string,
    options: string[],
    width: number,
    value: string | null,
    inputValue: string,
    error: boolean,
    onChange: (event: React.SyntheticEvent, newValue: string | null, inputId: string) => void,
    onInputChange: (event: React.SyntheticEvent, newValue: string | null, inputId: string) => void
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = (
    {
        id,
        label,
        options,
        width,
        value,
        inputValue,
        error,
        onChange,
        onInputChange
    }
) => {
    return (
        <Autocomplete
            autoHighlight
            id={id}
            value={value}
            inputValue={inputValue}
            options={options}
            sx={{width: {width}}}
            onChange={onChange}
            onInputChange={onInputChange}
            renderInput={
                (params) =>
                    <TextField
                        {...params}
                        label={label}
                        error={error}
                        variant="standard"
                    />
            }
        />
    )
};

export default AutoCompleteInput;
