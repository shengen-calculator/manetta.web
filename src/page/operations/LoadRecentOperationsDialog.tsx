import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContentText} from "@mui/material";
import AutoCompleteInput from "./AutoCompleteInput";

interface LoadRecentOperationsDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    groups: Group[];
}

const LoadRecentOperationsDialog: React.FC<LoadRecentOperationsDialogProps> = ({
    isOpen,
    onCancel,
    groups,
}) => {
    const handleAutocompleteChange = (
        event: React.SyntheticEvent,
        newValue: string | null,
        inputId: string,
    ): void => {};

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
                    <DialogContentText sx={{mb: 2}}>
                        You are about to create copies of the recently posted
                        operations for the selected group.
                    </DialogContentText>
                    <AutoCompleteInput
                        id="groupName"
                        label="Group name"
                        freeSolo={true}
                        options={groups.map((gr) => gr.name)}
                        margin="dense"
                        error={false}
                        variant={"outlined"}
                        value={""}
                        inputValue={""}
                        onChange={(e, newVal) =>
                            handleAutocompleteChange(e, newVal, "groupName")
                        }
                        onInputChange={(e, newVal) =>
                            handleAutocompleteChange(
                                e,
                                newVal,
                                "inputGroupName",
                            )
                        }
                    />
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
