import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// React Router
import { Link } from 'react-router-dom';

// Components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Components
import { Box } from '@material-ui/core';

const mainStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: theme.overrides.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    color: '#fafafa'
  },
  drawerOpen: {
    width: theme.overrides.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: '20%'
  },
  listItem: {
    background: theme.palette.primary.light,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  listItemSelected: {
    backgroundColor: theme.palette.common.yellowish + ' !important',
    color: theme.palette.common.blue
  },
  listItemAnchor: {
    marginTop: 16,
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  listItemRoot: {
    width: '95%'
  },
  sideNav: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  closeSideNavBtn: {
    margin: 5,
    color: '#fafafa'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  logoContainer: {
    display: 'flex',
    flexBasis: 100,
    justifyContent: 'center',
    margin: 16
  },
  logoImage: {
    flex: 1
  },
  sideNavBackground: {
    backgroundColor: theme.palette.primary.dark,
    backgroundSize: 'cover',
    color: theme.overrides.lightText
  }
}));

const SideNav = ({ auth: { account }, open, setOpen }) => {
  const classes = mainStyles();
  const theme = useTheme();

  const navItems = {
    stores:
      account && !!account.scopes.find(elem => elem === 'MANAGE_STORES' || elem === 'VIEW_STORES')
        ? {
            name: 'Stores',
            icon: 'store',
            href: '/stores'
          }
        : null,
    promotions:
      account && !!account.scopes.find(elem => elem === 'MANAGE_PROMOTIONS' || elem === 'VIEW_PROMOTIONS')
        ? {
            name: 'Promotions',
            icon: 'attach_money',
            href: '/promotions'
          }
        : null,
    products:
      account && !!account.scopes.find(elem => elem === 'MANAGE_PRODUCTS' || elem === 'VIEW_PRODUCTS')
        ? {
            name: 'Products',
            icon: 'add_circle',
            href: '/products'
          }
        : null,
    access:
      account && !!account.scopes.find(elem => elem === 'MANAGE_ACCESS_GROUPS' || elem === 'MANAGE_STORE_ACCESS_GROUPS')
        ? {
            name: 'Access Rights',
            icon: 'security',
            href: '/access'
          }
        : null
    // settings:
    //   account &&
    //   !!account.scopes.find(
    //     elem =>
    //       elem === 'MANAGE_COMPANY_DETAILS' ||
    //       elem === 'MANAGE_STORE_DETAILS' ||
    //       elem === 'VIEW_STORE_DETAILS' ||
    //       elem === 'VIEW_COMPANY_DETAILS'
    //   )
    //     ? {
    //         name: 'Settings',
    //         icon: 'settings',
    //         href: '/settings'
    //       }
    //     : null
  };

  const [activeNavBtn, setActiveNavBtn] = useState('stores');

  useEffect(() => {
    const url = window.location.href.split('/');
    const pageName = url[url.length - 1];

    setActiveNavBtn(pageName === 'login' ? 'stores' : pageName);
  }, [account]);

  const clickHandler = event => {
    const { attributes } = event.currentTarget;
    let value = attributes.value.value;

    // Set current active button
    setActiveNavBtn(value);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant='permanent'
        open={open}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx(classes.sideNavBackground, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <Box className={classes.sideNav}>
          <Box key={'logo'} className={classes.logoContainer}>
            <img className={clsx(classes.logoImage)} src={'img/logoLight.svg'} alt={'logo'} />
          </Box>
          <IconButton className={classes.closeSideNavBtn} onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? (
              <i className={'material-icons'}>chevron_right</i>
            ) : (
              <i className={'material-icons'}>chevron_left</i>
            )}
          </IconButton>
        </Box>

        <List className={classes.listContainer}>
          {Object.keys(navItems).map(key => {
            return !navItems[key] ? (
              ''
            ) : (
              <Link className={classes.listItemAnchor} to={navItems[key].href} key={key}>
                <ListItem
                  className={classes.listItem}
                  classes={{
                    root: classes.listItemRoot,
                    selected: classes.listItemSelected
                  }}
                  button
                  selected={activeNavBtn === key}
                  value={key}
                  onClick={e => clickHandler(e)}
                >
                  <ListItemIcon color={'inherit'}>
                    <i className={'material-icons'}>{navItems[key].icon}</i>
                  </ListItemIcon>
                  <ListItemText primary={navItems[key].name} color={'inherit'} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

SideNav.propTypes = {
  auth: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(SideNav);
