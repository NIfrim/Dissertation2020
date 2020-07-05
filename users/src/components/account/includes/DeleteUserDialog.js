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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main
  },
  buttonRoot: {
    color: theme.palette.secondary.contrastText
  }
}));

const DeleteUserDialog = ({ dialogOpen, setDialogOpen, deleteUser }) => {
  const classes = useStyles();

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
      <Dialog open={dialogOpen} classes={{ paper: classes.root }}>
        <DialogTitle id='alert-dialog-title'>
          <Typography variant={'h5'} color={'textSecondary'}>
            Are you sure?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting the account is irreversible, if unsure use the Deactivate
            option instead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            id={'cancel'}
            onClick={handleClick}
            variant={'outlined'}
            classes={{ root: classes.buttonRoot }}
          >
            Cancel
          </Button>
          <Button
            id={'confirmDelete'}
            onClick={handleClick}
            variant={'outlined'}
            classes={{ root: classes.buttonRoot }}
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
