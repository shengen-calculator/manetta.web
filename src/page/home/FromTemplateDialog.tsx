import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FromTemplateDialogProps {
    isOpen: boolean
    title: string
    tags: string[]
    onCancel: () => void
    onCreate: (tags: string[]) => void
}

const FromTemplateDialog: React.FC<FromTemplateDialogProps> = (
    {
        isOpen,
        title,
        tags,
        onCancel,
        onCreate
    }
) => {

    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>{title.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Would you like to create operations?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button color="warning" onClick={() => onCreate(tags)}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FromTemplateDialog;
