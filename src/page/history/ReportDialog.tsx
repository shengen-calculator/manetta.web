import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface ReportDialogProps {
    isOpen: boolean
    startDate: string
    endDate: string
    onCancel: () => void
    onReport: (startDate: string, endDate: string) => void
}

const ReportDialog: React.FC<ReportDialogProps> = (
    {
        isOpen,
        startDate,
        endDate,
        onCancel,
        onReport
    }
) => {
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Generate Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can delete group at any time this will not affect any existing transactions (operations).
                        The idea of the Group is to make the data entry process as convenient as possible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onReport(startDate, endDate)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
export default ReportDialog;
