import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {DialogContentText} from "@mui/material";
import {useState} from "react";
import AutoCompleteInput from "./AutoCompleteInput";

interface LoadRecentOperationsDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    groups: Group[];
    onLoad: (group: string) => void;
    defaultValue?: string;
}

interface DialogState {
    inputGroupName: string;
    groupName: string;
}

const LoadRecentOperationsDialog: React.FC<LoadRecentOperationsDialogProps> = ({
    isOpen,
    onCancel,
    groups,
    onLoad,
    defaultValue,
}) => {
    const [dialogState, setDialogState] = useState<DialogState>({
        inputGroupName: "",
        groupName: "",
    });

    const handleAutocompleteChange = (
        event: React.SyntheticEvent,
        newValue: string | null,
        inputId: string,
    ): void => {
        setDialogState((prev) => ({
            ...prev,
            [inputId]: newValue,
        }));
    };

    const handleCancel = () => {
        setDialogState((prev) => ({
            ...prev,
            inputGroupName: "",
            groupName: "",
        }));
        onCancel();
    };

    const handleLoad = () => {
        onLoad(dialogState.groupName || defaultValue || "");
        setDialogState((prev) => ({
            ...prev,
            inputGroupName: "",
            groupName: "",
        }));
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleCancel}
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
                        value={dialogState.groupName}
                        inputValue={dialogState.inputGroupName || defaultValue || ""}
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
                    <Button onClick={handleCancel}>CANCEL</Button>
                    <Button onClick={handleLoad} autoFocus>
                        LOAD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoadRecentOperationsDialog;
