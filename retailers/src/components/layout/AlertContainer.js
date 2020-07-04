import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100%',
    padding: '1rem',
    zIndex: 1200
  }
}))

const AlertContainer = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts && alerts.length > 0 &&  (
      <Box className={classes.root}>
        {alerts.map(alert => (
          <Alert key={alert.id} id={alert.id} severity={alert.alertType} variant={'filled'}>
            {alert.msg}
          </Alert>
        ))}
      </Box>
    )
  )
}

AlertContainer.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(AlertContainer)
