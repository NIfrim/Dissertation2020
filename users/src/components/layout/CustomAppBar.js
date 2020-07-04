import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Typography,
  Badge,
  IconButton,
  AppBar,
  Toolbar,
  Hidden,
  Box,
  Avatar,
  Container,
  MenuItem,
  Menu,
  Divider,
  Switch,
  Grid
} from '@material-ui/core';
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import CustomDrawer from '../includes/CustomDrawer';
import { changeTheme } from '../../actions/user';
import { FilterBar, Filters, SearchBar, SearchInput } from '../home/includes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1400
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  dropdownMenu: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(4.5)
  },
  darkModeSwitch: {
    transform: 'rotateZ(-90deg)'
  },
  appModeSwitch: {
    transform: 'rotateZ(-90deg)'
  }
}));

const CustomAppBar = ({ user, logoutUser, changeTheme }) => {
  const classes = useStyles();
  const location = useLocation();

  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [menuAnchorState, setMenuAnchorState] = useState(null);
  const [appModeState, setAppModeState] = useState(user.account.appMode);

  const toggleDrawer = () => {
    setOpenState(!openState);
  };

  const handleClick = (e) => {
    const element = e.currentTarget;
    const id = e.currentTarget.id;

    switch (id) {
      case 'filters':
        setShowSearch(false);
        setShowFilters(!showFilters);
        break;

      case 'search':
        setShowFilters(false);
        setShowSearch(!showSearch);
        break;

      case 'appModeSwitch':
        setAppModeState(element.checked ? 'full' : 'privacy');
        break;

      case 'avatar':
        setMenuAnchorState(element);
        break;

      case 'logo':
        // Open the drawer
        setOpenState(false);
        break;

      case 'darkMode':
        const checked = element.checked;
        const { _id, __typename, ...rest } = user.account;

        if (checked) {
          // Set theme to dark
          changeTheme({ ...rest, theme: 'dark' });
        } else {
          // Set theme to light
          changeTheme({ ...rest, theme: 'light' });
        }
        break;

      case 'logout':
        // Close the drawer
        setOpenState(false);
        // Logout user
        logoutUser();
        break;

      case 'myAccount':
        // Close the drawer
        setOpenState(false);
        break;

      case 'support':
        // Close the drawer
        setOpenState(false);
        break;

      default:
        break;
    }
  };

  return (
    <AppBar position='static'>
      <Container maxWidth={'lg'}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              aria-label='menu'
              onClick={toggleDrawer}
            >
              <img
                className={classes.logo}
                src='/img/logo/VLogoSmall2.png'
                alt='Discounter logo'
                height={40}
              />
            </IconButton>
          </Hidden>

          <Hidden xsDown>
            <Link to={'/'} className={classes.logo}>
              <img
                src='/img/logo/HLogo.png'
                alt='Discounter logo'
                height={40}
                id={'logo'}
                onClick={handleClick}
              />
            </Link>
          </Hidden>

          <Box
            display={'flex'}
            alignSelf={'center'}
            flexWrap={'nowrap'}
            width={'auto'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Badge badgeContent={0} color={'primary'}>
              <Typography
                variant={'h5'}
                className={'mdi mdi-bell'}
                color={'textPrimary'}
              />
            </Badge>

            <Hidden xsDown>
              <Box ml={2}>
                <IconButton id={'avatar'} onClick={handleClick}>
                  <Avatar
                    alt={'User avatar'}
                    src={user.avatar}
                    variant={'circle'}
                  />
                </IconButton>
              </Box>

              <Menu
                id='dropdownMenu'
                classes={{ paper: classes.dropdownMenu }}
                anchorEl={menuAnchorState}
                keepMounted
                open={Boolean(menuAnchorState)}
                onClose={() => setMenuAnchorState(null)}
              >
                <Link to={'/account'}>
                  <MenuItem onClick={() => setMenuAnchorState(null)}>
                    <Typography
                      variant={'body1'}
                      color={'textSecondary'}
                      align={'center'}
                    >
                      My Account
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={'/support'}>
                  <MenuItem
                    onClick={() => setMenuAnchorState(null)}
                    alignItems={'center'}
                  >
                    <Typography
                      variant={'body1'}
                      color={'textSecondary'}
                      align={'center'}
                    >
                      Support
                    </Typography>
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    setMenuAnchorState(null);
                    logoutUser();
                  }}
                >
                  <Typography
                    variant={'body1'}
                    color={'textSecondary'}
                    align={'center'}
                  >
                    Logout
                  </Typography>
                </MenuItem>
                <Divider color={'primary'} />
                <Box p={1}>
                  <Grid
                    container
                    justify={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography variant={'body1'} color={'textSecondary'}>
                      Dark Mode
                    </Typography>
                    <Switch
                      className={classes.darkModeSwitch}
                      color={'primary'}
                      size={'small'}
                      checked={user.account.theme === 'dark'}
                      id={'darkMode'}
                      onChange={(event) => handleClick(event)}
                    />
                  </Grid>
                </Box>
              </Menu>
            </Hidden>
          </Box>
        </Toolbar>
      </Container>

      {location.pathname === '/' && (
        <Fragment>
          <Divider />
          <Container maxWidth={'lg'}>
            <Toolbar className={classes.toolbar}>
              <Typography variant={'body1'} color={'textSecondary'}>
              </Typography>

              <Hidden smDown>
                <Box display={'flex'} alignItems={'center'}>
                  <Filters />
                  <SearchInput />
                </Box>
              </Hidden>

              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Hidden mdUp>
                  <Box>
                    <IconButton id={'search'} onClick={handleClick}>
                      <Typography
                        variant={'h5'}
                        color={'textSecondary'}
                        className={'mdi mdi-magnify'}
                      />
                    </IconButton>
                  </Box>

                  <Box>
                    <IconButton id={'filters'} onClick={handleClick}>
                      <Typography
                        variant={'h5'}
                        color={'textSecondary'}
                        className={'mdi mdi-filter'}
                      />
                    </IconButton>
                  </Box>
                </Hidden>

                <Box display={'flex'} alignItems={'center'}>
                  <Typography variant={'body1'} color={'textSecondary'}>
                    Full Mode
                  </Typography>
                  <Switch
                    className={classes.appModeSwitch}
                    id={'appModeSwitch'}
                    size={'small'}
                    checked={appModeState === 'full'}
                    onChange={handleClick}
                  />
                </Box>
              </Box>
            </Toolbar>
          </Container>
          <Hidden mdUp>
            <FilterBar show={showFilters} />
            <SearchBar show={showSearch} />
          </Hidden>
        </Fragment>
      )}
      <CustomDrawer
        openState={openState}
        toggleHandler={toggleDrawer}
        clickHandler={handleClick}
      />
    </AppBar>
  );
};

CustomAppBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { logoutUser, changeTheme })(
  CustomAppBar
);
