import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { toggleAccountDisabled } from '../../../actions/user';
import DeleteUserDialog from './DeleteUserDialog';

const AccountControl = ({ account, toggleAccountDisabled }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    const element = event.currentTarget;

    switch (element.id) {
      case 'delete':
        setOpenDialog(true);
        break;

      case 'deactivate':
        toggleAccountDisabled(!account.accountDisabled);
        break;

      default:
        break;
    }
  };

  return (
    <Grid
      container
      justify={'space-between'}
      direction={'column'}
      alignItems={'center'}
    >
      <Grid
        container
        item
        direction={'column'}
        justify={'space-between'}
        wrap={'nowrap'}
        alignItems={'stretch'}
      >
        <Box p={2}>
          <Typography variant={'h5'} color={'textSecondary'}>
            {account.accountDisabled ? 'Enable' : 'Disable'} Account
          </Typography>
          <Typography variant={'body2'} color={'textSecondary'}>
            {account.accountDisabled
              ? 'Account is currently disabled, you can enable it to receive promotions again.'
              : 'Disabling the account would stop promotions from being generated and\n' +
                '            sent to you. Use this if you plan to return to us in the future.'}
          </Typography>
        </Box>
        <Button
          id={'deactivate'}
          color={'secondary'}
          variant={'contained'}
          onClick={handleClick}
        >
          {account.accountDisabled ? 'Enable' : 'Disable'}
        </Button>
      </Grid>

      <Grid
        container
        item
        direction={'column'}
        justify={'space-between'}
        wrap={'nowrap'}
        alignItems={'stretch'}
      >
        <Box p={2}>
          <Typography variant={'h5'} color={'textSecondary'}>
            Delete Account
          </Typography>
          <Typography variant={'body2'} color={'textSecondary'}>
            Deleting the account removes all data related to you personally, it
            cannot be undone. If unsure use Deactivate instead.
          </Typography>
        </Box>
        <Button
          id={'delete'}
          color={'secondary'}
          variant={'contained'}
          onClick={handleClick}
        >
          Delete
        </Button>
      </Grid>
      <DeleteUserDialog dialogOpen={openDialog} setDialogOpen={setOpenDialog} />
    </Grid>
  );
};

AccountControl.propTypes = {
  account: PropTypes.object.isRequired,
  toggleAccountDisabled: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  account: user.account
});

export default connect(mapStateToProps, { toggleAccountDisabled })(
  AccountControl
);
