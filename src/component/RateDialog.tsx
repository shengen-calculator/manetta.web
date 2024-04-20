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
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    abbr: string
    rate: string
    isError: boolean
    onSave: (event: React.FormEvent<HTMLFormElement>) => void
}

const RateDialog: React.FC<CurrencyDialogProps> = (
    {
        isOpen,
        onCancel,
        onChange,
        abbr,
        rate,
        isError,
        onSave
    }
) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}>
            <DialogTitle>Actual {abbr} exchange rate</DialogTitle>
            <form onSubmit={onSave}>
                <DialogContent>
                    <DialogContentText>
                        Please enter the actual {abbr} exchange rate.
                        This will affect settlements against the main currency.
                    </DialogContentText>
                    <TextField
                        error={isError}
                        autoFocus
                        required
                        margin="dense"
                        id="rate"
                        name="rate"
                        label="Currency rate"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={rate}
                        onChange={onChange}
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