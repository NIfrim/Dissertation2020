import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchInput } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterGroup: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  selectInput: {
    width: 120
  }
}));

const SearchBar = ({ show }) => {
  const classes = useStyles();

  return (
    <Collapse in={show}>
      <Box className={classes.root}>
        <Container maxWidth={'lg'} classes={{ root: classes.container }}>
          <Box className={classes.searchWrapper}>
            <SearchInput />
          </Box>
        </Container>
      </Box>
    </Collapse>
  );
};

SearchBar.propTypes = {
  show: PropTypes.bool.isRequired
};

export default SearchBar;
