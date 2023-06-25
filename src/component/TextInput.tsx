import * as React from 'react';
import {TextField} from "@mui/material";

interface TextInputProps {
    label: string;
    id: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password";
    autoFocus?: boolean;
    autoComplete?: string;
    value?: string;
}
const TextInput: React.FC<TextInputProps> = (
    {
        id,
        label,
        type = 'text',
        autoFocus = false,
        autoComplete = id,
        value = '',
        onChange
    }
) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={id}
            label={label}
            name={id}
            onChange={onChange}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            type={type}
            value={value}
        />
    )
};

export default TextInput;
