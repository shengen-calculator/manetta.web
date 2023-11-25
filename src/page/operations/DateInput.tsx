import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateField} from "@mui/x-date-pickers/DateField";
import dayjs, {Dayjs} from "dayjs";

interface TableDateInputProps {
    id: string,
    label: string,
    value: number,
    onChange: (value: Dayjs | null) => void
}

const DateInput: React.FC<TableDateInputProps> = (
    {
        id,
        label,
        value,
        onChange
    }
) => {
    const maxDate = '2030-12-31';
    const minDate = '2020-01-01';
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                id={id}
                label={label}
                name={id}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
                value={dayjs(value)}
                format="DD-MM-YYYY"
                onChange={onChange}
            />
        </LocalizationProvider>
    )
};

export default DateInput;

