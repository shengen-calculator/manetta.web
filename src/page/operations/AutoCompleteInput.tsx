import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutoCompleteInputProps {
    id: string,
    label: string,
    options: string[],
    placeholder?: string,
    multiple?: boolean,
    width?: number,
    margin?: "dense" | "none" | "normal" | undefined,
    value: string | string[] | null,
    inputValue: string,
    freeSolo?: boolean,
    variant?: "standard" | "outlined" | "filled"
    error: boolean,
    onChange: (event: React.SyntheticEvent, newValue: any, inputId: string) => void,
    onInputChange: (event: React.SyntheticEvent, newValue: string | null, inputId: string) => void
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = (
    {
        id,
        label,
        options,
        placeholder,
        width,
        margin,
        multiple,
        value,
        inputValue,
        freeSolo,
        variant,
        error,
        onChange,
        onInputChange
    }
) => {
    const sx = width ? {"width": width} : {};
    return (
        <Autocomplete
            autoHighlight
            id={id}
            value={value}
            inputValue={inputValue}
            freeSolo={!!freeSolo}
            multiple={!!multiple}
            options={options}
            sx={sx}
            onChange={onChange}
            onInputChange={onInputChange}
            renderInput={
                (params) =>
                    <TextField
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        error={error}
                        margin={!!margin ? margin : undefined}
                        variant={variant || "standard"}
                    />
            }
        />
    )
};

export default AutoCompleteInput;
