import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import { useQuery } from "react-query";
import { getEditHistory } from '../api/contacts';

const { DateTime } = require("luxon");

const EditHistoryTable = (props) => {
  const { data } = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Datetime</TableCell>
              <TableCell>Field</TableCell>
              <TableCell>Old value</TableCell>
              <TableCell>New value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((audit) => (
            Object.keys(audit.audited_changes).map((attribute, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{DateTime.fromISO(audit.created_at).toFormat('f')}</TableCell>
                <TableCell component="th" scope="row">{attribute.charAt(0).toUpperCase() + attribute.replace('_', ' ').slice(1)}</TableCell>
                <TableCell component="th" scope="row">{audit.audited_changes[attribute][0]}</TableCell>
                <TableCell component="th" scope="row">{audit.audited_changes[attribute][1]}</TableCell>
              </TableRow>
            ))
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default function EditHistoryDialog(props) {
  const {open, onOpenChange, contact} = props;

  const { isLoading, error, data } = useQuery(["history"], () => getEditHistory(contact.id), {enabled: open});

  const handleClose = () => {
    onOpenChange(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-history-dialog-title"
        maxWidth='650'
      >
        <DialogTitle id="edit-history-dialog-title">Edit History</DialogTitle>
        <DialogContent id="edit-history-dialog-content">
          {isLoading && <Box sx={{ width: 300 }}><Skeleton /><Skeleton /><Skeleton /></Box>}
          {error && <Alert severity="error">{error.response.data.error}</Alert>}
          {data && <EditHistoryTable data={data} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
