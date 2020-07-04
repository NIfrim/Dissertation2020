import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './App.css';

// Components
import { Login, Promotions, Products, AccessGroups, Stores, Dashboard } from './components';
import { Container, CssBaseline, makeStyles, Box } from '@material-ui/core';
import { SideNav, TopBar, AlertContainer } from './components/layout';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { connect } from 'react-redux';
import { getProductGroups } from './actions/products';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: 64,
    width: '100%',
    overflowY: 'auto'
  },
  hidden: {
    display: 'none'
  }
}));

const App = props => {
  const classes = useStyles();
  const {
    auth: { isAuthenticated },
    getProductGroups
  } = props;

  let width = window.innerWidth;
  const [sideNavOpen, setSideNavOpen] = useState(width > 1200);

  // const updateWindowSize = () => {
  //   width = window.innerWidth
  //   width > 900
  //     ? setSideNavOpen(true)
  //     : setSideNavOpen(false)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', updateWindowSize)
  //   return () => window.removeEventListener('resize', updateWindowSize)
  // })

  useEffect(() => {
    if (isAuthenticated) {
      getProductGroups();
    }
  }, [isAuthenticated, getProductGroups]);

  return (
    <Router>
      <CssBaseline />
      {!isAuthenticated && <Redirect to={'/login'} />}
      {isAuthenticated && <TopBar toggleSideNav={setSideNavOpen} sideNavOpen={sideNavOpen} />}
      {isAuthenticated && <SideNav open={sideNavOpen} setOpen={setSideNavOpen} />}
      <Box component={'div'} display={'flex'} overflow={'auto'} width={'100%'}>
        <Container className={clsx({ [classes.main]: isAuthenticated })}>
          <Switch>
            {/* <PrivateRoute exact path={'/dashboard'} component={Dashboard} /> */}
            <PrivateRoute exact path={'/'} component={Dashboard} />
            <PrivateRoute exact path={'/promotions'} component={Promotions} />
            <PrivateRoute exact path={'/stores'} component={Stores} />
            <PrivateRoute exact path={'/products'} component={Products} />
            <PrivateRoute exact path={'/access'} component={AccessGroups} />
            <Route exact path={'/login'} component={Login} />
          </Switch>
        </Container>
        <AlertContainer />
      </Box>
    </Router>
  );
};

App.propTypes = {
  auth: PropTypes.object.isRequired,
  getProductGroups: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, { getProductGroups })(App);
