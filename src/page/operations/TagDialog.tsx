import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import AutoCompleteInput from "./AutoCompleteInput";

interface TagDialogProps {
    isOpen: boolean
    onCancel: () => void
    groups: Group[],
    tags: string[],
    tagDialogParams: TagDialogParams,
    save: (tagDialogParams: TagDialogParams) => void
}

interface OperationTags extends TagDialogParams {
    saveAsGroup: boolean,
    inputGroupName: string
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

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

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOperationTags(prev => ({
            ...prev,
            groupName: "",
            saveAsGroup: false
        }));
        save({
            operationId: tagDialogParams.operationId,
            tags: operationTags.tags,
            groupName: operationTags.saveAsGroup ? operationTags.inputGroupName : ""
        });
    };
    const handleCancel = (): void => {
        setOperationTags(prev => ({
            ...prev,
            groupName: "",
            saveAsGroup: false
        }));
        onCancel();
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

    const [operationTags, setOperationTags] = useState<OperationTags>({
        operationId: 0,
        tags: [],
        groupName: "",
        inputGroupName: "",
        saveAsGroup: false
    });

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleCancel}>
                <DialogTitle>Apply Operation tags</DialogTitle>
                <form onSubmit={handleSave}>
                    <DialogContent>
                        <DialogContentText>
                            Don't forget that tag order is important for reports. Please find more information in
                            provided documentation.
                        </DialogContentText>
                        <Autocomplete
                            id="base-tags"
                            multiple
                            options={top100Films}
                            getOptionLabel={(option) =>
                                typeof option === "string" ? option : option["title"]}
                            defaultValue={[top100Films[3], top100Films[5]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Base Tags"
                                    placeholder="Limited by existing tag order"
                                    margin="dense"
                                    fullWidth
                                />
                            )}
                        />
                        <Autocomplete
                            id="extra-tags"
                            multiple
                            freeSolo
                            options={top100Films}
                            getOptionLabel={(option) =>
                                typeof option === "string" ? option : option["title"]}
                            defaultValue={[top100Films[13]]}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Extra Tags"
                                    placeholder="Any value allowed"
                                    margin="dense"
                                    fullWidth
                                />
                            )}
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
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default TagDialog;
