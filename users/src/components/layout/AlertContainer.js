import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { makeStyles, Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '1rem',
    width: '100vw',
    padding: '1rem',
    zIndex: 1200
  }
}));

const AlertContainer = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts &&
    alerts.length > 0 && (
      <Box className={classes.root}>
        <Container maxWidth={'lg'}>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              id={alert.id}
              severity={alert.alertType}
              variant={'filled'}
            >
              {alert.msg.replace('GraphQL error: ', '')}
            </Alert>
          ))}
        </Container>
      </Box>
    )
  );
};

AlertContainer.propTypes = {
  alerts: PropTypes.array
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertContainer);
