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

interface TagDialogProps {
    isOpen: boolean
    onCancel: () => void
    groups: Group[],
    tags: string[],
    save: (operationId: string, tags: string[], groupName: string) => void
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
        onCancel,
        save
    }
) => {

    const handleSave = () => {
        save("12345", [], "");
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onCancel}>
                <DialogTitle>Apply Operation tags</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Don't forget that tag order is important for reports. Please find more information in provided documentation.
                    </DialogContentText>
                    <Autocomplete
                        id="base-tags"
                        multiple
                        options={top100Films}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option["title"] }
                        defaultValue={[top100Films[13], top100Films[10]]}
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
                            typeof option === "string" ? option : option["title"] }
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
                    <FormControlLabel control={<Checkbox />} label="Save as group" />
                    <Autocomplete
                        id="group"
                        freeSolo
                        options={top100Films}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option["title"] }
                        defaultValue={top100Films[13]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Group name"
                                margin="dense"
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TagDialog;
