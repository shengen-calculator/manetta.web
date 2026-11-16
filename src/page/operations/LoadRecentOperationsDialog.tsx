import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface LoadRecentOperationsDialogProps {
    isOpen: boolean;
    onCancel: () => void;
}

const LoadRecentOperationsDialog: React.FC<LoadRecentOperationsDialogProps> = ({
    isOpen,
    onCancel,
}) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    LOAD RECENT OPERATIONS
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>CANCEL</Button>
                    <Button onClick={onCancel} autoFocus>
                        LOAD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoadRecentOperationsDialog;
