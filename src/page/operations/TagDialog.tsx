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

interface TagDialogProps {
    isOpen: boolean
    onCancel: () => void
    groups: Group[],
    tags: string[][],
    tagDialogParams: TagDialogParams,
    save: (tagDialogParams: TagDialogParams) => void
}

interface OperationTags extends TagDialogParams {
    saveAsGroup: boolean,
    baseTags: string[],
    extraTags: string[],
    inputGroupName: string,
    inputExtraTag: string,
    inputBaseTag: string
}

const TagDialog: React.FC<TagDialogProps> = (
    {
        isOpen,
        groups,
        tags,
        tagDialogParams,
        onCancel,
        save
    }
) => {
    useEffect(() => {
        if(isOpen) {
            setOperationTags(prev => ({
                ...prev,
                baseTags: tagDialogParams.tags,
                extraTags: [],
                groupName: "",
                saveAsGroup: false
            }));
        }
    }, [tagDialogParams.tags, isOpen]);

    const [operationTags, setOperationTags] = useState<OperationTags>({
        operationId: 0,
        tags: [],
        baseTags: [],
        extraTags: [],
        groupName: "",
        inputGroupName: "",
        inputBaseTag: "",
        inputExtraTag: "",
        saveAsGroup: false
    });

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        save({
            operationId: tagDialogParams.operationId,
            tags: [...operationTags.baseTags, ...operationTags.extraTags],
            groupName: operationTags.saveAsGroup ? operationTags.inputGroupName : ""
        });
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
            groupName: tagDialogParams.groupName,
            saveAsGroup: checked
        }));
    };
    
    const getBaseTags = () => {
        const index = operationTags.baseTags.length;
        let filtered: string[][] = [];
        filtered = tags.filter((coll) => coll.length > index);
        operationTags.baseTags.forEach((tag, index) => {
            filtered = filtered.filter(coll => coll[index] === tag);
        });
        return filtered.reduce(
            (accumulator, currentValue) => [...accumulator, currentValue[index]], []);
    };

    const getExtraTags = () => {
        return tags.reduce(
            (accumulator: string[], currentValue) => [...accumulator, ...currentValue], []);
    };

    const onlyUnique = (value: string, index: number, array: string[]) => {
        return array.indexOf(value) === index;
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
                        <AutoCompleteInput
                            id="baseTags"
                            label="Base Tags"
                            multiple={true}
                            options={getBaseTags().filter(onlyUnique)}
                            placeholder="Limited by existing tag order"
                            margin="dense"
                            error={false}
                            variant={"outlined"}
                            value={operationTags.baseTags || []}
                            inputValue={operationTags.inputBaseTag}
                            onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "baseTags")}
                            onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputBaseTag")}
                        />
                        <AutoCompleteInput
                            id="extraTags"
                            label="Extra Tags"
                            freeSolo={true}
                            multiple={true}
                            options={getExtraTags().filter(onlyUnique)}
                            placeholder="Any value allowed"
                            margin="dense"
                            error={false}
                            variant={"outlined"}
                            value={operationTags.extraTags || []}
                            inputValue={operationTags.inputExtraTag}
                            onChange={(e, newVal) => handleAutocompleteChange(e, newVal, "extraTags")}
                            onInputChange={(e, newVal) => handleAutocompleteChange(e, newVal, "inputExtraTag")}
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
