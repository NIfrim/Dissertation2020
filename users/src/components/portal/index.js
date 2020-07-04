import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { loginUser } from '../../actions/auth';

import { Redirect } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import {
  CssBaseline,
  Typography,
  AppBar,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Box
} from '@material-ui/core';

import { Spinner } from '../layout';
import LoginForm from './includes/LoginForm';
import Header from './includes/Header';
import TabPanel from '../includes/TabPanel';
import clsx from 'clsx';
import RegisterForm from './includes/RegisterForm';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.mainBackground,
    height: '100%'
  },

  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (min-width: 576px)': {
      width: 500,
      backgroundColor: theme.palette.secondary.main,
      height: '80%',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
  },
  avatar: {
    margin: theme.spacing(1),
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.secondary.main
  },
  tabsWrapper: {
    backgroundColor: theme.palette.primary.dark
  },
  tabPanelWrapper: {
    width: '100%', // Fix IE 11 issue.
    overflowY: 'auto',
    maxHeight: '400px'
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2)
  },
  tab: {
    color: theme.palette.primary.contrastText
  }
}));

const Portal = ({ auth, app }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChangeIndex = (value) => {
    setActiveTab(value > 1 ? 1 : value);
  };

  // Redirect if authenticated
  if (auth.isAuthenticated) {
    return <Redirect to={'/'} />;
  }

  return app.loading ? (
    <Spinner />
  ) : (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      className={classes.main}
    >
      <Grid
        container
        className={classes.root}
        component='main'
        wrap={'nowrap'}
        direction={'column'}
        alignItems={'stretch'}
      >
        <CssBaseline />
        <Header />
        <Grid
          container
          className={classes.tabsContainer}
          direction={'column'}
          justify={'flex-start'}
          alignItems={'stretch'}
        >
          <AppBar position='static' color='default'>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              indicatorColor={'secondary'}
              variant='fullWidth'
              className={classes.tabsWrapper}
            >
              <Tab
                label='Log In'
                id={'logInTab'}
                aria-controls={'logInScreen'}
                className={classes.tab}
              />
              <Tab
                label='Register'
                id={'registerTab'}
                aria-controls={'registerScreen'}
                className={classes.tab}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeTab}
            onChangeIndex={handleChangeIndex}
            slideClassName={classes.tabPanelWrapper}
          >
            <TabPanel
              value={activeTab}
              index={0}
              id={'logInScreen'}
              dir={theme.direction}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'stretch'}
                p={3}
              >
                <Box component={'div'}>
                  <Grid container item justify={'center'}>
                    <Grid item key={'facebook-login'}>
                      <IconButton aria-label={'facebook-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(
                            classes.socialItem,
                            'mdi mdi-facebook'
                          )}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>

                    <Grid item key={'twitter-login'}>
                      <IconButton aria-label={'twitter-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(
                            classes.socialItem,
                            'mdi mdi-twitter'
                          )}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>

                    <Grid item key={'yahoo-login'}>
                      <IconButton aria-label={'yahoo-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(classes.socialItem, 'mdi mdi-yahoo')}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Typography
                    variant={'h6'}
                    align={'center'}
                    color={'textSecondary'}
                  >
                    or
                  </Typography>
                </Box>
                <LoginForm />
              </Box>
            </TabPanel>

            <TabPanel
              value={activeTab}
              index={1}
              id={'registerScreen'}
              dir={theme.direction}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'stretch'}
                p={3}
              >
                <Box component={'div'}>
                  <Grid container item justify={'center'} alignItems={'center'}>
                    <Grid item key={'facebook-login'}>
                      <IconButton aria-label={'facebook-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(
                            classes.socialItem,
                            'mdi mdi-facebook'
                          )}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>

                    <Grid item key={'twitter-login'}>
                      <IconButton aria-label={'twitter-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(
                            classes.socialItem,
                            'mdi mdi-twitter'
                          )}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>

                    <Grid item key={'yahoo-login'}>
                      <IconButton aria-label={'yahoo-login'}>
                        <Typography
                          variant={'h4'}
                          className={clsx(classes.socialItem, 'mdi mdi-yahoo')}
                          color={'textSecondary'}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Typography
                    variant={'h6'}
                    align={'center'}
                    color={'textSecondary'}
                  >
                    or
                  </Typography>
                </Box>
                <RegisterForm />
              </Box>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </Box>
  );
};

Portal.propTypes = {
  loginUser: PropTypes.func.isRequired,
  account: PropTypes.object,
  app: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, app }) => ({
  auth,
  app
});

export default connect(mapStateToProps, {
  setAlert,
  loginUser
})(Portal);
