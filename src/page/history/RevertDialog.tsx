import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface RevertDialogProps {
    isOpen: boolean
    onCancel: () => void
    docNumber: number
}

const RevertDialog: React.FC<RevertDialogProps> = (
    {
        isOpen,
        onCancel,
        docNumber
    }
) => {
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Revert Operation #{docNumber}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can generate report in XLS format for specified period.
                        But please note that the period should not exceed six months.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onCancel}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
export default RevertDialog;
