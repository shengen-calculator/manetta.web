import * as React from 'react';
import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";


interface CurrencyDialogProps {
    isOpen: boolean
    onCancel: () => void
    save: (rate: number, abbr: string) => void
}

const RateDialog: React.FC<CurrencyDialogProps> = (
    {
        isOpen,
        onCancel,
        save
    }
) => {

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}>
            <DialogTitle>Actual USD exchange rate</DialogTitle>
            <form onSubmit={handleSave}>
                <DialogContent>
                    <DialogContentText>
                        Please enter the actual USD exchange rate. This will affect settlements against the main currency.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="rate"
                        name="rate"
                        label="Currency rate"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="submit">SAVE</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default RateDialog;