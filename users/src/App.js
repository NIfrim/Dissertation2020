import React, { useEffect } from 'react';
import UAParser from 'ua-parser-js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Themes
import { lightTheme, darkTheme, colourBlindTheme } from './Themes';

import './App.css';

// Components
import { Portal, Home, Account, Support } from './components';
import {
  CssBaseline,
  Box,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import { AlertContainer, CustomAppBar } from './components/layout';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { connect } from 'react-redux';
import { loadUser } from './actions/auth';
import { loadPromotions } from './actions/promotions';
import { setDeviceInfo } from './actions/user';
import { makeStyles } from '@material-ui/core/styles';

const parser = new UAParser();

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%'
  }
}));

const App = ({ auth, account, loadUser, loadPromotions, setDeviceInfo }) => {
  const { isAuthenticated } = auth;
  const theme = useTheme(account.theme, account.fontScale);
  const classes = useStyles();

  // Load the user whenever they load the app and they are logged in
  useEffect(() => {
    loadUser();
  }, [isAuthenticated, loadUser]);

  // Get the device information and add it to store and local storage
  useEffect(() => {
    // Get the device info
    let platform = parser.getOS();
    const deviceInfo = {
      platform: platform.name ? platform.name : platform
    };

    setDeviceInfo(deviceInfo);
  }, [setDeviceInfo, isAuthenticated]);

  // Load all the promotions from the stores
  // Load the user whenever they load the app and they are logged in
  useEffect(() => {
    loadPromotions();
  }, [isAuthenticated, loadPromotions, account.accountDisabled]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        {!isAuthenticated && <Redirect to={'/portal'} />}
        {isAuthenticated && <CustomAppBar />}
        <Box component={'main'} className={classes.main}>
          <Switch>
            <PrivateRoute exact path={'/account'} component={Account} />
            <PrivateRoute exact path={'/'} component={Home} />
            <PrivateRoute exact path={'/support'} component={Support} />
            <Route exact path={'/portal'} component={Portal} />
          </Switch>
        </Box>
        <AlertContainer />
      </Router>
    </ThemeProvider>
  );
};

const useTheme = (theme, fontScale) => {
  switch (theme) {
    case 'dark':
      darkTheme.typography.fontSize = 14 * fontScale;
      return createMuiTheme(darkTheme);

    case 'light':
      lightTheme.typography.fontSize = 14 * fontScale;
      return createMuiTheme(lightTheme);

    case 'colour-blind':
      colourBlindTheme.typography.fontSize = 14 * fontScale;
      return createMuiTheme(colourBlindTheme);

    default:
      break;
  }
};

App.propTypes = {
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadPromotions: PropTypes.func.isRequired,
  setDeviceInfo: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, user }) => ({
  auth,
  account: user.account
});

export default connect(mapStateToProps, {
  loadUser,
  loadPromotions,
  setDeviceInfo
})(App);
