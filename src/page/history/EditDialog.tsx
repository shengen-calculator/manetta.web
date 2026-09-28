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

interface EditDialogProps {
    isOpen: boolean
    allTags: string [][]
    startDate: number
    endDate: number
    tags: string []
    onCancel: () => void
    onTagsChange: (tags: string[]) => void
    onChange: (value: Dayjs | null, name: string) => void
    onReset: () => void
}

const EditDialog: React.FC<EditDialogProps> = (
    {
        isOpen,
        allTags,
        startDate,
        endDate,
        tags,
        onTagsChange,
        onCancel,
        onChange,
        onReset
    }
) => {
    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>Bulk Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Use this form to update all selected operations at once.
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
                    <Button onClick={onReset}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
export default EditDialog;
