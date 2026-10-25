import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateField} from "@mui/x-date-pickers/DateField";
import OperationTagsSelector from "../operations/OperationTagsSelector";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {Dayjs} from "dayjs";

interface EditDialogProps {
    isOpen: boolean;
    allTags: string[][];
    date: number;
    description: string;
    tags: string[];
    onCancel: () => void;
    onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onTagsChange: (tags: string[]) => void;
    onDateChange: (value: Dayjs | null, name: string) => void;
    onUpdateOperation: () => void;
}

const EditDialog: React.FC<EditDialogProps> = ({
    isOpen,
    allTags,
    description,
    date,
    tags,
    onTagsChange,
    onDescriptionChange,
    onCancel,
    onDateChange,
    onUpdateOperation,
}) => {
    const maxDate = "2030-12-31";
    const minDate = "2020-01-01";
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Bulk Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use this form to update all selected operations at once.
                    </DialogContentText>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            id="date"
                            label="Date"
                            name="Date"
                            minDate={dayjs(minDate)}
                            maxDate={dayjs(maxDate)}
                            value={dayjs(date)}
                            margin="dense"
                            format="DD-MM-YYYY"
                            onChange={(val) => onDateChange(val, "date")}
                            fullWidth
                            disabled={true}
                        />
                    </LocalizationProvider>

                    <TextField
                        id="outlined-basic"
                        label="Description"
                        value={description}
                        name="description"
                        variant="outlined"
                        margin="dense"
                        onChange={onDescriptionChange}
                        disabled={true}
                        fullWidth
                    />
                    <OperationTagsSelector
                        onChange={onTagsChange}
                        tags={tags}
                        allTags={allTags}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onUpdateOperation}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditDialog;
