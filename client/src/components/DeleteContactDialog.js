import React, { useState } from 'react';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useMutation } from "react-query";
import { deleteContact } from '../api/contacts';

export default function DeleteContactDialog(props) {
  const {queryClient, contact, open, onOpenChange} = props;
  const [error, setError] = useState('')
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const { mutate, isLoading } = useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.refetchQueries('contacts');
      setOpenSuccessSnackbar(true);
      handleClose();
      setError('');
    },
    onError: error => {
      setError(error.response.data.error.message);
      setOpenErrorSnackbar(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries('contacts');
    }
  });

  const handleClose = () => {
    onOpenChange(false);
  }

  const handleDelete = event => {
    mutate(contact.id);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-contact-dialog-title"
      >
        <DialogTitle id="delete-contact-dialog-title">Delete Contact</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-contact-dialog-description">
            Are you sure you want to delete {contact.first_name} {contact.last_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            color="error" 
            loading={isLoading} 
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleSuccessSnackbarClose}>
        <Alert onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Contact deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleErrorSnackbarClose}>
        <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
