import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// Redux
import { connect } from 'react-redux';
// Components
import {
  SwipeableDrawer,
  Divider,
  Typography,
  Grid,
  Box,
  Switch
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavList from './NavList';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },

  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 250,
    height: '100%'
  },

  logo: {
    width: '50%',
    height: 'auto'
  },

  darkModeSwitch: {
    transform: 'rotateZ(-90deg)'
  }
}));

const CustomDrawer = ({ openState, toggleHandler, clickHandler, account }) => {
  const classes = useStyles();

  return (
    <Fragment key={'navDrawer'}>
      <SwipeableDrawer
        anchor={'left'}
        open={openState}
        classes={{ paper: classes.root }}
        onClose={() => toggleHandler(false)}
        onOpen={() => toggleHandler(true)}
      >
        <div className={clsx(classes.listWrapper)} role='presentation'>
          <Box p={3}>
            <Grid container justify={'center'}>
              <Link to={'/'} className={classes.logo}>
                <img
                  src='/img/logo/VLogo.png'
                  alt='Discounter logo'
                  width={'100%'}
                  id={'logo'}
                  onClick={clickHandler}
                />
              </Link>
            </Grid>
          </Box>

          <Divider />

          <NavList clickHandler={clickHandler} />

          <Divider />

          <Box p={3}>
            <Grid container justify={'space-between'} alignItems={'center'}>
              <Typography variant={'body1'} color={'textSecondary'}>
                Toggle dark mode
              </Typography>
              <Switch
                className={classes.darkModeSwitch}
                color={'secondary'}
                size={'small'}
                checked={account.theme === 'dark'}
                id={'darkMode'}
                onChange={(event) => clickHandler(event)}
              />
            </Grid>
          </Box>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
};

CustomDrawer.propTypes = {
  openState: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  account: user.account
});

export default connect(mapStateToProps)(CustomDrawer);
