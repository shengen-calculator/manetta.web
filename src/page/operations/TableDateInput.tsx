import * as React from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateField} from "@mui/x-date-pickers/DateField";
import dayjs, {Dayjs} from "dayjs";

interface TableDateInputProps {
    id: string,
    label: string,
    width: number,
    value: number,
    minDate: string,
    maxDate: string,
    onChange: (value: Dayjs | null) => void
}

const TableDateInput: React.FC<TableDateInputProps> = (
    {
        id,
        label,
        minDate,
        maxDate,
        width,
        value,
        onChange
    }
) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                id={id}
                label={label}
                name={id}
                minDate={dayjs(minDate)}
                maxDate={dayjs(maxDate)}
                value={dayjs(value)}
                sx={{width: {width}}} format="DD-MM-YYYY" variant="standard"
                onChange={onChange}
            />
        </LocalizationProvider>
    )
};

export default TableDateInput;

