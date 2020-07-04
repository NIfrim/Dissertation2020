import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

const TrackingPermissionDialog = ({ user, title, message }) => {
  const [open, setOpen] = useState(false);
  const [permission, setPermission] = useState('prompt');

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Get the permission for geolocation
    const res = navigator.permissions
      .query({ name: 'geolocation' })
      .then((res) => setPermission(res))
      .catch((err) => console.error(err));
  });

  const handleClose = async (event) => {
    try {
      const element = event.currentTarget();

      if (element.id === 'agree') {
        // Save the location in the local storage
        navigator.geolocation.watchPosition(
          (res) => {
            localStorage.setItem(
              'geolocation',
              JSON.stringify([res.coords.latitude, res.coords.longitude])
            );
          },
          (err) => {
            console.error(err);
          }
        );
      } else if (element.id === 'disagree') {
      }

      setOpen(false);
    } catch (err) {}
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {permission === 'denied'
              ? 'Location tracking was previously blocked for this app, please unblock before proceeding further.'
              : message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id={'disagree'} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} id={'agree'} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

TrackingPermissionDialog.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default TrackingPermissionDialog;
