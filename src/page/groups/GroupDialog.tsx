import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface GroupDialogProps {
    isOpen: boolean
    groupName: string
    tags: string[]
    onCancel: () => void
    deleteGroup: (groupName: string) => void
}

const GroupDialog: React.FC<GroupDialogProps> = (
    {
        isOpen,
        groupName,
        tags,
        onCancel,
        deleteGroup
    }
) => {

    return (
        <div>
            <Dialog open={isOpen} onClose={onCancel}>
                <DialogTitle>{groupName.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Stack direction="row" spacing={2} sx={{mt: 4}}>
                        {
                            tags.map((tag, index) => (
                                    <Chip
                                        label={tag}
                                        variant={(index % 2 == 0) ? "outlined" : "filled"}
                                    />
                                )
                            )
                        }
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button color="error" onClick={() => deleteGroup(groupName)}>DELETE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GroupDialog;
