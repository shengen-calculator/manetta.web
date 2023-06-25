import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface PostDialogProps {
    isOpen: boolean
    asSingle: boolean
    onCancel: () => void
    post: (asSingle: boolean) => void
}

const PostDialog: React.FC<PostDialogProps> = (
    {
        isOpen,
        asSingle,
        onCancel,
        post
    }
) =>  {

    const handlePost = () => {
        post(asSingle);
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        asSingle ?
                            "POST ALL RECORDS AS SINGLE OPERATION?" :
                            "POST ALL RECORDS AS SEPARATE OPERATIONS?"
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            asSingle ?
                                "All records after the posting operation will have the same operation number. " :
                                "All records after the posting operation will have an individual operation number. "
                        }
                        Don't forget that tag order is important for reports.
                        Please find more information in provided documentation.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>CANCEL</Button>
                    <Button onClick={handlePost} autoFocus>
                        POST
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostDialog;
