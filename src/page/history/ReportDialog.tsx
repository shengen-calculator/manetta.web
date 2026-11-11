import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {Dayjs} from "dayjs";
import DateInput from "../operations/DateInput";
import OperationTagsSelector from "../operations/OperationTagsSelector";

interface ReportDialogProps {
    isOpen: boolean
    allTags: string [][]
    startDate: number
    endDate: number
    tags: string []
    onCancel: () => void
    onTagsChange: (tags: string[]) => void
    onChange: (value: Dayjs | null, name: string) => void
    onReport: (startDate: number, endDate: number) => void
    onFilter: (startDate: number, endDate: number) => void
    onReset: () => void
}

const ReportDialog: React.FC<ReportDialogProps> = (
    {
        isOpen,
        allTags,
        startDate,
        endDate,
        tags,
        onTagsChange,
        onCancel,
        onChange,
        onReport,
        onFilter,
        onReset
    }
) => {
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Generate Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can generate report in XLS format for specified period.
                        But please note that the period should not exceed six months.
                    </DialogContentText>
                    <DemoContainer components={['DateField', 'DateField']} sx={{mt: 4}}>
                        <DateInput
                            id="startDate"
                            label="Start Date"
                            value={startDate}
                            onChange={(val) => onChange(val, "startDate")}
                        />
                        <DateInput
                            id="endDate"
                            label="End Date"
                            value={endDate}
                            onChange={(val) => onChange(val, "endDate")}
                        />
                    </DemoContainer>
                    <OperationTagsSelector
                        onChange={onTagsChange}
                        tags={tags}
                        allTags={allTags}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onReset}>Reset</Button>
                    <Button onClick={() => onFilter(startDate, endDate)}>Preview</Button>
                    <Button onClick={() => onReport(startDate, endDate)}>Export XLS</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
export default ReportDialog;
