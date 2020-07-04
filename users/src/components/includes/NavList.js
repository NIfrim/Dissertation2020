import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    flex: 1
  }
}));

const NavList = ({ clickHandler }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <Link to={'/account'}>
        <ListItem
          button
          id={'myAccount'}
          onClick={(event) => clickHandler(event)}
        >
          <ListItemIcon>
            <Typography
              variant={'h5'}
              color={'textSecondary'}
              className={'mdi mdi-account'}
            />
          </ListItemIcon>
          <ListItemText primary={'My Account'} />
        </ListItem>
      </Link>

      <Link to={'/support'}>
        <ListItem
          button
          key={'support'}
          id={'support'}
          onClick={(event) => clickHandler(event)}
        >
          <ListItemIcon>
            <Typography
              variant={'h5'}
              color={'textSecondary'}
              className={'mdi mdi-help-circle'}
            />
          </ListItemIcon>
          <ListItemText primary={'Support'} />
        </ListItem>
      </Link>

      <ListItem button id={'logout'} onClick={(event) => clickHandler(event)}>
        <ListItemIcon>
          <Typography
            variant={'h5'}
            color={'textSecondary'}
            className={'mdi mdi-logout'}
          />
        </ListItemIcon>
        <ListItemText primary={'Log Out'} />
      </ListItem>
    </List>
  );
};

NavList.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default NavList;
