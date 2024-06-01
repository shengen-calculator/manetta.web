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
    onSubmit: (row: PostedOperation) => void
    row: PostedOperation
}

const RevertDialog: React.FC<RevertDialogProps> = (
    {
        isOpen,
        onCancel,
        onSubmit,
        row
    }
) => {
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Revert Operation #{row.docNumber}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        As result of reverting Account balance will be affected. All other operations with the same Doc. Number will be reverted too. Revert Operation can not be canceled.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSubmit(row)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
export default RevertDialog;
