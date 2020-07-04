import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// Components
import { Box, Container, Typography } from '@material-ui/core';
import PromoCard from './PromoCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start'
  },
  titleRow: {
    width: '100vw',
    backgroundColor: theme.palette.secondary.dark
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'stretch'
  },
  promoGroupRow: {
    width: '100vw',
    backgroundColor: theme.palette.secondary.main
  },
  cardsWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    padding: theme.spacing(3),
    '&::-webkit-scrollbar': {
      height: 8
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.light
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const StorePromosRow = ({ store }) => {
  const classes = useStyles();
  const { name, promotionGroups } = store;

  return (
    <Box className={classes.root}>
      <Box className={classes.titleRow}>
        <Container maxWidth={'lg'} className={classes.titleContainer}>
          <Box p={2}>
            <Typography variant={'h5'} color={'textSecondary'}>
              {name}
            </Typography>
          </Box>
        </Container>
      </Box>

      {promotionGroups.map((group) => (
        <Box className={classes.promoGroupRow} key={group._id}>
          <Container maxWidth={'lg'} className={classes.cardsContainer}>
            <Box p={2}>
              <Typography variant={'h5'} color={'textSecondary'}>
                {group.category[0].toUpperCase() + group.category.slice(1)}
              </Typography>
            </Box>
            <Box className={classes.cardsWrapper}>
              {group.promotions.map((promotion) => (
                <PromoCard key={promotion._id} promotion={promotion} />
              ))}
            </Box>
          </Container>
        </Box>
      ))}
    </Box>
  );
};

StorePromosRow.propTypes = {
  store: PropTypes.object.isRequired
};

export default connect(null)(StorePromosRow);
