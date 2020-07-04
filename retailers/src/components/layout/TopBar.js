import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

//  Redux
import { connect } from 'react-redux'
import { logoutAccount } from '../../actions/auth'

// Topbar components
import { Redirect } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Box, Typography, Button, useTheme } from '@material-ui/core'

import { fade, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: 'flex',
    flexDirection: 'row',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.overrides.drawerWidth,
    width: `calc(100% - ${theme.overrides.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none !important'
  },

  // Toolbar inside the top app bar
  toolbar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  // Search Input styles
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(5),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    backgroundColor: theme.palette.common.yellowish,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const TopBar = ({ sideNavOpen, toggleSideNav, logoutAccount }) => {
  const classes = useStyles()
  const theme = useTheme();

  const logoutHandler = () => {
    logoutAccount()
    return <Redirect to={'/login'} />
  }

  return (
    <AppBar
      position='fixed'
      color={'default'}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sideNavOpen
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => toggleSideNav(!sideNavOpen)}
          edge='start'
          className={clsx({
            [classes.hide]: sideNavOpen
          })}
        >
          <i className={'material-icons'}>menu</i>
        </IconButton>
        {/* <Box className={classes.search}>
          <Box className={classes.searchIcon}>
            <i className={'material-icons'}>search</i>
          </Box>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box> */}
        <Button variant={'text'} size={'medium'} color={'primary'} onClick={logoutHandler}>
          <Typography variant={'h6'}>Log Out</Typography>
          <i className={'material-icons'}>exit_to_app</i>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

TopBar.propTypes = {
  ...AppBar.propTypes,
  sideNavOpen: PropTypes.bool.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  logoutAccount: PropTypes.func.isRequired
}

export default connect(null, {
  logoutAccount
})(TopBar)
