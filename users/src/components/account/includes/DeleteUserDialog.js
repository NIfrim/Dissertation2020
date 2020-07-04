import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteUser } from '../../../actions/user';

const DeleteUserDialog = ({ dialogOpen, setDialogOpen, deleteUser }) => {
  const handleClick = (event) => {
    const element = event.currentTarget;

    switch (element.id) {
      case 'cancel':
        setDialogOpen(false);
        break;

      case 'confirmDelete':
        deleteUser();
        setDialogOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting the account is irreversible, if unsure use the Deactivate
            option instead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id={'cancel'} onClick={handleClick} variant={'outlined'}>
            Cancel
          </Button>
          <Button
            id={'confirmDelete'}
            onClick={handleClick}
            variant={'outlined'}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteUserDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired
};

export default connect(null, { deleteUser })(DeleteUserDialog);
