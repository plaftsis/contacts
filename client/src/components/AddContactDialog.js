import React, { useState } from 'react';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useMutation } from "react-query";
import { addContact } from '../api/contacts';

const initialContact = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: ''
}

const initialErrors = {
  first_name: [],
  last_name: [],
  email: [],
  phone_number: []
}

export default function AddContactDialog(props) {
  const {queryClient, open, onOpenChange} = props;
  const [contact, setContact] = useState(initialContact)
  const [formIsValid, setFormIsValid] = useState(false)
  const [errors, setErrors] = useState(initialErrors)
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const { mutate, isLoading } = useMutation(addContact, {
    onSuccess: data => {
      queryClient.refetchQueries('contacts');
      setOpenSnackbar(true);
      handleClose();
      setErrors({ ...errors, initialErrors });
    },
    onError: error => {
      setErrors({ ...errors, ...error.response.data.errors });
    },
    onSettled: () => {
      queryClient.invalidateQueries('contacts');
    }
  });

  React.useEffect(
    () => {
      if (Object.values(contact).every(x => x !== '')) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }, [contact]
  );

  const handleClose = () => {
    setContact(initialContact);
    onOpenChange(false);
  }

  const handleAdd = event => {
    setContact(contact);
    mutate(contact);
  }

  const handleChange = name => ({ target: { value } }) => {
    setContact({ ...contact, [name]: value });
    setErrors({ ...errors, [name]: [] });
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-contact-dialog-title"
      >
        <DialogTitle id="add-contact-dialog-title">Add Contact</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            label="First name"
            type="string"
            fullWidth
            value={contact.first_name}
            onChange={handleChange('first_name')}
            error={errors["first_name"].length > 0}
            helperText={errors["first_name"][0]}
          />
          <TextField
            required
            margin="dense"
            label="Last name"
            type="string"
            fullWidth
            value={contact.last_name}
            onChange={handleChange('last_name')}
            error={errors["last_name"].length > 0}
            helperText={errors["last_name"][0]}
          />
          <TextField
            required
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={contact.email}
            onChange={handleChange('email')}
            error={errors["email"].length > 0}
            helperText={errors["email"][0]}
          />
          <TextField
            required
            margin="dense"
            label="Phone number"
            type="tel"
            fullWidth
            value={contact.phone_number}
            onChange={handleChange('phone_number')}
            error={errors["phone_number"].length > 0}
            helperText={errors["phone_number"][0]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton 
            disabled={!formIsValid} 
            loading={isLoading} 
            onClick={handleAdd}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Contact added successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}
