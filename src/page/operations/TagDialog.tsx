import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import OperationTagsSelector from "./OperationTagsSelector";

interface TagDialogProps {
    isOpen: boolean
    onCancel: () => void
    groups: Group[],
    allTags: string[][],
    operationId: number,
    tags: string[],
    groupName: string,
    save: (operationId: number, tags: string[], groupName: string, saveAsGroup: boolean) => void
}

interface OperationTags {
    tags: string[],
    groupName: string,
    saveAsGroup: boolean,
    inputGroupName: string,
    inputBaseTag: string,
    inputExtraTag: string
}

const TagDialog: React.FC<TagDialogProps> = (
    {
        isOpen,
        groups,
        allTags,
        operationId,
        tags,
        groupName,
        onCancel,
        save
    }
) => {

    useEffect(() => {
        if(isOpen) {
            setOperationTags(prev => ({
                ...prev,
                groupName: "",
                saveAsGroup: false
            }));
        }
    }, [isOpen]);

    const [operationTags, setOperationTags] = useState<OperationTags>({
        tags: [],
        groupName: "",
        saveAsGroup: false,
        inputGroupName: "",
        inputBaseTag: "",
        inputExtraTag: "",
    });

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        save(operationId, operationTags.tags,
            operationTags.saveAsGroup ? operationTags.inputGroupName : groupName,
            operationTags.saveAsGroup);
    };

    const handleChange = (tags: string[]): void => {
        setOperationTags(prev => ({
            ...prev,
            tags
        }))
    };

    const handleAutocompleteChange = (event: React.SyntheticEvent, newValue: string | null, inputId: string): void => {
        setOperationTags(prev => ({
            ...prev,
            [inputId]: newValue
        }));
    };

    const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setOperationTags(prev => ({
            ...prev,
            groupName,
            saveAsGroup: checked
        }));
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onCancel}>
                <DialogTitle>Apply Operation tags</DialogTitle>
                <form onSubmit={handleSave}>
                    <DialogContent>
                        <DialogContentText>
                            Don't forget that tag order is important for reports. Please find more information in
                            provided documentation.
                        </DialogContentText>
                        <OperationTagsSelector
                            onChange={handleChange}
                            tags={tags}
                            allTags={allTags}
                        />
                        <FormControlLabel control={
                            <Checkbox id="saveAsGroup" checked={operationTags.saveAsGroup} onChange={handleCheckBoxChange}/>
                        } label="Save as group"/>
                        {
                            operationTags.saveAsGroup ?
                                <AutoCompleteInput
                                    id="groupName"
                                    label="Group name"
                                    freeSolo={true}
                                    options={groups.map(gr => gr.name)}
                                    margin="dense"
                                    error={false}
                                    variant={"outlined"}
                                    value={operationTags.groupName || ''}
                                    inputValue={operationTags.inputGroupName}
                                    onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "groupName")}
                                    onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputGroupName")}
                                /> : ""
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default TagDialog;
