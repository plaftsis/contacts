import * as React from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditHistoryDialog from './EditHistoryDialog';
import EditContactDialog from './EditContactDialog';
import DeleteContactDialog from './DeleteContactDialog';
import Paper from '@mui/material/Paper';

import { useQuery } from "react-query";
import {getContacts} from '../api/contacts';

const filterTable = (contacts, prefix) => { 
  return contacts.filter((contact) => {
    const fullName = `${contact.first_name}${contact.last_name}`.toLowerCase();
    const trimmedPrefix = prefix
      .replace(/\s+/g, '')
      .toLowerCase();
    return fullName.includes(trimmedPrefix);
  });
};

export default function DataTable(props) {
  const { queryClient, prefix } = props;
  const [openHistoryDialog, setOpenHistoryDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [contactId, setContactId] = React.useState(null);
  const [contact, setContact] = React.useState({});
  const { isLoading, error, data } = useQuery(["contacts"], () => getContacts());

  if (isLoading) return <LinearProgress />;

  if (error && error.response) return <Alert severity="error">{error.response.data.error}</Alert>;

  if (error) return <Alert severity="error">{error.message}</Alert>;

  const handleClickOpenHistoryDialog = contact => {
    setContact(contact);
    setOpenHistoryDialog(true);
  }

  const handleClickOpenEditDialog = contactId => {
    setContactId(contactId);
    setOpenEditDialog(true);
  }

  const handleClickOpenDeleteDialog = contact => {
    setContact(contact);
    setOpenDeleteDialog(true);
  }

  const columns = [
    { field: 'first_name', headerName: 'First name', minWidth: 100, flex: 1 },
    { field: 'last_name', headerName: 'Last name', minWidth: 100, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
    { field: 'phone_number', headerName: 'Phone number', minWidth: 150, flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      minWidth: 150,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem 
          icon={<HistoryIcon />} 
          label="Edit History" 
          disabled={params.row.created_at === params.row.updated_at}
          onClick={() => handleClickOpenHistoryDialog(params.row)} 
        />,
        <GridActionsCellItem 
          icon={<EditIcon />} 
          label="Edit" 
          onClick={() => handleClickOpenEditDialog(params.row.id)} 
        />,
        <GridActionsCellItem 
          icon={<DeleteIcon />} 
          label="Delete" 
          onClick={() => handleClickOpenDeleteDialog(params.row)}
        />
      ],
    },
  ];

  return (
    <Paper elevation={0} square={true} sx={{height: 'calc(100vh - 64px)', width: '100%'}}>
      <DataGrid
        rows={filterTable(data, prefix)}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick={true}
        sx={{ border: 0 }}
      />
      <EditHistoryDialog
        open={openHistoryDialog} 
        onOpenChange={setOpenHistoryDialog} 
        contact={contact}
      />
      <EditContactDialog 
        queryClient={queryClient}
        open={openEditDialog} 
        onOpenChange={setOpenEditDialog} 
        contactId={contactId}
        onContactIdChange={setContactId}
      />
      <DeleteContactDialog
        queryClient={queryClient}
        open={openDeleteDialog} 
        onOpenChange={setOpenDeleteDialog} 
        contact={contact}
      />
    </Paper>
  );
}
