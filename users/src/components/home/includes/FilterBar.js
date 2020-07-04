import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Filters } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  },
  container: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  filtersWrapper: {
    display: 'flex'
  },
  filterGroup: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  selectInput: {
    width: 120
  }
}));

const FilterBar = ({ show }) => {
  const classes = useStyles();

  return (
    <Collapse in={show}>
      <Box className={classes.root}>
        <Container maxWidth={'lg'} classes={{ root: classes.container }}>
          <Box className={classes.filtersWrapper}>
            <Filters />
          </Box>
        </Container>
      </Box>
    </Collapse>
  );
};

FilterBar.propTypes = {
  show: PropTypes.bool.isRequired
};

export default FilterBar;
